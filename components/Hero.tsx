'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ zIndex: -20 }}
            >
                <source src="/assets/videos/frontpage.mp4" type="video/mp4" />
            </video>

            {/* Premium Gradient Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        linear-gradient(180deg, 
                            rgba(5, 8, 22, 0.4) 0%,
                            rgba(5, 8, 22, 0.6) 30%,
                            rgba(5, 8, 22, 0.85) 70%,
                            rgba(5, 8, 22, 0.98) 100%
                        )
                    `,
                    zIndex: -10
                }}
            />

            {/* Decorative Orbs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animation: 'pulseGlow 4s ease-in-out infinite'
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #915eff 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animation: 'pulseGlow 4s ease-in-out infinite 1s'
                }}
            />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center z-10 max-w-5xl px-6 md:px-12"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">
                        ⭐ Top Rated in Belgrade
                    </span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="section-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
                    <span className="text-white">Welcome to</span>
                    <br />
                    <span className="text-gradient">Downtown Inn</span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
                    style={{ color: '#94a3b8' }}
                >
                    Experience Belgrade like never before. Premium comfort meets
                    <span className="text-white font-medium"> unbeatable location </span>
                    with stunning panoramic views of Kalemegdan Fortress.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <a href="#rooms" className="btn-primary min-w-[200px]">
                        Explore Rooms
                    </a>
                    <a
                        href="https://www.tripadvisor.rs/Hotel_Review-g294472-d3298059-Reviews-Hostel_Downtown_Inn_Belgrade-Belgrade.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline min-w-[200px]"
                    >
                        TripAdvisor Reviews
                    </a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
                >
                    {[
                        { value: '4.8★', label: 'TripAdvisor Rating' },
                        { value: '10K+', label: 'Happy Guests' },
                        { value: '24/7', label: 'Reception' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gradient-gold">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1"
                    >
                        <div className="w-1.5 h-3 rounded-full bg-cyan-400" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
