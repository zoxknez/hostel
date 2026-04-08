import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdminRequest } from '@/lib/admin-session';

const validBookingStatuses = new Set(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']);

// PATCH: Update booking status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorizedResponse = await requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { status, internalNotes } = body;

        if (typeof status !== 'string' || !validBookingStatuses.has(status)) {
            return NextResponse.json({ error: 'Invalid booking status' }, { status: 400 });
        }

        const booking = await prisma.booking.update({
            where: { id },
            data: {
                status,
                internalNotes: typeof internalNotes === 'string' && internalNotes.trim() ? internalNotes.trim() : null,
                confirmedAt: status === 'CONFIRMED' ? new Date() : null,
                cancelledAt: status === 'CANCELLED' ? new Date() : null,
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
    const unauthorizedResponse = await requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    try {
        const { id } = await params;

        // Hard delete as requested
        await prisma.booking.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Booking deleted', id });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
    }
}
