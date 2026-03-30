'use client';

import type { ApiRoom } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BedDouble, CheckCircle2, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useBooking } from '@/lib/context/BookingContext';

export default function RoomSelector() {
    const { checkIn, checkOut, roomId, setRoomId, setStep } = useBooking();
    const [rooms, setRooms] = useState<ApiRoom[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRooms() {
            if (!checkIn || !checkOut) {
                return;
            }

            try {
                setLoading(true);
                const res = await fetch('/api/rooms');
                const data = (await res.json()) as ApiRoom[];
                setRooms(data);
            } catch (error) {
                console.error('Error loading rooms:', error);
            } finally {
                setLoading(false);
            }
        }

        void fetchRooms();
    }, [checkIn, checkOut]);

    if (loading) {
        return (
            <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map((item) => (
                    <div key={item} className="h-72 animate-pulse rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {rooms.map((room) => (
                    <motion.button
                        key={room.id}
                        type="button"
                        whileHover={{ y: -6 }}
                        onClick={() => setRoomId(room.id)}
                        className={`group overflow-hidden rounded-[1.8rem] border text-left transition-colors ${
                            roomId === room.id
                                ? 'border-[#39ff14]/30 bg-[#39ff14]/8'
                                : 'border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)]'
                        }`}
                    >
                        <div className="relative h-52 overflow-hidden">
                            <Image
                                src={room.images[0]}
                                alt={room.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.06)_0%,rgba(5,8,22,0.78)_100%)]" />
                            <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-[#08101f]/80 px-3 py-1.5 text-sm font-bold text-[#39ff14]">
                                EUR {room.pricePerNight}
                                <span className="ml-1 text-[10px] text-slate-400">/ night</span>
                            </div>
                            {roomId === room.id && (
                                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39ff14]">
                                    <CheckCircle2 size={13} />
                                    Selected
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <h3 className="text-2xl font-bold text-white">{room.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {room.description ?? 'Comfortable stay in the heart of Belgrade.'}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {room.amenities.slice(0, 3).map((amenity) => (
                                    <span
                                        key={amenity}
                                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                                    <span className="inline-flex items-center gap-2">
                                        <Users size={14} className="text-[#39ff14]" />
                                        {room.capacity} guests
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <BedDouble size={14} className="text-[#39ff14]" />
                                        {room.beds} beds
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="flex flex-col gap-3 rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-5 md:flex-row md:items-center md:justify-between">
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                    <ArrowLeft size={15} className="text-[#39ff14]" />
                    Back to dates
                </button>
                <button
                    type="button"
                    disabled={!roomId}
                    onClick={() => setStep(3)}
                    className={`btn-primary justify-center gap-2 px-8 py-3.5 ${!roomId ? 'cursor-not-allowed opacity-50 grayscale' : ''}`}
                >
                    Next Details
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
