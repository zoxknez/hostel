'use client';

import { DayPicker, DateRange } from 'react-day-picker';
import { useBooking } from '@/lib/context/BookingContext';
import { format, startOfToday } from 'date-fns';
import 'react-day-picker/dist/style.css';

export default function DateRangePicker() {
    const { checkIn, checkOut, setDates, setStep } = useBooking();

    const handleSelect = (range: DateRange | undefined) => {
        setDates(range?.from, range?.to);
    };

    const isStepValid = !!(checkIn && checkOut);

    return (
        <div className="glass-card">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center p-4 lg:p-8">
                <div className="booking-calendar overflow-hidden rounded-2xl">
                    <DayPicker
                        mode="range"
                        selected={{ from: checkIn, to: checkOut }}
                        onSelect={handleSelect}
                        disabled={{ before: startOfToday() }}
                        numberOfMonths={2}
                        className="!bg-transparent text-white"
                    />
                </div>

                <div className="flex flex-col gap-6 w-full max-w-xs">
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Check-In</span>
                            <span className="text-xl font-bold text-white">
                                {checkIn ? format(checkIn, 'PPP') : 'Select date'}
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Check-Out</span>
                            <span className="text-xl font-bold text-white">
                                {checkOut ? format(checkOut, 'PPP') : 'Select date'}
                            </span>
                        </div>
                    </div>

                    <button
                        disabled={!isStepValid}
                        onClick={() => setStep(2)}
                        className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale transition-all shadow-[0_0_30px_rgba(0,245,255,0.2)]"
                    >
                        Select Room →
                    </button>
                </div>
            </div>

            <style jsx global>{`
        .rdp {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #00f5ff;
          --rdp-background-color: rgba(0, 245, 255, 0.1);
          margin: 0;
        }
        .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
          background-color: var(--rdp-accent-color) !important;
          color: #050816 !important;
          font-weight: bold;
        }
        .rdp-day_range_middle {
          background-color: rgba(0, 245, 255, 0.1) !important;
          color: white !important;
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .rdp-nav_button {
          color: white;
        }
        .rdp-head_cell {
          color: #94a3b8;
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .rdp {
            --rdp-cell-size: 35px;
          }
        }
      `}</style>
        </div>
    );
}
