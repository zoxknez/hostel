'use client';

import { BookingProvider, useBooking } from '@/lib/context/BookingContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import DateRangePicker from '@/components/booking/DateRangePicker';
import RoomSelector from '@/components/booking/RoomSelector';
import GuestForm from '@/components/booking/GuestForm';
import BookingSummary from '@/components/booking/BookingSummary';

function BookingSteps() {
    const { step } = useBooking();

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <div className="flex justify-between mb-12 relative">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-10" />

                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-10" />

                    {[1, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= s
                                ? 'bg-[#39ff14] text-primary shadow-[0_0_20px_rgba(57,255,20,0.5)]'
                                : 'bg-primary-light text-slate-500 border border-white/10'
                                }`}
                        >
                            {s === 4 ? '✓' : s}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gradient">Select Dates</h2>
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
                            <h2 className="text-3xl font-bold mb-8 text-gradient">Choose Your Room</h2>
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
                            <h2 className="text-3xl font-bold mb-8 text-gradient">Guest Details</h2>
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
                            <h2 className="text-3xl font-bold mb-8 text-gradient">Review & Confirm</h2>
                            <div className="glass-card space-y-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-4">Almost There!</h3>
                                    <p className="text-slate-400 mb-6">
                                        Please review your booking details on the right. If everything looks correct, click the "Confirm Reservation" button to complete your booking.
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#39ff14]"></span>
                                            Instant Confirmation
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#39ff14]"></span>
                                            No Hidden Fees
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => useBooking().setStep(3)}
                                    className="text-slate-400 hover:text-white transition-colors text-sm"
                                >
                                    ← Edit Guest Details
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
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

                <div className="pt-24 md:pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
                    <header className="mb-12">
                        <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mb-4">
                            Book Your <span className="text-gradient">Stay</span>
                        </h1>
                        <p className="text-slate-400">
                            Complete the steps below to reserve your space at Hostel Downtown Inn.
                        </p>
                    </header>

                    <BookingSteps />
                </div>

                <Footer />
            </main>
        </BookingProvider>
    );
}
