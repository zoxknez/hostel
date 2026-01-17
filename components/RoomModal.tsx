'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Room } from '@/lib/data';
import Image from 'next/image';

interface RoomModalProps {
    room: Room;
    onClose: () => void;
}

export default function RoomModal({ room, onClose }: RoomModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                style={{
                    background: 'rgba(5, 8, 22, 0.9)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-card w-full max-w-5xl max-h-[90vh] overflow-y-auto p-0"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                        style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        ✕
                    </button>

                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Carousel */}
                        <div className="relative h-80 md:h-full min-h-[400px]">
                            <Image
                                src={room.images[currentImageIndex]}
                                alt={room.title}
                                fill
                                className="object-cover transition-opacity duration-500"
                            />

                            {/* Image Navigation */}
                            {room.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        →
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            <div
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm text-white font-medium"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {currentImageIndex + 1} / {room.images.length}
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="absolute bottom-16 left-4 right-4 flex gap-2 justify-center">
                                {room.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-12 h-12 rounded-lg overflow-hidden transition-all ${idx === currentImageIndex
                                            ? 'ring-2 ring-cyan-400 scale-110'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt=""
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <h2 className="font-heading text-3xl font-bold mb-2 text-gradient">
                                {room.title}
                            </h2>
                            <p className="text-slate-400 mb-6">{room.subtitle}</p>

                            {/* Features */}
                            <div className="mb-8">
                                <h4 className="font-heading text-lg font-semibold mb-4 text-white">
                                    Room Features
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {room.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                                        >
                                            <span className="text-xl">{feature.icon}</span>
                                            <span className="text-slate-300 text-sm">{feature.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h4 className="font-heading text-lg font-semibold mb-4 text-white">
                                    Included Amenities
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Free WiFi', 'Towels', 'Linens', 'Heating', 'Lockers', 'City Views'].map((amenity, idx) => (
                                        <span
                                            key={idx}
                                            className="feature-badge"
                                        >
                                            ✓ {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`/book?room=${room.id}`}
                                    className="btn-primary flex-1 justify-center py-4 text-center shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.5)]"
                                >
                                    Book This Stay
                                </a>
                                <a
                                    href="tel:+381652288200"
                                    className="btn-outline flex-1 justify-center py-4 text-center"
                                >
                                    Quick Call
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
