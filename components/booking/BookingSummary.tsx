'use client';

import { useState, useEffect } from 'react';
import { differenceInDays, format } from 'date-fns';
import { useBooking } from '@/lib/context/BookingContext';
import type { ApiRoom } from '@/lib/types';

export default function BookingSummary() {
    const { checkIn, checkOut, roomId, guestName, guestEmail, numberOfGuests, specialRequests } = useBooking();
    const [room, setRoom] = useState<ApiRoom | null>(null);

    useEffect(() => {
        if (!roomId) {
            return;
        }

        let active = true;

        async function loadRoom() {
            const res = await fetch('/api/rooms');
            const rooms = (await res.json()) as ApiRoom[];
            const selectedRoom = rooms.find((item) => item.id === roomId) ?? null;

            if (active) {
                setRoom(selectedRoom);
            }
        }

        void loadRoom();

        return () => {
            active = false;
        };
    }, [roomId]);

    const selectedRoom = roomId ? room : null;
    const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
    const total = selectedRoom ? nights * selectedRoom.pricePerNight : 0;
    const cityTaxTotal = nights * 1.35;

    return (
        <div className="glass-card sticky top-32">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">
                Booking Summary
            </h3>

            <div className="space-y-6">
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Duration</span>
                    {checkIn && checkOut ? (
                        <div className="flex items-center justify-between text-sm text-white">
                            <span>{format(checkIn, 'MMM d')} - {format(checkOut, 'MMM d')}</span>
                            <span className="bg-[#39ff14]/10 text-[#39ff14] px-2 py-0.5 rounded border border-[#39ff14]/20">
                                {nights} {nights === 1 ? 'night' : 'nights'}
                            </span>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic">No dates selected</p>
                    )}
                </div>

                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Room</span>
                    {selectedRoom ? (
                        <div className="text-sm text-white">
                            <p className="font-bold">{selectedRoom.name}</p>
                            <p className="text-slate-400">EUR {selectedRoom.pricePerNight} per night</p>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic">No room selected</p>
                    )}
                </div>

                {guestName && (
                    <div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Guest</span>
                        <div className="text-sm text-white">
                            <p className="font-bold">{guestName}</p>
                            <p className="text-slate-400 text-[10px] break-all">{guestEmail}</p>
                            <p className="text-slate-400 text-[10px]">{numberOfGuests} {numberOfGuests === 1 ? 'guest' : 'guests'}</p>
                        </div>
                    </div>
                )}

                {specialRequests && (
                    <div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Requests</span>
                        <p className="text-sm text-slate-400 italic line-clamp-3">{specialRequests}</p>
                    </div>
                )}

                <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-400 text-sm">Accommodation</span>
                        <span className="text-white font-medium">EUR {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400 text-sm">City Tax (estimated)</span>
                        <span className="text-white font-medium">EUR {cityTaxTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#39ff14]/10 p-4 rounded-xl border border-[#39ff14]/20">
                        <span className="text-white font-bold">Total</span>
                        <span className="text-[#39ff14] text-2xl font-black">EUR {(total + cityTaxTotal).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
