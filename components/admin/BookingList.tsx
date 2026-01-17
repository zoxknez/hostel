'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import BookingDetailsModal from './BookingDetailsModal';

interface Booking {
    id: string;
    bookingNumber: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestCountry: string | null;
    checkIn: string;
    checkOut: string;
    status: string;
    totalPrice: number;
    numberOfGuests: number;
    specialRequests: string | null;
    internalNotes: string | null;
    room: {
        name: string;
    };
}

export default function BookingList({ limit }: { limit?: number }) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/bookings');
            const data = await res.json();
            if (Array.isArray(data)) {
                setBookings(limit ? data.slice(0, limit) : data);
            }
        } catch (err) {
            console.error('Failed to fetch bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [limit]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
            case 'CANCELLED': return 'bg-red-400/10 text-red-400 border-red-400/20';
            case 'PENDING': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
            case 'COMPLETED': return 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20';
            default: return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
        }
    };

    const handleUpdate = (updated: any) => {
        setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
        fetchBookings(); // Refresh to be sure
    };

    if (loading && bookings.length === 0) {
        return <div className="p-12 text-center text-slate-500 italic">Loading bookings...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-white/5 text-slate-500 uppercase text-[10px] tracking-widest border-b border-white/5">
                        <th className="px-6 py-4 font-bold">Booking info</th>
                        <th className="px-6 py-4 font-bold">Room</th>
                        <th className="px-6 py-4 font-bold">Dates</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Total</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <p className="text-white font-bold">{booking.guestName}</p>
                                <p className="text-cyan-400 text-[10px] font-mono">{booking.bookingNumber}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-slate-300 text-sm font-medium">{booking.room?.name || 'Unknown'}</p>
                            </td>
                            <td className="px-6 py-4 text-xs">
                                <p className="text-slate-300">
                                    {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d')}
                                </p>
                                <p className="text-slate-500 text-[10px]">2026</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded inline-block border ${getStatusStyle(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-white">
                                €{booking.totalPrice.toFixed(0)}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className="text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mr-4"
                                >
                                    Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-20 text-center text-slate-500 italic">
                                No bookings found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}
