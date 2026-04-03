'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, ContactRound, MessageSquareMore } from 'lucide-react';
import type { ApiRoom } from '@/lib/types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useBooking } from '@/lib/context/BookingContext';
import { useEffect, useState } from 'react';

const formSchema = z.object({
    guestName: z.string().min(2, 'Name is required'),
    guestEmail: z.string().email('Invalid email address'),
    guestPhone: z.string().min(6, 'Phone is required'),
    numberOfGuests: z.number().min(1, 'At least 1 guest required'),
    specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GuestForm() {
    const { setGuestDetails, setStep, roomId, ...state } = useBooking();
    const [maxGuests, setMaxGuests] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
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

    useEffect(() => {
        let active = true;

        async function loadSelectedRoom() {
            if (!roomId) {
                if (active) {
                    setMaxGuests(null);
                }
                return;
            }

            try {
                const res = await fetch('/api/rooms');
                if (!res.ok) {
                    throw new Error('Failed to load rooms');
                }

                const rooms = (await res.json()) as ApiRoom[];
                const selectedRoom = rooms.find((room) => room.id === roomId) ?? null;

                if (active) {
                    setMaxGuests(selectedRoom?.capacity ?? null);
                }
            } catch (error) {
                console.error('Failed to load room capacity:', error);
            }
        }

        void loadSelectedRoom();

        return () => {
            active = false;
        };
    }, [roomId]);

    const inputBaseClass =
        'w-full rounded-[1.1rem] border bg-[#08101f]/70 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#39ff14]/35';

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6"
        >
            <div className="mb-6 flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2 w-fit">
                <ContactRound size={14} className="text-[#39ff14]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                    Guest Information
                </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Full Name</label>
                    <input
                        {...register('guestName')}
                        className={`${inputBaseClass} ${errors.guestName ? 'border-red-500/50' : 'border-white/10'}`}
                        placeholder="John Doe"
                    />
                    {errors.guestName && <p className="text-xs text-red-400">{errors.guestName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Email Address</label>
                    <input
                        {...register('guestEmail')}
                        className={`${inputBaseClass} ${errors.guestEmail ? 'border-red-500/50' : 'border-white/10'}`}
                        placeholder="john@example.com"
                    />
                    {errors.guestEmail && <p className="text-xs text-red-400">{errors.guestEmail.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Phone Number</label>
                    <input
                        {...register('guestPhone')}
                        className={`${inputBaseClass} ${errors.guestPhone ? 'border-red-500/50' : 'border-white/10'}`}
                        placeholder="+381 6..."
                    />
                    {errors.guestPhone && <p className="text-xs text-red-400">{errors.guestPhone.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Number of Guests</label>
                    <input
                        type="number"
                        {...register('numberOfGuests', { valueAsNumber: true })}
                        min={1}
                        max={maxGuests ?? undefined}
                        className={`${inputBaseClass} ${errors.numberOfGuests ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.numberOfGuests && <p className="text-xs text-red-400">{errors.numberOfGuests.message}</p>}
                    {!errors.numberOfGuests && maxGuests && (
                        <p className="text-xs text-slate-500">Up to {maxGuests} guest(s) for the selected room.</p>
                    )}
                </div>
            </div>

            <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2">
                    <MessageSquareMore size={14} className="text-[#39ff14]" />
                    <label className="text-sm font-medium text-slate-400">Special Requests (Optional)</label>
                </div>
                <textarea
                    {...register('specialRequests')}
                    rows={4}
                    className={`${inputBaseClass} min-h-[120px] resize-y border-white/10`}
                    placeholder="Early check-in, arrival notes, or anything useful for the stay."
                />
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                    <ArrowLeft size={15} className="text-[#39ff14]" />
                    Back to rooms
                </button>
                <button type="submit" className="btn-primary justify-center gap-2 px-8 py-3.5">
                    Review Booking
                    <ArrowRight size={16} />
                </button>
            </div>
        </form>
    );
}
