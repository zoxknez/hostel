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

export async function POST(request: Request) {
    try {
        const body = await request.json();

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

        const room = await prisma.room.create({
            data: {
                name: body.name,
                slug: slug,
                type: body.type || 'Standard',
                pricePerNight: parseFloat(body.pricePerNight),
                capacity: parseInt(body.capacity) || 2,
                beds: parseInt(body.capacity) || 2, // Defaulting beds to capacity
                description: body.description || '',
                amenities: JSON.stringify(body.amenities || []),
                images: JSON.stringify(body.images || []),
                isActive: true,
                sortOrder: 0
            }
        });

        return NextResponse.json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
    }
}
