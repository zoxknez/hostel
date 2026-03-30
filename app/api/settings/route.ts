import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const settings = await prisma.settings.upsert({
            where: { id: 'main' },
            update: {},
            create: { id: 'main' },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        const settings = await prisma.settings.upsert({
            where: { id: 'main' },
            update: {
                hostelName: body.hostelName,
                hostelEmail: body.hostelEmail,
                hostelPhone: body.hostelPhone,
                checkInTime: body.checkInTime,
                checkOutTime: body.checkOutTime,
                cityTax: Number(body.cityTax),
                currency: body.currency,
                minAdvanceBooking: Number(body.minAdvanceBooking),
                maxAdvanceBooking: Number(body.maxAdvanceBooking),
                cancellationPolicy: body.cancellationPolicy || null,
            },
            create: {
                id: 'main',
                hostelName: body.hostelName,
                hostelEmail: body.hostelEmail,
                hostelPhone: body.hostelPhone,
                checkInTime: body.checkInTime,
                checkOutTime: body.checkOutTime,
                cityTax: Number(body.cityTax),
                currency: body.currency,
                minAdvanceBooking: Number(body.minAdvanceBooking),
                maxAdvanceBooking: Number(body.maxAdvanceBooking),
                cancellationPolicy: body.cancellationPolicy || null,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
