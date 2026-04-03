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

function sanitizeStringArray(value: string[]) {
    return value
        .map((item) => item.trim())
        .filter(Boolean);
}

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
        const pricePerNight = Number(room.pricePerNight);
        if (Number.isFinite(pricePerNight) && pricePerNight >= 0) {
            data.pricePerNight = pricePerNight;
        }
    }

    if (room.capacity !== undefined) {
        const capacity = Number(room.capacity);
        if (Number.isInteger(capacity) && capacity > 0) {
            data.capacity = capacity;
            data.beds = capacity;
        }
    }

    if (room.description !== undefined) {
        data.description = room.description.trim();
    }

    if (room.amenities !== undefined) {
        data.amenities = JSON.stringify(sanitizeStringArray(room.amenities));
    }

    if (room.images !== undefined) {
        data.images = JSON.stringify(sanitizeStringArray(room.images));
    }

    if (room.isActive !== undefined) {
        data.isActive = room.isActive;
    }

    return data;
}
