import { PrismaClient } from '@prisma/client';
import { roomMedia } from '../lib/media';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Seeding Database ---');

    // 1. Create default settings
    await prisma.settings.upsert({
        where: { id: 'main' },
        update: {},
        create: {
            id: 'main',
            hostelName: 'Hostel Downtown Inn',
            hostelEmail: 'hostelinndowntown@gmail.com',
            hostelPhone: '+381652288200',
            checkInTime: '14:00',
            checkOutTime: '10:00',
            cityTax: 1.35,
            currency: 'EUR',
        },
    });
    console.log('✅ Default settings created');

    // 2. Create Rooms
    const rooms = [
        {
            name: 'Double Room',
            slug: 'double-room',
            type: 'PRIVATE',
            capacity: 2,
            beds: 1,
            pricePerNight: 45.0,
            description: 'Private room with double bed, perfect for couples. Bright and spacious with a view.',
            images: JSON.stringify(roomMedia.double),
            amenities: JSON.stringify(['WiFi', 'Linens', 'Towels', 'Heating', 'Shared Bathroom']),
            sortOrder: 1,
        },
        {
            name: 'Four Bed Dorm',
            slug: 'four-bed-dorm',
            type: 'DORM',
            capacity: 4,
            beds: 4,
            pricePerNight: 20.0,
            description: 'Spacious 4-bed mixed dormitory. Comfortable bunk beds with individual lockers.',
            images: JSON.stringify(roomMedia.fourBed),
            amenities: JSON.stringify(['WiFi', 'Linens', 'Lockers', 'Heating', 'Shared Bathroom']),
            sortOrder: 2,
        },
        {
            name: 'Six Bed Dorm',
            slug: 'six-bed-dorm',
            type: 'DORM',
            capacity: 6,
            beds: 6,
            pricePerNight: 18.0,
            description: 'Budget-friendly 6-bed mixed dormitory. Ideal for solo travelers and groups.',
            images: JSON.stringify(roomMedia.sixBed),
            amenities: JSON.stringify(['WiFi', 'Linens', 'Lockers', 'Heating', 'Shared Bathroom']),
            sortOrder: 3,
        },
    ];

    for (const room of rooms) {
        await prisma.room.upsert({
            where: { slug: room.slug },
            update: room,
            create: room,
        });
    }
    console.log('✅ Initial rooms created');

    console.log('--- Seeding Completed ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
