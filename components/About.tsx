'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative py-20 bg-[#050816] overflow-hidden">
            <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-8 space-y-24 relative z-10">

                {/* Intro & Location Split */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Video Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 flex items-center gap-3 pl-2">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39ff14]"></span>
                            </div>
                            <p className="text-white font-bold text-sm tracking-wide">
                                Live from downtown
                            </p>
                        </div>
                        <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden glass-card p-2 group">
                            <div className="absolute inset-0 bg-[#39ff14]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover rounded-xl"
                            >
                                <source src="/hostel-intro.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                                Welcome to <span className="text-gradient">Downtown Inn</span>
                            </h2>
                            <p className="text-xl text-slate-200 leading-relaxed mb-8 drop-shadow-md">
                                "Perfectly centrally located, with stunning views from our panoramic roof terrace."
                            </p>

                            <h3 className="text-2xl font-bold text-white mb-4">
                                Perfectly <span className="text-gradient">Centrally Located</span>
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                We are located in the center of the city, next to the <span className="text-[#39ff14]">Kalemegdan Fortress</span>, River Sava, Branko’s bridge, and many more attractions!
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "Tourist attractions, markets, clubs just around the corner",
                                    "One-minute walk from the central bus station",
                                    "Hidden from street noise despite central location"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[20px] h-[20px] rounded-full bg-[#39ff14]/20 flex items-center justify-center">
                                            <span className="text-[#39ff14] text-xs">✓</span>
                                        </div>
                                        <span className="text-slate-300 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="glass-card p-5 border-l-4 border-[#ffff00] bg-[#ffff00]/5">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="text-xl">⚠️</span> Important Note
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    We are located on the <strong>5th floor</strong> of a building with no elevator. However, we offer a huge beautiful terrace lounge where you can relax, drink free coffee/tea, and enjoy the stunning view away from the city noise!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Facilities Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#39ff14]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="section-title text-3xl md:text-5xl text-center mb-12">
                            World-Class <span className="text-gradient">Facilities</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4 text-center p-4 group hover:bg-white/5 rounded-2xl transition-colors">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#39ff14]/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    ☀️
                                </div>
                                <h3 className="text-xl font-bold text-white">Sunny Rooms</h3>
                                <p className="text-slate-400 text-sm">Bright, spacious, and spotless rooms designed for your relaxation. Air-conditioned for your comfort.</p>
                            </div>
                            <div className="space-y-4 text-center p-4 group hover:bg-white/5 rounded-2xl transition-colors">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#ffff00]/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    📺
                                </div>
                                <h3 className="text-xl font-bold text-white">Entertainment</h3>
                                <p className="text-slate-400 text-sm">Common room with cable TV (100+ channels), Book Exchange, and social atmosphere.</p>
                            </div>
                            <div className="space-y-4 text-center p-4 group hover:bg-white/5 rounded-2xl transition-colors">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#39ff14]/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    🧺
                                </div>
                                <h3 className="text-xl font-bold text-white">Guest Services</h3>
                                <p className="text-slate-400 text-sm">Laundry service, Hairdryer & Iron available, CCTV security, and helpful staff 24/7.</p>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "Unlimited High-speed WiFi",
                                "Free Coffee & Tea",
                                "Clean Sheets & Towels",
                                "24h Hot Water",
                                "Security Access Keys",
                                "Fully Equipped Kitchen",
                                "Belgrade Maps",
                                "No Curfew, No Lockout"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#39ff14]/30 transition-colors">
                                    <span className="text-[#39ff14] text-xs">✦</span>
                                    <span className="text-xs font-medium text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Services & Tours */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="mb-4 flex items-center gap-3 pl-2">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffff00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffff00]"></span>
                            </div>
                            <p className="text-white font-bold text-sm tracking-wide">
                                Experience the Vibe
                            </p>
                        </div>
                        <div className="aspect-video rounded-2xl overflow-hidden glass-card p-2 relative group">
                            <div className="absolute inset-0 bg-[#39ff14]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover rounded-xl"
                            >
                                <source src="/hostel-story.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2 space-y-6"
                    >
                        <h2 className="section-title text-3xl md:text-4xl mb-6">
                            We Are Here <span className="text-gradient">24/7</span>
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Our staff is available around the clock to help you with:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {[
                                "City & Country Info",
                                "Accommodation Advice",
                                "Transport Timetables",
                                "Ticket Reservations",
                                "Free Maps & Guides"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-[#ffff00]" />
                                    <span className="text-slate-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="glass-card p-6 bg-[#39ff14]/5">
                            <h3 className="text-lg font-bold text-[#39ff14] mb-3">One-Day Trips & Tours</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Immerse yourself in Serbian culture! We organize walking tours, communist tours, underground secrets tours, nightlife tours, and bicycle tours.
                            </p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                During summer, check out our van tours to the historical towns of Smederevo and Požarevac.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
