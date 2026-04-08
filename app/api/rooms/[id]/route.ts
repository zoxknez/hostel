import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { parseRoomRecord, serializeRoomPayload } from '@/lib/rooms';
import type { AdminRoomFormData } from '@/lib/types';
import { requireAdminRequest } from '@/lib/admin-session';

// GET: Single room details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorizedResponse = await requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    try {
        const { id } = await params;
        const room = await prisma.room.findUnique({
            where: { id }
        });

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json(parseRoomRecord(room));
    } catch {
        return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
    }
}

// PATCH: Update room
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
        const body = (await request.json()) as Partial<AdminRoomFormData>;

        if (body.name !== undefined && !body.name.trim()) {
            return NextResponse.json({ error: 'Room name cannot be empty' }, { status: 400 });
        }

        if (body.pricePerNight !== undefined) {
            const pricePerNight = Number(body.pricePerNight);
            if (!Number.isFinite(pricePerNight) || pricePerNight < 0) {
                return NextResponse.json({ error: 'Price must be a valid positive number' }, { status: 400 });
            }
        }

        if (body.capacity !== undefined) {
            const capacity = Number(body.capacity);
            if (!Number.isInteger(capacity) || capacity < 1) {
                return NextResponse.json({ error: 'Capacity must be at least 1' }, { status: 400 });
            }
        }

        const data = serializeRoomPayload(body);

        const room = await prisma.room.update({
            where: { id },
            data
        });

        return NextResponse.json(parseRoomRecord(room));
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
    const unauthorizedResponse = await requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

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
    } catch {
        return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
    }
}
