import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdminRequest } from '@/lib/admin-session';
import { getHostelSettings } from '@/lib/settings';

export async function GET() {
    try {
        const settings = await getHostelSettings();

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const unauthorizedResponse = requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    try {
        const body = await request.json();
        const hostelName = String(body.hostelName ?? '').trim();
        const hostelEmail = String(body.hostelEmail ?? '').trim();
        const hostelPhone = String(body.hostelPhone ?? '').trim();
        const checkInTime = String(body.checkInTime ?? '').trim();
        const checkOutTime = String(body.checkOutTime ?? '').trim();
        const currency = String(body.currency ?? '').trim().toUpperCase();
        const cityTax = Number(body.cityTax);
        const minAdvanceBooking = Number(body.minAdvanceBooking);
        const maxAdvanceBooking = Number(body.maxAdvanceBooking);
        const cancellationPolicy =
            typeof body.cancellationPolicy === 'string' && body.cancellationPolicy.trim()
                ? body.cancellationPolicy.trim()
                : null;

        if (!hostelName || !hostelEmail || !hostelPhone || !currency) {
            return NextResponse.json({ error: 'Missing required settings fields' }, { status: 400 });
        }

        if (!/^\d{2}:\d{2}$/.test(checkInTime) || !/^\d{2}:\d{2}$/.test(checkOutTime)) {
            return NextResponse.json({ error: 'Invalid check-in or check-out time' }, { status: 400 });
        }

        if (!Number.isFinite(cityTax) || cityTax < 0) {
            return NextResponse.json({ error: 'City tax must be a valid positive number' }, { status: 400 });
        }

        if (!Number.isInteger(minAdvanceBooking) || minAdvanceBooking < 0) {
            return NextResponse.json({ error: 'Minimum advance booking must be 0 or more' }, { status: 400 });
        }

        if (!Number.isInteger(maxAdvanceBooking) || maxAdvanceBooking < minAdvanceBooking) {
            return NextResponse.json({ error: 'Maximum advance booking must be greater than or equal to minimum advance booking' }, { status: 400 });
        }

        const settings = await prisma.settings.upsert({
            where: { id: 'main' },
            update: {
                hostelName,
                hostelEmail,
                hostelPhone,
                checkInTime,
                checkOutTime,
                cityTax,
                currency,
                minAdvanceBooking,
                maxAdvanceBooking,
                cancellationPolicy,
            },
            create: {
                id: 'main',
                hostelName,
                hostelEmail,
                hostelPhone,
                checkInTime,
                checkOutTime,
                cityTax,
                currency,
                minAdvanceBooking,
                maxAdvanceBooking,
                cancellationPolicy,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
