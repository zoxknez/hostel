'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="relative py-12 md:py-20 bg-[#050816] overflow-hidden">
            <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 flex items-center gap-3 pl-2">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39ff14]" />
                            </div>
                            <p className="text-white font-bold text-sm tracking-wide">
                                Live from downtown
                            </p>
                        </div>
                        <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden glass-card backdrop-blur-sm md:backdrop-blur-md p-2 group">
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

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                                Perfectly <span className="text-gradient">Centrally Located</span>
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-6 md:mb-8">
                                We are located in the center of the city, around a <span className="text-[#39ff14]">10-minute walk from Kalemegdan</span>, close to the River Sava, Branko&apos;s Bridge, and many more attractions.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    'Tourist attractions, markets, and clubs just around the corner',
                                    'About a 10-minute walk to Kalemegdan Fortress',
                                    'Hidden from street noise despite central location'
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
                                    We are located on the <strong>5th floor</strong> of a building with no elevator. However, we offer a huge beautiful terrace lounge where you can relax, enjoy coffee/tea, and take in the city view away from the noise.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-card backdrop-blur-sm md:backdrop-blur-md p-6 md:p-12 relative overflow-hidden"
                >
                    <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-[#39ff14]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="section-title text-3xl md:text-5xl text-center mb-8 md:mb-12">
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
                                <p className="text-slate-400 text-sm">Common room with cable TV (100+ channels), book exchange, and a social atmosphere.</p>
                            </div>
                            <div className="space-y-4 text-center p-4 group hover:bg-white/5 rounded-2xl transition-colors">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#39ff14]/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    🧺
                                </div>
                                <h3 className="text-xl font-bold text-white">Guest Services</h3>
                                <p className="text-slate-400 text-sm">Laundry service and CCTV security for a comfortable, well-organized stay.</p>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                'Unlimited High-speed WiFi',
                                'Clean Sheets & Towels',
                                '24h Hot Water',
                                'Security Access Keys',
                                'Fully Equipped Kitchen',
                                'Belgrade Maps'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#39ff14]/30 transition-colors">
                                    <span className="text-[#39ff14] text-xs">✦</span>
                                    <span className="text-xs font-medium text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="mb-4 flex items-center gap-3 pl-2">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffff00] opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffff00]" />
                            </div>
                            <p className="text-white font-bold text-sm tracking-wide">
                                Experience the Vibe
                            </p>
                        </div>
                        <div className="aspect-video rounded-2xl overflow-hidden glass-card backdrop-blur-sm md:backdrop-blur-md p-2 relative group">
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
                        <h2 className="section-title text-3xl md:text-4xl mb-6 leading-tight">
                            Helpful <span className="text-gradient">Guest Info</span>
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            During your stay, we can help you with practical local information such as:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'City & Country Info',
                                'Accommodation Advice',
                                'Transport Timetables',
                                'Ticket Reservations',
                                'Free Maps & Guides'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-[#ffff00]" />
                                    <span className="text-slate-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
