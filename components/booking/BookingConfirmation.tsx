'use client';

import type { BookingConfirmationResponse } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, CircleAlert, Receipt, UserRound } from 'lucide-react';
import { differenceInDays, format, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBooking } from '@/lib/context/BookingContext';

export default function BookingConfirmation() {
    const router = useRouter();
    const {
        checkIn,
        checkOut,
        roomId,
        guestName,
        guestEmail,
        guestPhone,
        numberOfGuests,
        specialRequests,
        reset,
    } = useBooking();

    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingData, setBookingData] = useState<BookingConfirmationResponse | null>(null);

    if (!checkIn || !checkOut) {
        return (
            <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                <p className="mb-4 text-slate-400">No booking details found. Please start over.</p>
                <button type="button" onClick={() => router.replace('/book')} className="btn-primary px-8">
                    Start Booking
                </button>
            </div>
        );
    }

    const stayDuration = differenceInDays(checkOut, checkIn);

    const handleConfirm = async () => {
        if (!roomId || !checkIn || !checkOut) {
            setError('Missing required booking information. Please go back and select dates and room.');
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
                specialRequests,
            };

            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = (await res.json()) as BookingConfirmationResponse | { error?: string };

            if (!res.ok) {
                throw new Error('error' in data ? data.error || 'Failed to create booking' : 'Failed to create booking');
            }

            setBookingData(data as BookingConfirmationResponse);
            setComplete(true);
        } catch (err) {
            console.error('Booking Error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (complete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-10"
            >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 text-[#39ff14]">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="mt-8 text-4xl font-bold text-white">Booking Confirmed</h2>
                <p className="mx-auto mt-4 max-w-md text-slate-400">
                    Your reservation has been placed successfully. We sent the confirmation details to
                    <span className="font-semibold text-white"> {guestEmail}</span>.
                </p>

                <div className="mx-auto mt-10 max-w-md rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-5 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Booking Number
                    </p>
                    <p className="mt-3 font-mono text-2xl font-bold text-[#39ff14]">{bookingData?.bookingNumber}</p>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/8 pt-5">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Check-In
                            </p>
                            <p className="mt-2 text-sm font-medium text-white">
                                {isValid(checkIn) ? format(checkIn, 'PPP') : 'Invalid date'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Total
                            </p>
                            <p className="mt-2 text-sm font-bold text-white">
                                {bookingData ? `EUR ${bookingData.grandTotal.toFixed(2)}` : 'Pending'}
                            </p>
                        </div>
                    </div>
                    {bookingData && (
                        <p className="mt-4 text-xs leading-5 text-slate-400">
                            Includes accommodation, plus EUR {bookingData.cityTaxTotal.toFixed(2)} city tax for this stay.
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => {
                        reset();
                        router.push('/');
                    }}
                    className="btn-outline mt-10 px-10 py-3.5"
                >
                    Return Home
                </button>
            </motion.div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6">
            <div className="flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2 w-fit">
                <Receipt size={14} className="text-[#39ff14]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                    Final Review
                </span>
            </div>

            {error && (
                <div className="mt-6 flex items-start gap-3 rounded-[1.25rem] border border-red-400/20 bg-red-400/10 px-4 py-3.5 text-sm text-red-300">
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Stay Information
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <p><span className="mr-2 text-slate-500">Check-In:</span>{isValid(checkIn) ? format(checkIn, 'PPPP') : 'Invalid date'}</p>
                        <p><span className="mr-2 text-slate-500">Check-Out:</span>{isValid(checkOut) ? format(checkOut, 'PPPP') : 'Invalid date'}</p>
                        <p><span className="mr-2 text-slate-500">Stay:</span>{stayDuration} {stayDuration === 1 ? 'night' : 'nights'}</p>
                        <p><span className="mr-2 text-slate-500">Guests:</span>{numberOfGuests}</p>
                    </div>
                </div>

                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2">
                        <UserRound size={16} className="text-[#39ff14]" />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            Guest Information
                        </p>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <p><span className="mr-2 text-slate-500">Name:</span>{guestName}</p>
                        <p><span className="mr-2 text-slate-500">Email:</span>{guestEmail}</p>
                        <p><span className="mr-2 text-slate-500">Phone:</span>{guestPhone}</p>
                    </div>
                </div>
            </div>

            {specialRequests && (
                <div className="mt-5 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Special Requests
                    </p>
                    <p className="mt-3 text-sm italic leading-6 text-slate-300">&quot;{specialRequests}&quot;</p>
                </div>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row">
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleConfirm}
                    className="btn-primary flex-1 justify-center gap-2 py-3.5 text-base"
                >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                    {!loading && <ArrowRight size={16} />}
                </button>
            </div>
        </div>
    );
}
