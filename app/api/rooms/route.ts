import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { parseRoomRecord, serializeRoomPayload } from '@/lib/rooms';
import type { AdminRoomFormData } from '@/lib/types';

export async function GET() {
    try {
        const rooms = await prisma.room.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });

        const parsedRooms = rooms.map(parseRoomRecord);

        return NextResponse.json(parsedRooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as Partial<AdminRoomFormData>;

        // Basic validation
        if (!body.name || !body.pricePerNight) {
            return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
        }

        // Helper to create slug
        const generateSlug = (name: string) => {
            return name.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        };

        const slug = generateSlug(body.name) + '-' + Math.random().toString(36).substring(2, 7);
        const roomData = serializeRoomPayload(body);

        const room = await prisma.room.create({
            data: {
                name: body.name.trim(),
                slug: slug,
                type: roomData.type ?? 'Standard',
                pricePerNight: roomData.pricePerNight ?? 0,
                capacity: roomData.capacity ?? 2,
                beds: roomData.beds ?? roomData.capacity ?? 2,
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
