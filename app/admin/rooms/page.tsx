'use client';

import { useState, useEffect } from 'react';
import RoomModal from '@/components/admin/RoomModal';

export default function RoomsAdminPage() {
    const [rooms, setRooms] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);

    const fetchRooms = () => {
        fetch('/api/rooms')
            .then(res => res.json())
            .then(setRooms)
            .catch(console.error);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSaveRoom = async (roomData: any) => {
        const method = roomData.id ? 'PATCH' : 'POST';
        const url = roomData.id ? `/api/rooms/${roomData.id}` : '/api/rooms';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData)
        });

        if (res.ok) {
            fetchRooms();
            setIsModalOpen(false);
            setSelectedRoom(null);
        } else {
            throw new Error('Failed to save');
        }
    };

    const handleEdit = (room: any) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedRoom(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this room?')) return;

        const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchRooms();
        } else {
            alert('Cannot delete room with active bookings.');
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <a href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm mb-2 block">
                        ← Back to Dashboard
                    </a>
                    <h1 className="text-4xl font-bold text-white mb-2">Room Management</h1>
                    <p className="text-slate-500">Update pricing, amenities, and room status.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="btn-primary shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                >
                    Add New Room
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="glass-card p-6 flex flex-col items-center text-center group hover:border-[#39ff14]/30 transition-all relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(room.id); }}
                            className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"
                            title="Delete Room"
                        >
                            🗑️
                        </button>
                        <div className="w-16 h-16 rounded-2xl bg-[#39ff14]/10 text-[#39ff14] flex items-center justify-center text-3xl mb-6 border border-[#39ff14]/20 group-hover:scale-110 transition-transform duration-500">
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
                                <p className="text-[#39ff14] font-bold">Active</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleEdit(room)}
                            className="btn-outline w-full py-3 text-xs uppercase font-black tracking-widest hover:text-[#39ff14] hover:border-[#39ff14]"
                        >
                            Edit Details
                        </button>
                    </div>
                ))}
            </div>

            <RoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRoom}
                room={selectedRoom}
            />
        </div>
    );
}
