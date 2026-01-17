'use client';

import { useEffect, useState } from 'react';
import { useBooking } from '@/lib/context/BookingContext';
import { format } from 'date-fns';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Room {
    id: string;
    name: string;
    type: string;
    pricePerNight: number;
    capacity: number;
    beds: number;
    description: string;
    images: string[];
    amenities: string[];
}

export default function RoomSelector() {
    const { checkIn, checkOut, roomId, setRoomId, setStep } = useBooking();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRooms() {
            if (!checkIn || !checkOut) return;

            try {
                setLoading(true);
                const res = await fetch('/api/rooms');
                const data = await res.json();
                setRooms(data);
            } catch (err) {
                console.error('Error loading rooms:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchRooms();
    }, [checkIn, checkOut]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="glass-card h-64 animate-pulse bg-white/5" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                    <motion.div
                        key={room.id}
                        whileHover={{ y: -8 }}
                        className={`glass-card p-0 overflow-hidden cursor-pointer transition-all border-2 ${roomId === room.id ? 'border-cyan-400 ring-4 ring-cyan-400/20' : 'border-transparent'
                            }`}
                        onClick={() => setRoomId(room.id)}
                    >
                        <div className="relative h-48">
                            <Image
                                src={room.images[0]}
                                alt={room.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-cyan-400 font-bold">
                                €{room.pricePerNight} <span className="text-[10px] text-slate-400">/ night</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-white">{room.name}</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                {room.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {room.amenities.slice(0, 3).map((a, idx) => (
                                    <span key={idx} className="text-[10px] uppercase font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded">
                                        {a}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-4 text-xs text-slate-400">
                                    <span>👤 {room.capacity} Guests</span>
                                    <span>🛏️ {room.beds} Beds</span>
                                </div>
                                {roomId === room.id && (
                                    <span className="text-cyan-400 font-bold text-sm">✓ Selected</span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-12 bg-primary-light p-6 rounded-2xl border border-white/5">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white transition-colors">
                    ← Back to dates
                </button>
                <button
                    disabled={!roomId}
                    onClick={() => setStep(3)}
                    className={`btn-primary px-12 ${!roomId ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                    Next Details →
                </button>
            </div>
        </div>
    );
}
