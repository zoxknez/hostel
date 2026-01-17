'use client';

import { useBooking } from '@/lib/context/BookingContext';
import { differenceInDays, format } from 'date-fns';
import { useState, useEffect } from 'react';

export default function BookingSummary() {
    const { checkIn, checkOut, roomId, guestName, guestEmail, guestPhone, numberOfGuests, specialRequests, step, setStep } = useBooking();
    const [room, setRoom] = useState<any>(null);

    useEffect(() => {
        if (roomId) {
            fetch(`/api/rooms`)
                .then(res => res.json())
                .then(rooms => {
                    const found = rooms.find((r: any) => r.id === roomId);
                    setRoom(found);
                });
        }
    }, [roomId]);

    const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
    const total = room ? nights * room.pricePerNight : 0;

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
                                {nights} nights
                            </span>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic">No dates selected</p>
                    )}
                </div>

                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Room</span>
                    {room ? (
                        <div className="text-sm text-white">
                            <p className="font-bold">{room.name}</p>
                            <p className="text-slate-400">€{room.pricePerNight} per night</p>
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
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-400 text-sm">Accommodation</span>
                        <span className="text-white font-medium">€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400 text-sm">City Tax (estimated)</span>
                        <span className="text-white font-medium">€{(nights * 1.35).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#39ff14]/10 p-4 rounded-xl border border-[#39ff14]/20">
                        <span className="text-white font-bold">Total</span>
                        <span className="text-[#39ff14] text-2xl font-black">€{(total + (nights * 1.35)).toFixed(2)}</span>
                    </div>
                </div>

                {step === 4 && (
                    <button
                        onClick={async () => {
                            if (!roomId || !checkIn || !checkOut || !guestName || !guestEmail) {
                                alert('Please complete all required fields.');
                                return;
                            }

                            try {
                                const res = await fetch('/api/bookings', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        roomId,
                                        checkIn: checkIn.toISOString(),
                                        checkOut: checkOut.toISOString(),
                                        guestName,
                                        guestEmail,
                                        guestPhone,
                                        numberOfGuests,
                                        specialRequests,
                                        guestCountry: 'Unknown' // Default or fetch from context if available
                                    })
                                });

                                if (res.ok) {
                                    alert('Booking Successful! Check your email.');
                                    window.location.href = '/';
                                } else {
                                    const data = await res.json();
                                    alert('Error: ' + (data.error || 'Booking failed'));
                                }
                            } catch (error) {
                                console.error(error);
                                alert('Something went wrong. Please try again.');
                            }
                        }}
                        className="btn-primary w-full py-4 mt-4 shadow-[0_0_30px_rgba(57,255,20,0.4)]"
                    >
                        Confirm Reservation
                    </button>
                )}
            </div>
        </div>
    );
}
