'use client';

import { ArrowRight, MapPinned, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const heroStats = [
    { value: '4.8', label: 'TripAdvisor rating' },
    { value: '10K+', label: 'Happy guests' },
    { value: 'City', label: 'Views' },
];

export default function Hero() {
    return (
        <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute left-0 top-0 h-full w-full object-cover"
                style={{ zIndex: -20 }}
            >
                <source src="/assets/videos/frontpage.mp4" type="video/mp4" />
            </video>

            <div
                className="absolute inset-0"
                style={{
                    background: `
                        linear-gradient(180deg,
                            rgba(5, 8, 22, 0.36) 0%,
                            rgba(5, 8, 22, 0.58) 30%,
                            rgba(5, 8, 22, 0.86) 72%,
                            rgba(5, 8, 22, 0.98) 100%
                        )
                    `,
                    zIndex: -10,
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(57,255,20,0.14),transparent_34%)]" />

            <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-32 text-center md:px-8 md:pt-36"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/25 bg-[#39ff14]/10 px-5 py-2.5 backdrop-blur-sm"
                >
                    <Star size={14} className="fill-[#39ff14] text-[#39ff14]" />
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                        Top Rated in Belgrade
                    </span>
                </motion.div>

                <h1 className="section-title mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                    <span className="text-white">Welcome to</span>
                    <br />
                    <span className="text-gradient">Downtown Inn</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.35 }}
                    className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl lg:text-2xl"
                >
                    Experience Belgrade with premium comfort, a central base in Savamala,
                    and a calmer city stay shaped around practical details guests actually use.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.5 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-3"
                >
                    {['Central Savamala location', 'Bright rooms', 'City views'].map((item) => (
                        <span
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200"
                        >
                            <Sparkles size={12} className="text-[#39ff14]" />
                            {item}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.68 }}
                    className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <a href="#rooms" className="btn-primary min-w-[220px] justify-center gap-2">
                        Explore Rooms
                        <ArrowRight size={16} />
                    </a>
                    <a
                        href="https://www.tripadvisor.rs/Hotel_Review-g294472-d3298059-Reviews-Hostel_Downtown_Inn_Belgrade-Belgrade.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline min-w-[220px] justify-center gap-2"
                    >
                        <MapPinned size={16} />
                        TripAdvisor Reviews
                    </a>
                </motion.div>

                <motion.div
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.95 }}
                    className="mt-12 grid grid-cols-3 gap-3 sm:gap-4"
                >
                    {heroStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-[1.2rem] border border-white/8 bg-[rgba(9,15,34,0.52)] px-3 py-4 backdrop-blur-md sm:rounded-[1.5rem] sm:px-5 sm:py-5"
                        >
                            <div className="text-xl font-bold text-gradient-gold sm:text-3xl">{stat.value}</div>
                            <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-400 sm:text-sm sm:tracking-[0.18em]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-600 p-1"
                    >
                        <div className="h-3 w-1.5 rounded-full bg-[#39ff14]" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
