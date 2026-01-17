import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// PATCH: Update booking status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status, internalNotes } = body;

        const booking = await prisma.booking.update({
            where: { id },
            data: {
                status,
                internalNotes,
                confirmedAt: status === 'CONFIRMED' ? new Date() : undefined,
                cancelledAt: status === 'CANCELLED' ? new Date() : undefined,
            },
            include: {
                room: true,
            }
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

// DELETE: Cancel booking
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // We don't usually delete bookings, just set status to CANCELLED
        const booking = await prisma.booking.update({
            where: { id },
            data: {
                status: 'CANCELLED',
                cancelledAt: new Date(),
            }
        });

        return NextResponse.json({ message: 'Booking cancelled', id });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
    }
}
