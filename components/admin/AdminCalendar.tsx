'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

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
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, []);

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const getBookingsForDay = (day: Date) => {
        return bookings.filter(b => {
            const start = new Date(b.checkIn);
            const end = new Date(b.checkOut);
            return (isSameDay(day, start) || isSameDay(day, end) || (day > start && day < end)) && b.status !== 'CANCELLED';
        });
    };

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
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
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
                            className={`min-h-[120px] p-2 bg-primary/20 hover:bg-white/5 transition-colors relative group ${isTodayCheck ? 'ring-1 ring-inset ring-cyan-400/50' : ''}`}
                        >
                            <span className={`text-sm font-bold ${isTodayCheck ? 'text-cyan-400' : 'text-slate-400'}`}>
                                {format(day, 'd')}
                            </span>

                            <div className="mt-2 space-y-1">
                                {dayBookings.map(b => (
                                    <div
                                        key={b.id}
                                        className={`text-[10px] p-1 rounded border leading-tight truncate ${b.status === 'CONFIRMED'
                                                ? 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400'
                                                : 'bg-amber-400/10 border-amber-400/20 text-amber-400'
                                            }`}
                                        title={`${b.guestName} - ${b.room.name}`}
                                    >
                                        {b.guestName.split(' ')[0]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex gap-6 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-400/20 border border-amber-400/30" />
                    <span className="text-slate-500">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-400/20 border border-emerald-400/30" />
                    <span className="text-slate-500">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded ring-1 ring-cyan-400/50" />
                    <span className="text-slate-500">Today</span>
                </div>
            </div>
        </div>
    );
}
