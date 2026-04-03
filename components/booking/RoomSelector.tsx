'use client';

import type { ApiRoom } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BedDouble, CheckCircle2, Users } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useBooking } from '@/lib/context/BookingContext';

type RoomAvailability = {
    available: boolean;
    reason?: string;
};

export default function RoomSelector() {
    const { checkIn, checkOut, roomId, setRoomId, setStep } = useBooking();
    const [rooms, setRooms] = useState<ApiRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [availabilityByRoomId, setAvailabilityByRoomId] = useState<Record<string, RoomAvailability>>({});
    const hasAvailableRooms = rooms.some((room) => availabilityByRoomId[room.id]?.available);

    useEffect(() => {
        async function fetchRooms() {
            if (!checkIn || !checkOut) {
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/rooms');
                if (!res.ok) {
                    throw new Error('Failed to load rooms');
                }

                const data = (await res.json()) as ApiRoom[];
                const startDate = format(checkIn, 'yyyy-MM-dd');
                const endDate = format(checkOut, 'yyyy-MM-dd');
                const availabilityEntries = await Promise.all(
                    data.map(async (room) => {
                        const availabilityRes = await fetch(
                            `/api/rooms/${room.id}/availability?startDate=${startDate}&endDate=${endDate}`
                        );

                        if (!availabilityRes.ok) {
                            return [room.id, { available: false, reason: 'Availability could not be checked.' }] as const;
                        }

                        const availability = (await availabilityRes.json()) as RoomAvailability;
                        return [room.id, availability] as const;
                    })
                );

                const availabilityMap = Object.fromEntries(availabilityEntries);
                setRooms(data);
                setAvailabilityByRoomId(availabilityMap);

                if (roomId && availabilityMap[roomId]?.available === false) {
                    setRoomId(null);
                }
            } catch (error) {
                console.error('Error loading rooms:', error);
                setError('Available rooms could not be loaded right now. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        void fetchRooms();
    }, [checkIn, checkOut, roomId, setRoomId]);

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
            {error && (
                <div className="rounded-[1.35rem] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {rooms.map((room) => {
                    const availability = availabilityByRoomId[room.id];
                    const isAvailable = availability?.available ?? false;
                    const isSelected = roomId === room.id;

                    return (
                        <motion.button
                            key={room.id}
                            type="button"
                            whileHover={isAvailable ? { y: -6 } : undefined}
                            onClick={() => {
                                if (isAvailable) {
                                    setRoomId(room.id);
                                }
                            }}
                            disabled={!isAvailable}
                            className={`group overflow-hidden rounded-[1.8rem] border text-left transition-colors ${
                                isSelected
                                    ? 'border-[#39ff14]/30 bg-[#39ff14]/8'
                                    : 'border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)]'
                            } ${!isAvailable ? 'cursor-not-allowed opacity-60 grayscale-[0.15]' : ''}`}
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
                                {isSelected && (
                                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39ff14]">
                                        <CheckCircle2 size={13} />
                                        Selected
                                    </div>
                                )}
                                {!isAvailable && (
                                    <div className="absolute left-4 top-4 inline-flex rounded-full border border-red-400/20 bg-red-400/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
                                        Unavailable
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

                                {!isAvailable && availability?.reason && (
                                    <p className="mt-4 text-xs leading-5 text-red-300">{availability.reason}</p>
                                )}

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
                    );
                })}
            </div>

            {!loading && rooms.length > 0 && !hasAvailableRooms && (
                <div className="rounded-[1.35rem] border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                    No rooms are currently available for the selected dates. Try a different stay window to see more options.
                </div>
            )}

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
