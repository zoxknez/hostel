'use client';

import { useState, useEffect } from 'react';

interface Room {
    id?: string;
    name: string;
    type: string;
    pricePerNight: number;
    capacity: number;
    description: string;
    amenities: string[];
    images: string[];
    isActive: boolean;
}

interface RoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (room: Room) => Promise<void>;
    room?: Room | null;
}

export default function RoomModal({ isOpen, onClose, onSave, room }: RoomModalProps) {
    const [formData, setFormData] = useState<Room>({
        name: '',
        type: 'Standard',
        pricePerNight: 0,
        capacity: 2,
        description: '',
        amenities: [],
        images: [],
        isActive: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (room) {
            setFormData(room);
        } else {
            setFormData({
                name: '',
                type: 'Standard',
                pricePerNight: 0,
                capacity: 2,
                description: '',
                amenities: [],
                images: [],
                isActive: true
            });
        }
    }, [room, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Failed to save room', error);
            alert('Failed to save room');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">
                    {room ? 'Edit Room' : 'Add New Room'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Room Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none [&>option]:text-black"
                            >
                                <option value="Standard">Standard</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Suite">Suite</option>
                                <option value="Dorm">Dorm</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Price per Night (€)</label>
                            <input
                                type="number"
                                name="pricePerNight"
                                value={formData.pricePerNight}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-400">Room Images</label>

                        {/* Image List */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                                    <img src={url} alt={`Room ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                images: prev.images.filter((_, i) => i !== index)
                                            }));
                                        }}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {/* Upload Button */}
                            <label className="border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#39ff14]/50 hover:bg-[#39ff14]/5 transition-all aspect-square relative">
                                {loading ? (
                                    <span className="text-xs text-slate-400 animate-pulse">Uploading...</span>
                                ) : (
                                    <>
                                        <span className="text-2xl text-slate-500 mb-1">+</span>
                                        <span className="text-xs text-slate-500">Add Image</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={loading}
                                    onChange={async (e) => {
                                        if (!e.target.files?.[0]) return;
                                        setLoading(true);
                                        const file = e.target.files[0];

                                        try {
                                            const { upload } = await import('@vercel/blob/client');
                                            const newBlob = await upload(file.name, file, {
                                                access: 'public',
                                                handleUploadUrl: '/api/upload',
                                            });

                                            setFormData(prev => ({
                                                ...prev,
                                                images: [...prev.images, newBlob.url]
                                            }));
                                        } catch (err) {
                                            console.error(err);
                                            alert('Upload failed');
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary px-8 py-2 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                        >
                            {loading ? 'Saving...' : 'Save Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
