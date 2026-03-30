'use client';

import type { ApiRoom } from '@/lib/types';
import { differenceInDays, format } from 'date-fns';
import { BedDouble, CalendarRange, Receipt, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useBooking } from '@/lib/context/BookingContext';

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
        <div className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(9,15,34,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6">
            <div className="flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2 w-fit">
                <Receipt size={14} className="text-[#39ff14]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                    Booking Summary
                </span>
            </div>

            <div className="mt-6 space-y-5">
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2">
                        <CalendarRange size={16} className="text-[#39ff14]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Duration
                        </span>
                    </div>
                    {checkIn && checkOut ? (
                        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                            <span className="text-white">
                                {format(checkIn, 'MMM d')} - {format(checkOut, 'MMM d')}
                            </span>
                            <span className="rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#39ff14]">
                                {nights} {nights === 1 ? 'night' : 'nights'}
                            </span>
                        </div>
                    ) : (
                        <p className="mt-3 text-sm italic text-slate-500">No dates selected</p>
                    )}
                </div>

                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2">
                        <BedDouble size={16} className="text-[#39ff14]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Room
                        </span>
                    </div>
                    {selectedRoom ? (
                        <div className="mt-3">
                            <p className="font-semibold text-white">{selectedRoom.name}</p>
                            <p className="mt-1 text-sm text-slate-400">EUR {selectedRoom.pricePerNight} per night</p>
                        </div>
                    ) : (
                        <p className="mt-3 text-sm italic text-slate-500">No room selected</p>
                    )}
                </div>

                {guestName && (
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2">
                            <UserRound size={16} className="text-[#39ff14]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Guest
                            </span>
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-slate-300">
                            <p className="font-semibold text-white">{guestName}</p>
                            <p className="break-all">{guestEmail}</p>
                            <p>{numberOfGuests} {numberOfGuests === 1 ? 'guest' : 'guests'}</p>
                        </div>
                    </div>
                )}

                {specialRequests && (
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Requests
                        </span>
                        <p className="mt-3 text-sm italic leading-6 text-slate-300">{specialRequests}</p>
                    </div>
                )}

                <div className="rounded-[1.5rem] border border-[#39ff14]/18 bg-[#39ff14]/8 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                        <span>Accommodation</span>
                        <span className="font-medium text-white">EUR {total.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                        <span>City Tax (estimated)</span>
                        <span className="font-medium text-white">EUR {cityTaxTotal.toFixed(2)}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[#39ff14]/18 pt-4">
                        <span className="font-semibold text-white">Total</span>
                        <span className="text-2xl font-black text-[#39ff14]">
                            EUR {(total + cityTaxTotal).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
