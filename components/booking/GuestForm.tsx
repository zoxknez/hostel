'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBooking } from '@/lib/context/BookingContext';
import { useState } from 'react';

const formSchema = z.object({
    guestName: z.string().min(2, 'Name is required'),
    guestEmail: z.string().email('Invalid email address'),
    guestPhone: z.string().min(6, 'Phone is required'),
    numberOfGuests: z.number().min(1, 'At least 1 guest required'),
    specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GuestForm() {
    const { setGuestDetails, setStep, ...state } = useBooking();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guestName: state.guestName || '',
            guestEmail: state.guestEmail || '',
            guestPhone: state.guestPhone || '',
            numberOfGuests: state.numberOfGuests || 1,
            specialRequests: state.specialRequests || '',
        },
    });

    const onSubmit = (data: FormData) => {
        setGuestDetails(data);
        setStep(4);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Full Name</label>
                    <input
                        {...register('guestName')}
                        className={`w-full bg-primary/50 border rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none transition-all relative z-20 ${errors.guestName ? 'border-red-500/50' : 'border-white/10'
                            }`}
                        placeholder="John Doe"
                    />
                    {errors.guestName && <p className="text-red-400 text-xs">{errors.guestName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Email Address</label>
                    <input
                        {...register('guestEmail')}
                        className={`w-full bg-primary/50 border rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none transition-all relative z-20 ${errors.guestEmail ? 'border-red-500/50' : 'border-white/10'
                            }`}
                        placeholder="john@example.com"
                    />
                    {errors.guestEmail && <p className="text-red-400 text-xs">{errors.guestEmail.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Phone Number</label>
                    <input
                        {...register('guestPhone')}
                        className={`w-full bg-primary/50 border rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none transition-all relative z-20 ${errors.guestPhone ? 'border-red-500/50' : 'border-white/10'
                            }`}
                        placeholder="+381 6..."
                    />
                    {errors.guestPhone && <p className="text-red-400 text-xs">{errors.guestPhone.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Number of Guests</label>
                    <input
                        type="number"
                        {...register('numberOfGuests', { valueAsNumber: true })}
                        className={`w-full bg-primary/50 border rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none transition-all relative z-20 ${errors.numberOfGuests ? 'border-red-500/50' : 'border-white/10'
                            }`}
                    />
                    {errors.numberOfGuests && <p className="text-red-400 text-xs">{errors.numberOfGuests.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Special Requests (Optional)</label>
                <textarea
                    {...register('specialRequests')}
                    rows={4}
                    {...register('specialRequests')}
                    rows={4}
                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none transition-all relative z-20"
                    placeholder="Early check-in, dietary requirements, etc."
                />
            </div>

            <div className="flex justify-between items-center pt-6">
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all px-4 py-2 rounded-full hover:bg-white/5"
                >
                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#39ff14] group-hover:text-[#39ff14] transition-colors shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        ←
                    </span>
                    <span className="font-medium tracking-wide">Back to rooms</span>
                </button>
                <button
                    type="submit"
                    className="btn-primary px-12 py-4 shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                >
                    Review Booking →
                </button>
            </div>
        </form>
    );
}
