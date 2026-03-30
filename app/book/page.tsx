'use client';

import BookingConfirmation from '@/components/booking/BookingConfirmation';
import BookingSummary from '@/components/booking/BookingSummary';
import DateRangePicker from '@/components/booking/DateRangePicker';
import GuestForm from '@/components/booking/GuestForm';
import RoomSelector from '@/components/booking/RoomSelector';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { BookingProvider, useBooking } from '@/lib/context/BookingContext';
import { AnimatePresence, motion } from 'framer-motion';
import { BedDouble, CalendarRange, CheckCircle2, Sparkles, UserRound } from 'lucide-react';

const bookingStepsMeta = [
    { id: 1, label: 'Dates', icon: CalendarRange, subtitle: 'Choose your stay window' },
    { id: 2, label: 'Room', icon: BedDouble, subtitle: 'Pick the best fit' },
    { id: 3, label: 'Details', icon: UserRound, subtitle: 'Guest information' },
    { id: 4, label: 'Confirm', icon: CheckCircle2, subtitle: 'Review and book' },
];

function BookingSteps() {
    const { step } = useBooking();

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.45fr)] lg:items-start">
            <div>
                <div className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {bookingStepsMeta.map((item) => {
                            const Icon = item.icon;
                            const isActive = step === item.id;
                            const isComplete = step > item.id;

                            return (
                                <div
                                    key={item.id}
                                    className={`rounded-[1.3rem] border px-4 py-4 transition-colors ${
                                        isActive
                                            ? 'border-[#39ff14]/25 bg-[#39ff14]/10'
                                            : isComplete
                                                ? 'border-white/10 bg-white/[0.04]'
                                                : 'border-white/6 bg-white/[0.02]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${
                                            isActive
                                                ? 'border-[#39ff14]/25 bg-[#39ff14]/10 text-[#39ff14]'
                                                : isComplete
                                                    ? 'border-white/10 bg-white/[0.06] text-white'
                                                    : 'border-white/10 bg-[#08101f]/80 text-slate-400'
                                        }`}>
                                            <Icon size={18} strokeWidth={2.1} />
                                        </div>
                                        <span className={`text-xs font-bold ${
                                            isActive ? 'text-[#39ff14]' : isComplete ? 'text-white' : 'text-slate-500'
                                        }`}>
                                            0{item.id}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm font-semibold text-white">{item.label}</p>
                                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.subtitle}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="mb-6 text-3xl font-bold text-white">
                                    <span className="text-gradient">Select Dates</span>
                                </h2>
                                <DateRangePicker />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="mb-6 text-3xl font-bold text-white">
                                    <span className="text-gradient">Choose Your Room</span>
                                </h2>
                                <RoomSelector />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="mb-6 text-3xl font-bold text-white">
                                    <span className="text-gradient">Guest Details</span>
                                </h2>
                                <GuestForm />
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step-4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <BookingConfirmation />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="lg:sticky lg:top-28">
                <BookingSummary />
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <BookingProvider>
            <main className="min-h-screen bg-primary">
                <Navigation />

                <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-8 md:pt-36">
                    <header className="mx-auto max-w-5xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                            <Sparkles size={14} className="text-[#39ff14]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                                Direct Booking
                            </span>
                        </div>
                        <h1 className="section-title mt-6 text-4xl leading-[0.95] md:text-5xl lg:text-6xl">
                            Book Your <span className="text-gradient">Stay</span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                            A cleaner booking flow designed to keep the process simple, transparent, and aligned with the premium visual language of the site.
                        </p>
                    </header>

                        <div className="mt-10 md:mt-12">
                            <BookingSteps />
                        </div>
                </div>

                <Footer />
            </main>
        </BookingProvider>
    );
}
