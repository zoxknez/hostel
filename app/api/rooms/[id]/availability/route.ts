import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { parseISO, areIntervalsOverlapping, startOfDay, endOfDay } from 'date-fns';

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
        const endDate = endOfDay(parseISO(endDateStr));

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
                OR: [
                    {
                        // Requested check-in is between existing booking dates
                        checkIn: { lte: startDate },
                        checkOut: { gt: startDate },
                    },
                    {
                        // Requested check-out is between existing booking dates
                        checkIn: { lt: endDate },
                        checkOut: { gte: endDate },
                    },
                    {
                        // Existing booking is entirely within requested dates
                        checkIn: { gte: startDate },
                        checkOut: { lte: endDate },
                    },
                ],
            },
        });

        return NextResponse.json({
            available: bookings.length === 0,
            roomName: room.name,
            pricePerNight: room.pricePerNight
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }
}
