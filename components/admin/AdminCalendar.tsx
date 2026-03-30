'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

interface Booking {
    id: string;
    checkIn: string;
    checkOut: string;
    guestName: string;
    room: { name: string };
    status: string;
}

export default function AdminCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadBookings() {
            try {
                const res = await fetch('/api/bookings');
                if (!res.ok) {
                    throw new Error('Failed to load calendar bookings');
                }

                const data = (await res.json()) as Booking[];
                if (active) {
                    setBookings(data);
                }
            } catch (err) {
                console.error('Failed to load calendar:', err);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadBookings();

        return () => {
            active = false;
        };
    }, []);

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const getBookingsForDay = (day: Date) => {
        return bookings.filter((booking) => {
            const start = new Date(booking.checkIn);
            const end = new Date(booking.checkOut);
            return (isSameDay(day, start) || isSameDay(day, end) || (day > start && day < end)) && booking.status !== 'CANCELLED';
        });
    };

    if (loading) {
        return (
            <div className="glass-card p-8 text-center text-slate-500">
                Loading calendar...
            </div>
        );
    }

    return (
        <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-4">
                    <button onClick={prevMonth} className="btn-outline px-4 py-2">← Previous</button>
                    <button onClick={nextMonth} className="btn-outline px-4 py-2">Next →</button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="bg-primary/40 p-4 text-center text-xs font-black uppercase tracking-widest text-slate-500 border-b border-white/5">
                        {day}
                    </div>
                ))}

                {days.map((day, idx) => {
                    const dayBookings = getBookingsForDay(day);
                    const isTodayCheck = isToday(day);

                    return (
                        <div
                            key={day.toString()}
                            style={{ gridColumnStart: idx === 0 ? day.getDay() + 1 : undefined }}
                            className={`min-h-[120px] p-2 bg-primary/20 hover:bg-white/5 transition-colors relative group ${isTodayCheck ? 'ring-1 ring-inset ring-[#39ff14]/50' : ''}`}
                        >
                            <span className={`text-sm font-bold ${isTodayCheck ? 'text-[#39ff14]' : 'text-slate-400'}`}>
                                {format(day, 'd')}
                            </span>

                            <div className="mt-2 space-y-1">
                                {dayBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className={`text-[10px] p-1 rounded border leading-tight truncate ${booking.status === 'CONFIRMED'
                                            ? 'bg-[#39ff14]/10 border-[#39ff14]/20 text-[#39ff14]'
                                            : 'bg-[#ffff00]/10 border-[#ffff00]/20 text-[#ffff00]'
                                            }`}
                                        title={`${booking.guestName} - ${booking.room.name}`}
                                    >
                                        {booking.guestName.split(' ')[0]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex gap-6 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#ffff00]/20 border border-[#ffff00]/30" />
                    <span className="text-slate-500">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#39ff14]/20 border border-[#39ff14]/30" />
                    <span className="text-slate-500">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded ring-1 ring-[#39ff14]/50" />
                    <span className="text-slate-500">Today</span>
                </div>
            </div>
        </div>
    );
}
