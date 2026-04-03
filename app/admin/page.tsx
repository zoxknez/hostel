'use client';

import { startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Booking } from '@prisma/client';
import BookingList from '@/components/admin/BookingList';
import StatsCard from '@/components/admin/StatsCard';

type BookingStatsRecord = Pick<Booking, 'status' | 'totalPrice' | 'checkIn' | 'checkOut'>;

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        activeCheckins: 0,
        revenue: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/bookings');
                if (!res.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const bookings = (await res.json()) as BookingStatsRecord[];
                const today = startOfDay(new Date());

                const pendingBookings = bookings.filter((booking) => booking.status === 'PENDING').length;
                const activeCheckins = bookings.filter((booking) => {
                    if (booking.status !== 'CONFIRMED') {
                        return false;
                    }

                    const checkIn = startOfDay(new Date(booking.checkIn));
                    const checkOut = startOfDay(new Date(booking.checkOut));
                    return checkIn <= today && checkOut > today;
                }).length;
                const revenue = bookings.reduce((total, booking) => {
                    return booking.status !== 'CANCELLED' ? total + booking.totalPrice : total;
                }, 0);

                setStats({
                    totalBookings: bookings.length,
                    pendingBookings,
                    activeCheckins,
                    revenue
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        }

        void fetchStats();
    }, []);

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-slate-500 text-lg">Welcome back. Here&apos;s what&apos;s happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="Total Bookings"
                    value={stats.totalBookings}
                    icon="📖"
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

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
                    <Link href="/admin/bookings" className="text-[#39ff14] hover:text-[#39ff14]/80 text-sm font-bold uppercase tracking-wider">
                        View All Bookings →
                    </Link>
                </div>
                <div className="glass-card p-0 overflow-hidden">
                    <BookingList limit={5} />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Administration</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/rooms" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏨</span>
                        <span className="text-white font-bold">Rooms</span>
                        <span className="text-xs text-slate-500 mt-1">Manage inventory</span>
                    </Link>
                    <Link href="/admin/calendar" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">📅</span>
                        <span className="text-white font-bold">Calendar</span>
                        <span className="text-xs text-slate-500 mt-1">Occupancy view</span>
                    </Link>
                    <Link href="/admin/bookings" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🧾</span>
                        <span className="text-white font-bold">Bookings</span>
                        <span className="text-xs text-slate-500 mt-1">Reservation queue</span>
                    </Link>
                    <Link href="/admin/settings" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚙️</span>
                        <span className="text-white font-bold">Settings</span>
                        <span className="text-xs text-slate-500 mt-1">Global config</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
