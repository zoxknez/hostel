import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { parseRoomRecord, serializeRoomPayload } from '@/lib/rooms';
import type { AdminRoomFormData } from '@/lib/types';
import { hasValidAdminSession, requireAdminRequest } from '@/lib/admin-session';

export async function GET(request: NextRequest) {
    try {
        const rooms = await prisma.room.findMany({
            where: await hasValidAdminSession(request) ? undefined : { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });

        const parsedRooms = rooms.map(parseRoomRecord);

        return NextResponse.json(parsedRooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const unauthorizedResponse = await requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    try {
        const body = (await request.json()) as Partial<AdminRoomFormData>;
        const roomName = body.name?.trim();
        const pricePerNight = Number(body.pricePerNight);
        const capacity = Number(body.capacity);

        // Basic validation
        if (!roomName || !Number.isFinite(pricePerNight) || pricePerNight < 0) {
            return NextResponse.json({ error: 'A valid room name and price are required' }, { status: 400 });
        }

        if (!Number.isInteger(capacity) || capacity < 1) {
            return NextResponse.json({ error: 'Capacity must be at least 1' }, { status: 400 });
        }

        // Helper to create slug
        const generateSlug = (name: string) => {
            return name.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        };

        const slug = generateSlug(roomName) + '-' + Math.random().toString(36).substring(2, 7);
        const roomData = serializeRoomPayload(body);

        const room = await prisma.room.create({
            data: {
                name: roomName,
                slug: slug,
                type: roomData.type ?? 'Standard',
                pricePerNight: roomData.pricePerNight ?? pricePerNight,
                capacity: roomData.capacity ?? capacity,
                beds: roomData.beds ?? roomData.capacity ?? capacity,
                description: roomData.description ?? '',
                amenities: roomData.amenities ?? '[]',
                images: roomData.images ?? '[]',
                isActive: roomData.isActive ?? true,
                sortOrder: 0
            }
        });

        return NextResponse.json(parseRoomRecord(room));
    } catch (error) {
        console.error('Error creating room:', error);
        return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
    }
}
