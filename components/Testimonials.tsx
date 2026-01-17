'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Script from 'next/script';

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-24 px-6 md:px-8 overflow-hidden">
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

            {/* Background Decoration */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)',
                    filter: 'blur(120px)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    {/* Premium Light Container for Visibility */}
                    <div className="relative group">
                        {/* Soft Light Glow around the white card */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-cyan-400/10 to-white/20 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>

                        <div className="relative rounded-[2.5rem] p-1 md:p-1 bg-white overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)] border border-white/20">
                            {/* Inner Container with white background to make dark widget text pop */}
                            <div className="rounded-[2.4rem] overflow-hidden min-h-[500px] bg-white pt-10 pb-6 px-4">
                                <div className="elfsight-app-a66df53c-de61-4bb3-806d-b1222db66f2e" data-elfsight-app-lazy></div>
                            </div>
                        </div>

                        {/* Floating Decorative Elements Adjusted for Light Mode */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-[100px] animate-pulse delay-700" />
                    </div>
                </motion.div>

                {/* Subtle Branding Sync Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.6 } : {}}
                    transition={{ delay: 1.2 }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white font-black">
                            Live Feed Synchronized with <span className="text-cyan-400">TripAdvisor</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
