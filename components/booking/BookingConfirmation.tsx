'use client';

import { useBooking } from '@/lib/context/BookingContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { format, isValid } from 'date-fns';

export default function BookingConfirmation() {
    const {
        checkIn,
        checkOut,
        roomId,
        guestName,
        guestEmail,
        guestPhone,
        numberOfGuests,
        specialRequests,
        reset
    } = useBooking();

    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingData, setBookingData] = useState<any>(null);

    // Safety guard: If accessed without valid dates (e.g. refresh), redirect or show empty
    if (!checkIn || !checkOut) {
        // You might want to trigger a redirect here via useEffect, but for render safety:
        return (
            <div className="glass-card p-8 text-center">
                <p className="text-slate-400 mb-4">No booking details found. Please start over.</p>
                <button onClick={() => window.location.href = '/book'} className="btn-primary px-8">
                    Start Booking
                </button>
            </div>
        );
    }

    const handleConfirm = async () => {
        console.log('Confirming booking for room:', roomId);
        if (!roomId || !checkIn || !checkOut) {
            setError('Missing required booking information. Please go back and select dates/room.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const payload = {
                roomId,
                guestName,
                guestEmail,
                guestPhone,
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                numberOfGuests: String(numberOfGuests),
                specialRequests
            };

            console.log('Sending payload:', payload);

            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log('API Response:', data);

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create booking');
            }

            setBookingData(data);
            setComplete(true);
        } catch (err: any) {
            console.error('Booking Error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (complete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card text-center py-20"
            >
                <div className="w-24 h-24 bg-[#39ff14]/20 text-[#39ff14] rounded-full flex items-center justify-center text-5xl mx-auto mb-8 animate-bounce">
                    ✓
                </div>
                <h2 className="text-4xl font-bold mb-4 text-white">Booking Confirmed!</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    Your reservation is successfully placed. We've sent a confirmation email to
                    <span className="text-white font-bold"> {guestEmail}</span>.
                </p>

                <div className="bg-primary/50 border border-white/10 p-6 rounded-2xl max-w-sm mx-auto mb-12 text-left space-y-3">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Booking Number</p>
                    <p className="text-2xl font-mono font-bold text-[#39ff14]">{bookingData?.bookingNumber}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase">Check-In</p>
                            <p className="text-sm text-white font-medium">{isValid(checkIn) ? format(checkIn!, 'PPP') : 'Invalid Date'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase">Total</p>
                            <p className="text-sm text-white font-bold">€{bookingData?.totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => { reset(); window.location.href = '/'; }}
                    className="btn-outline px-12"
                >
                    Return Home
                </button>
            </motion.div>
        );
    }

    return (
        <div className="glass-card">
            <h2 className="text-3xl font-bold mb-8 text-gradient">Final Review</h2>

            {error && (
                <div className="p-4 mb-6 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                    ⚠️ {error}
                </div>
            )}

            <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-[#39ff14] font-bold uppercase tracking-widest text-xs">Stay Information</h4>
                        <div className="space-y-2">
                            <p className="text-white"><span className="text-slate-500 mr-2">Check-In:</span> {isValid(checkIn) ? format(checkIn!, 'PPPP') : 'Invalid Date'}</p>
                            <p className="text-white"><span className="text-slate-500 mr-2">Check-Out:</span> {isValid(checkOut) ? format(checkOut!, 'PPPP') : 'Invalid Date'}</p>
                            <p className="text-white"><span className="text-slate-500 mr-2">Nights:</span> {isValid(checkIn) ? format(checkIn!, 'd') : '?'} to {isValid(checkOut) ? format(checkOut!, 'd') : '?'}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[#39ff14] font-bold uppercase tracking-widest text-xs">Guest Information</h4>
                        <div className="space-y-2">
                            <p className="text-white"><span className="text-slate-500 mr-2">Name:</span> {guestName}</p>
                            <p className="text-white"><span className="text-slate-500 mr-2">Email:</span> {guestEmail}</p>
                            <p className="text-white"><span className="text-slate-500 mr-2">Phone:</span> {guestPhone}</p>
                        </div>
                    </div>
                </div>

                {specialRequests && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-slate-500 uppercase mb-2">Special Requests</p>
                        <p className="text-sm text-slate-300 italic">"{specialRequests}"</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <button
                        disabled={loading}
                        onClick={handleConfirm}
                        className="btn-primary flex-1 py-4 text-lg shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                        {loading ? 'Processing...' : 'Confirm & Book Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}
