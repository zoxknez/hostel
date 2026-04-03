import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { differenceInCalendarDays, differenceInDays, isValid, parseISO, startOfDay } from 'date-fns';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { requireAdminRequest } from '@/lib/admin-session';
import { getHostelSettings } from '@/lib/settings';

async function generateUniqueBookingNumber() {
    for (let attempt = 0; attempt < 10; attempt += 1) {
        const bookingNumber = `DI-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        const existingBooking = await prisma.booking.findUnique({
            where: { bookingNumber },
            select: { id: true },
        });

        if (!existingBooking) {
            return bookingNumber;
        }
    }

    throw new Error('Unable to generate a unique booking number');
}

function bookingsOverlap(
    existingBooking: { checkIn: Date; checkOut: Date },
    requestedStart: Date,
    requestedEnd: Date
) {
    const existingStart = startOfDay(existingBooking.checkIn);
    const existingEnd = startOfDay(existingBooking.checkOut);

    return requestedStart < existingEnd && requestedEnd > existingStart;
}

// GET: List all bookings (for admin)
export async function GET(request: NextRequest) {
    const unauthorizedResponse = requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    try {
        const bookings = await prisma.booking.findMany({
            include: {
                room: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

// POST: Create a new booking
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            roomId,
            guestName,
            guestEmail,
            guestPhone,
            guestCountry,
            checkIn,
            checkOut,
            numberOfGuests,
            specialRequests
        } = body;

        // 1. Basic validation
        if (!roomId || !guestName || !guestEmail || !checkIn || !checkOut) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const startDate = startOfDay(parseISO(checkIn));
        const endDate = startOfDay(parseISO(checkOut));

        if (!isValid(startDate) || !isValid(endDate)) {
            return NextResponse.json({ error: 'Invalid dates selected' }, { status: 400 });
        }

        const nights = differenceInDays(endDate, startDate);
        if (nights <= 0) {
            return NextResponse.json({ error: 'Invalid dates selected' }, { status: 400 });
        }

        const parsedGuestCount = Number(numberOfGuests);
        if (!Number.isInteger(parsedGuestCount) || parsedGuestCount <= 0) {
            return NextResponse.json({ error: 'Invalid guest count' }, { status: 400 });
        }

        const settings = await getHostelSettings();
        const today = startOfDay(new Date());
        const advanceDays = differenceInCalendarDays(startDate, today);

        if (advanceDays < settings.minAdvanceBooking) {
            return NextResponse.json({
                error: `Bookings must be made at least ${settings.minAdvanceBooking} day(s) in advance.`,
            }, { status: 400 });
        }

        if (advanceDays > settings.maxAdvanceBooking) {
            return NextResponse.json({
                error: `Bookings can only be made up to ${settings.maxAdvanceBooking} day(s) ahead.`,
            }, { status: 400 });
        }

        // 2. Room check
        const room = await prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room || !room.isActive) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        if (parsedGuestCount > room.capacity) {
            return NextResponse.json({
                error: `This room allows up to ${room.capacity} guest(s).`,
            }, { status: 400 });
        }

        // 3. Final availability double-check
        const existingBookings = await prisma.booking.findMany({
            where: {
                roomId,
                status: { in: ['PENDING', 'CONFIRMED'] },
                checkIn: { lt: endDate },
                checkOut: { gt: startDate },
            },
            select: {
                checkIn: true,
                checkOut: true,
            },
        });

        if (existingBookings.some((booking) => bookingsOverlap(booking, startDate, endDate))) {
            return NextResponse.json({ error: 'Room no longer available for selected dates' }, { status: 409 });
        }

        // 4. Generate booking number
        const bookingNumber = await generateUniqueBookingNumber();

        // 5. Calculate price
        const totalPrice = nights * room.pricePerNight;
        const cityTaxTotal = nights * settings.cityTax;

        // 6. Create booking
        const booking = await prisma.booking.create({
            data: {
                bookingNumber,
                roomId,
                guestName: guestName.trim(),
                guestEmail: guestEmail.trim().toLowerCase(),
                guestPhone: typeof guestPhone === 'string' ? guestPhone.trim() : '',
                guestCountry: typeof guestCountry === 'string' && guestCountry.trim() ? guestCountry.trim() : null,
                numberOfGuests: parsedGuestCount,
                checkIn: startDate,
                checkOut: endDate,
                nights,
                pricePerNight: room.pricePerNight,
                totalPrice,
                status: 'PENDING',
                specialRequests: typeof specialRequests === 'string' && specialRequests.trim() ? specialRequests.trim() : null,
            },
        });

        // 7. Send confirmation email to guest
        await sendBookingConfirmationEmail({
            ...booking,
            room: room.name
        });

        // 8. Send notification email to staff
        if (process.env.STAFF_EMAIL) {
            await sendBookingConfirmationEmail({
                ...booking,
                room: room.name,
                guestEmail: process.env.STAFF_EMAIL, // Override "to" for staff notification
                isStaffNotification: true // Flag to potentially change template in email.ts
            });
        }

        return NextResponse.json({
            ...booking,
            cityTaxPerNight: settings.cityTax,
            cityTaxTotal,
            grandTotal: totalPrice + cityTaxTotal,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
