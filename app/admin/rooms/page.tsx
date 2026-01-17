'use client';

import { useEffect, useState } from 'react';

export default function RoomsAdminPage() {
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/rooms')
            .then(res => res.json())
            .then(setRooms);
    }, []);

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Room Management</h1>
                    <p className="text-slate-500">Update pricing, amenities, and room status.</p>
                </div>
                <button className="btn-primary">Add New Room</button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="glass-card p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-3xl mb-6">
                            🏨
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{room.name}</h3>
                        <p className="text-slate-500 text-sm mb-6">{room.type} • {room.capacity} Guests</p>

                        <div className="grid grid-cols-2 gap-4 w-full mb-8 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Price</p>
                                <p className="text-white font-bold">€{room.pricePerNight}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-emerald-400 font-bold">Active</p>
                            </div>
                        </div>

                        <button className="btn-outline w-full py-3 text-xs uppercase font-black tracking-widest">
                            Edit Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
