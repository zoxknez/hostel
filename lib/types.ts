import type { Booking, Room, Settings } from '@prisma/client';

export type ApiRoom = Omit<Room, 'images' | 'amenities'> & {
    images: string[];
    amenities: string[];
};

export interface AdminRoomFormData {
    id?: string;
    name: string;
    type: string;
    pricePerNight: number;
    capacity: number;
    description: string;
    amenities: string[];
    images: string[];
    isActive: boolean;
}

export type BookingListItem = Booking & {
    room: Pick<Room, 'id' | 'name'>;
};

export type BookingConfirmationResponse = Pick<
    Booking,
    'id' | 'bookingNumber' | 'checkIn' | 'checkOut' | 'totalPrice'
> & {
    cityTaxPerNight: number;
    cityTaxTotal: number;
    grandTotal: number;
};

export type PublicSettings = Pick<
    Settings,
    | 'hostelName'
    | 'hostelEmail'
    | 'hostelPhone'
    | 'checkInTime'
    | 'checkOutTime'
    | 'cityTax'
    | 'currency'
    | 'minAdvanceBooking'
    | 'maxAdvanceBooking'
    | 'cancellationPolicy'
>;

export interface BookingEmailPayload {
    bookingNumber: string;
    guestName: string;
    guestEmail: string;
    checkIn: Date | string;
    checkOut: Date | string;
    totalPrice: number;
    room?: string | { name: string };
    isStaffNotification?: boolean;
}
