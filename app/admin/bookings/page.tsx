'use client';

import BookingList from '@/components/admin/BookingList';

export default function BookingsAdminPage() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <a href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm mb-2 block">
                        ← Back to Dashboard
                    </a>
                    <h1 className="text-4xl font-bold text-white mb-2">Manage Bookings</h1>
                    <p className="text-slate-500">View and handle all guest reservations.</p>
                </div>
                <div className="flex gap-4">
                    {/* Filters */}
                    <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex">
                        <button className="px-4 py-2 bg-[#39ff14] text-primary font-bold text-xs rounded-lg shadow-[0_0_10px_rgba(57,255,20,0.3)]">All</button>
                        <button className="px-4 py-2 text-slate-500 font-bold text-xs hover:text-white transition-colors">Pending</button>
                        <button className="px-4 py-2 text-slate-500 font-bold text-xs hover:text-white transition-colors">Confirmed</button>
                    </div>
                </div>
            </header>

            <div className="glass-card p-0 overflow-hidden">
                <BookingList />
            </div>
        </div>
    );
}
