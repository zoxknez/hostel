import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { isValid, parseISO, startOfDay } from 'date-fns';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const startDateStr = searchParams.get('startDate');
        const endDateStr = searchParams.get('endDate');

        if (!startDateStr || !endDateStr) {
            return NextResponse.json({ error: 'Missing startDate or endDate' }, { status: 400 });
        }

        const startDate = startOfDay(parseISO(startDateStr));
        const endDate = startOfDay(parseISO(endDateStr));

        if (!isValid(startDate) || !isValid(endDate) || endDate <= startDate) {
            return NextResponse.json({ error: 'Invalid booking dates' }, { status: 400 });
        }

        // 1. Check if room exists
        const room = await prisma.room.findUnique({
            where: { id },
        });

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // 2. Check for blocked dates
        const blockedDates = await prisma.blockedDate.findMany({
            where: {
                roomId: id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        if (blockedDates.length > 0) {
            return NextResponse.json({
                available: false,
                reason: 'Room is blocked for some selected dates'
            });
        }

        // 3. Check for existing bookings
        // We look for any booking that overlaps with the requested interval
        const bookings = await prisma.booking.findMany({
            where: {
                roomId: id,
                status: { in: ['PENDING', 'CONFIRMED'] },
                checkIn: { lt: endDate },
                checkOut: { gt: startDate },
            },
            select: {
                checkIn: true,
                checkOut: true,
            },
        });

        const hasOverlap = bookings.some((booking) => {
            const existingStart = startOfDay(booking.checkIn);
            const existingEnd = startOfDay(booking.checkOut);

            return startDate < existingEnd && endDate > existingStart;
        });

        return NextResponse.json({
            available: !hasOverlap,
            roomName: room.name,
            pricePerNight: room.pricePerNight
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }
}
