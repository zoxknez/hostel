'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingList from '@/components/admin/BookingList';
import type { BookingStatusFilter } from '@/components/admin/BookingList';

export default function BookingsAdminPage() {
    const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>('ALL');

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <Link href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm mb-2 block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Manage Bookings</h1>
                    <p className="text-slate-500">View and handle all guest reservations.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex">
                        {(['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 font-bold text-xs rounded-lg transition-colors ${statusFilter === status
                                    ? 'bg-[#39ff14] text-primary shadow-[0_0_10px_rgba(57,255,20,0.3)]'
                                    : 'text-slate-500 hover:text-white'
                                    }`}
                            >
                                {status === 'ALL'
                                    ? 'All'
                                    : status === 'PENDING'
                                        ? 'Pending'
                                        : status === 'CONFIRMED'
                                            ? 'Confirmed'
                                            : status === 'CANCELLED'
                                                ? 'Cancelled'
                                                : 'Completed'}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="glass-card p-0 overflow-hidden">
                <BookingList statusFilter={statusFilter} />
            </div>
        </div>
    );
}
