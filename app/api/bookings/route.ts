import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { differenceInDays, parseISO, startOfDay, endOfDay } from 'date-fns';
import { sendBookingConfirmationEmail } from '@/lib/email';

// GET: List all bookings (for admin)
export async function GET() {
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
        const endDate = endOfDay(parseISO(checkOut));
        const nights = differenceInDays(endDate, startDate);

        if (nights <= 0) {
            return NextResponse.json({ error: 'Invalid dates selected' }, { status: 400 });
        }

        // 2. Room check
        const room = await prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // 3. Final availability double-check
        const existingBookings = await prisma.booking.findMany({
            where: {
                roomId,
                status: { in: ['PENDING', 'CONFIRMED'] },
                OR: [
                    { checkIn: { lte: startDate }, checkOut: { gt: startDate } },
                    { checkIn: { lt: endDate }, checkOut: { gte: endDate } },
                    { checkIn: { gte: startDate }, checkOut: { lte: endDate } },
                ],
            },
        });

        if (existingBookings.length > 0) {
            return NextResponse.json({ error: 'Room no longer available for selected dates' }, { status: 409 });
        }

        // 4. Generate booking number
        const bookingNumber = `DI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // 5. Calculate price
        const totalPrice = nights * room.pricePerNight;

        // 6. Create booking
        const booking = await prisma.booking.create({
            data: {
                bookingNumber,
                roomId,
                guestName,
                guestEmail,
                guestPhone,
                guestCountry,
                numberOfGuests: parseInt(numberOfGuests),
                checkIn: startDate,
                checkOut: endDate,
                nights,
                pricePerNight: room.pricePerNight,
                totalPrice,
                status: 'PENDING',
                specialRequests,
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

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
