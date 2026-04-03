import prisma from '@/lib/db';

export const defaultHostelSettings = {
    hostelName: 'Hostel Downtown Inn',
    hostelEmail: 'hostelinndowntown@gmail.com',
    hostelPhone: '+381652288200',
    checkInTime: '14:00',
    checkOutTime: '10:00',
    cityTax: 1.35,
    currency: 'EUR',
    minAdvanceBooking: 0,
    maxAdvanceBooking: 365,
    cancellationPolicy: null,
} as const;

export async function getHostelSettings() {
    return prisma.settings.upsert({
        where: { id: 'main' },
        update: {},
        create: {
            id: 'main',
            ...defaultHostelSettings,
        },
    });
}
