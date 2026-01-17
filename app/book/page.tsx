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

                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= s
                                    ? 'bg-cyan-400 text-primary shadow-[0_0_20px_rgba(0,245,255,0.5)]'
                                    : 'bg-primary-light text-slate-500 border border-white/10'
                                }`}
                        >
                            {s}
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

                <div className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
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
