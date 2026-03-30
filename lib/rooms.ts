import type { Room } from '@prisma/client';
import type { AdminRoomFormData, ApiRoom } from './types';

type SerializedRoomPayload = {
    name?: string;
    type?: string;
    pricePerNight?: number;
    capacity?: number;
    beds?: number;
    description?: string;
    amenities?: string;
    images?: string;
    isActive?: boolean;
};

function parseStringArray(value: string): string[] {
    try {
        const parsed = JSON.parse(value) as unknown;
        return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch {
        return [];
    }
}

export function parseRoomRecord(room: Room): ApiRoom {
    return {
        ...room,
        images: parseStringArray(room.images),
        amenities: parseStringArray(room.amenities),
    };
}

export function serializeRoomPayload(room: Partial<AdminRoomFormData>): SerializedRoomPayload {
    const data: SerializedRoomPayload = {};

    if (room.name !== undefined) {
        data.name = room.name.trim();
    }

    if (room.type !== undefined) {
        data.type = room.type;
    }

    if (room.pricePerNight !== undefined) {
        data.pricePerNight = Number(room.pricePerNight);
    }

    if (room.capacity !== undefined) {
        const capacity = Number(room.capacity);
        data.capacity = capacity;
        data.beds = capacity;
    }

    if (room.description !== undefined) {
        data.description = room.description;
    }

    if (room.amenities !== undefined) {
        data.amenities = JSON.stringify(room.amenities);
    }

    if (room.images !== undefined) {
        data.images = JSON.stringify(room.images);
    }

    if (room.isActive !== undefined) {
        data.isActive = room.isActive;
    }

    return data;
}
