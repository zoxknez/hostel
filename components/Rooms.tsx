'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { roomsData } from '@/lib/data';
import RoomModal from './RoomModal';
import type { Room } from '@/lib/data';
import Image from 'next/image';

export default function Rooms() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    return (
        <>
            <section
                id="rooms"
                className="relative py-32 px-6 md:px-8 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #050816 0%, #0c1428 50%, #050816 100%)'
                }}
            >
                {/* Decorative Orb */}
                <div
                    className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, #915eff 0%, transparent 70%)',
                        filter: 'blur(100px)',
                        transform: 'translateX(-50%)'
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10">
                            <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">
                                Accommodations
                            </span>
                        </div>

                        <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6">
                            Our <span className="text-gradient">Rooms</span>
                        </h2>
                        <p className="section-subtitle">
                            Sunny, bright, and spotless rooms designed to make you feel relaxed and enjoy your stay
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {roomsData.map((room, index) => (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="glass-card overflow-hidden p-0 cursor-pointer group"
                                onClick={() => setSelectedRoom(room)}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={room.images[0]}
                                        alt={room.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(5, 8, 22, 0.95) 100%)'
                                        }}
                                    />
                                    {/* View Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        View Details →
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                                        {room.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-5">
                                        {room.subtitle}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {room.features.slice(0, 3).map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="feature-badge"
                                            >
                                                {feature.icon} {feature.title}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedRoom(room);
                                            }}
                                            className="btn-primary flex-1 py-3 text-xs"
                                        >
                                            View Details
                                        </button>
                                        <a
                                            href={`/book?room=${room.id}`}
                                            className="btn-outline flex-1 py-3 text-xs text-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Book Now
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Important Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="glass-card max-w-4xl mx-auto relative overflow-hidden"
                    >
                        {/* Decorative corner */}
                        <div
                            className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle at 100% 0%, #00f5ff 0%, transparent 70%)'
                            }}
                        />

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">ℹ️</span>
                            <h4 className="font-heading text-2xl font-bold text-gradient">
                                Important Information
                            </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                                <span className="text-xl">📍</span>
                                <div>
                                    <p className="font-medium text-white">5th Floor Location</p>
                                    <p className="text-sm text-slate-400">Building without elevator</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                                <span className="text-xl">🏙️</span>
                                <div>
                                    <p className="font-medium text-white">Savamala District</p>
                                    <p className="text-sm text-slate-400">Belgrade's bohemian quarter</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                                <span className="text-xl">🚶</span>
                                <div>
                                    <p className="font-medium text-white">10 Min to Knez Mihailova</p>
                                    <p className="text-sm text-slate-400">Main pedestrian zone</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                                <span className="text-xl">💶</span>
                                <div>
                                    <p className="font-medium text-white">City Tax: €1.35/night</p>
                                    <p className="text-sm text-slate-400">Paid in cash on arrival</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-3">
                            <span className="text-2xl">🕐</span>
                            <span className="text-lg font-bold text-white">24/7 Reception</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Room Modal */}
            {selectedRoom && (
                <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
            )}
        </>
    );
}
