'use client';

import { useEffect, useState } from 'react';
import BookingList from '@/components/admin/BookingList';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        activeCheckins: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/bookings');
                const bookings = await res.json();

                const pending = bookings.filter((b: any) => b.status === 'PENDING').length;
                const total = bookings.length;
                const revenue = bookings.reduce((acc: number, b: any) => acc + (b.status !== 'CANCELLED' ? b.totalPrice : 0), 0);

                setStats({
                    totalBookings: total,
                    pendingBookings: pending,
                    activeCheckins: 0, // Logic for check-ins today
                    revenue
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-slate-500 text-lg">Welcome back. Here's what's happening today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="Total Bookings"
                    value={stats.totalBookings}
                    icon="📅"
                    trend="+12%"
                    color="cyan"
                />
                <StatsCard
                    label="Pending Requests"
                    value={stats.pendingBookings}
                    icon="🔔"
                    trend="Action required"
                    color="purple"
                    highlight={stats.pendingBookings > 0}
                />
                <StatsCard
                    label="Active Stays"
                    value={stats.activeCheckins}
                    icon="🏨"
                    trend="Live now"
                    color="emerald"
                />
                <StatsCard
                    label="Total Revenue"
                    value={`€${stats.revenue.toFixed(0)}`}
                    icon="💰"
                    trend="+€1,250 this month"
                    color="gold"
                />
            </div>

            {/* Recent Bookings */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
                    <a href="/admin/bookings" className="text-[#39ff14] hover:text-[#39ff14]/80 text-sm font-bold uppercase tracking-wider">
                        View All Bookings →
                    </a>
                </div>
                <div className="glass-card p-0 overflow-hidden">
                    <BookingList limit={5} />
                </div>
            </div>

            {/* Administration & Tools */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Administration</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/admin/rooms" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏨</span>
                        <span className="text-white font-bold">Rooms</span>
                        <span className="text-xs text-slate-500 mt-1">Manage inventory</span>
                    </a>
                    <a href="/admin/calendar" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">📅</span>
                        <span className="text-white font-bold">Calendar</span>
                        <span className="text-xs text-slate-500 mt-1">Occupancy view</span>
                    </a>
                    <a href="/admin/reviews" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">⭐</span>
                        <span className="text-white font-bold">Reviews</span>
                        <span className="text-xs text-slate-500 mt-1">Guest feedback</span>
                    </a>
                    <a href="/admin/settings" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚙️</span>
                        <span className="text-white font-bold">Settings</span>
                        <span className="text-xs text-slate-500 mt-1">Global config</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
