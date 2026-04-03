'use client';

import { useBooking } from '@/lib/context/BookingContext';
import type { PublicSettings } from '@/lib/types';
import { addDays, format, startOfToday } from 'date-fns';
import { ArrowRight, CalendarRange, MoonStar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateRangePicker() {
    const { checkIn, checkOut, setDates, setStep } = useBooking();
    const [numMonths, setNumMonths] = useState(2);
    const [bookingWindow, setBookingWindow] = useState<Pick<PublicSettings, 'minAdvanceBooking' | 'maxAdvanceBooking'> | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setNumMonths(window.innerWidth < 768 ? 1 : 2);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let active = true;

        async function loadBookingWindow() {
            try {
                const res = await fetch('/api/settings');
                if (!res.ok) {
                    throw new Error('Failed to load booking rules');
                }

                const data = (await res.json()) as PublicSettings;
                if (active) {
                    setBookingWindow({
                        minAdvanceBooking: data.minAdvanceBooking,
                        maxAdvanceBooking: data.maxAdvanceBooking,
                    });
                }
            } catch (error) {
                console.error('Failed to load booking window:', error);
            }
        }

        void loadBookingWindow();

        return () => {
            active = false;
        };
    }, []);

    const handleSelect = (range: DateRange | undefined) => {
        setDates(range?.from, range?.to);
    };

    const isStepValid = Boolean(checkIn && checkOut);
    const today = startOfToday();
    const earliestBookableDate = addDays(today, bookingWindow?.minAdvanceBooking ?? 0);
    const latestBookableDate = addDays(today, bookingWindow?.maxAdvanceBooking ?? 365);

    return (
        <div className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
                <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-3.5 md:p-5">
                    <div className="flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2 w-fit">
                        <CalendarRange size={14} className="text-[#39ff14]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                            Stay Dates
                        </span>
                    </div>

                    <div className="mt-5 overflow-x-auto rounded-[1.35rem] border border-white/8 bg-[#08101f]/70 p-2.5 sm:p-3">
                        <div className="min-w-fit">
                            <DayPicker
                                mode="range"
                                selected={{ from: checkIn, to: checkOut }}
                                onSelect={handleSelect}
                                disabled={[
                                    { before: earliestBookableDate },
                                    { after: latestBookableDate },
                                ]}
                                numberOfMonths={numMonths}
                                className="!bg-transparent text-white"
                            />
                        </div>
                    </div>
                    {bookingWindow && (
                        <p className="mt-4 text-xs leading-6 text-slate-400">
                            Booking window: from {format(earliestBookableDate, 'MMM d, yyyy')} to {format(latestBookableDate, 'MMM d, yyyy')}.
                        </p>
                    )}
                </div>

                <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-4 md:p-5">
                    <div className="flex items-center gap-2 rounded-full border border-[#ffff00]/15 bg-[#ffff00]/8 px-3.5 py-2 w-fit">
                        <MoonStar size={14} className="text-[#ffff00]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffff00]">
                            Selected Stay
                        </span>
                    </div>

                    <div className="mt-5 space-y-4">
                        <div className="rounded-[1.25rem] border border-white/8 bg-[#08101f]/70 p-4">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Check-In
                            </span>
                            <span className="mt-2 block text-lg font-bold text-white">
                                {checkIn ? format(checkIn, 'PPP') : 'Select date'}
                            </span>
                        </div>

                        <div className="rounded-[1.25rem] border border-white/8 bg-[#08101f]/70 p-4">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Check-Out
                            </span>
                            <span className="mt-2 block text-lg font-bold text-white">
                                {checkOut ? format(checkOut, 'PPP') : 'Select date'}
                            </span>
                        </div>

                        <button
                            disabled={!isStepValid}
                            onClick={() => setStep(2)}
                            className="btn-primary w-full justify-center gap-2 py-4 text-base disabled:cursor-not-allowed disabled:grayscale disabled:opacity-50"
                        >
                            Select Room
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
