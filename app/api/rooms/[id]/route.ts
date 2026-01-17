import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET: Single room details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const room = await prisma.room.findUnique({
            where: { id }
        });

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json(room);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
    }
}

// PATCH: Update room
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Ensure images and amenities are strings if they come as objects
        const data = { ...body };
        if (data.images && typeof data.images !== 'string') data.images = JSON.stringify(data.images);
        if (data.amenities && typeof data.amenities !== 'string') data.amenities = JSON.stringify(data.amenities);

        const room = await prisma.room.update({
            where: { id },
            data
        });

        return NextResponse.json(room);
    } catch (error) {
        console.error('Update room error:', error);
        return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
    }
}

// DELETE: Remove room (or deactivate)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Check for active bookings before deleting
        const activeBookings = await prisma.booking.count({
            where: {
                roomId: id,
                status: { in: ['PENDING', 'CONFIRMED'] },
                checkOut: { gt: new Date() }
            }
        });

        if (activeBookings > 0) {
            return NextResponse.json({
                error: 'Cannot delete room with active bookings. Please cancel or complete bookings first.'
            }, { status: 400 });
        }

        await prisma.room.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Room deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
    }
}
