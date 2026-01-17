'use client';

import AdminCalendar from '@/components/admin/AdminCalendar';

export default function CalendarAdminPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Occupancy Calendar</h1>
                <p className="text-slate-500">Visual overview of room availability and bookings.</p>
            </header>

            <AdminCalendar />
        </div>
    );
}
