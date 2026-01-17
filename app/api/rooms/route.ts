import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const rooms = await prisma.room.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });

        // Parse JSON strings back to arrays
        const parsedRooms = rooms.map((room) => ({
            ...room,
            images: typeof room.images === 'string' ? JSON.parse(room.images) : room.images,
            amenities: typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities,
        }));

        return NextResponse.json(parsedRooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
    }
}
