'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Location() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const nearbyPlaces = [
        { icon: '🏰', name: 'Kalemegdan Fortress', distance: '5 min walk' },
        { icon: '🌉', name: "Branko's Bridge", distance: '3 min walk' },
        { icon: '🚶', name: 'Knez Mihailova', distance: '10 min walk' },
        { icon: '🎭', name: 'Republic Square', distance: '12 min walk' },
    ];

    return (
        <section id="location" className="relative py-32 px-6 md:px-8 overflow-hidden">
            {/* Background Decoration */}
            <div
                className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-15 pointer-events-none"
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-purple-400/30 bg-purple-400/10">
                        <span className="text-purple-400 text-sm font-semibold tracking-wide uppercase">
                            📍 Location
                        </span>
                    </div>

                    <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6">
                        Find <span className="text-gradient">Us</span>
                    </h2>
                    <p className="section-subtitle">
                        Located in the heart of Belgrade's historic Savamala district
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-card p-2 overflow-hidden h-full min-h-[400px]"
                    >
                        <div className="relative rounded-xl overflow-hidden h-full w-full">
                            <iframe
                                src="https://maps.google.com/maps?q=Karađorđeva%2069,%20Belgrade&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '100%' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6 h-full flex flex-col"
                    >
                        {/* Address Card */}
                        <div className="glass-card">
                            <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-2xl">🏠</span>
                                <span className="text-gradient">Our Address</span>
                            </h3>
                            <p className="text-slate-300 text-lg mb-2">
                                Karađorđeva 69
                            </p>
                            <p className="text-slate-400">
                                11000 Belgrade, Serbia
                            </p>
                        </div>

                        {/* Nearby Places */}
                        <div className="glass-card flex-grow">
                            <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-2xl">🗺️</span>
                                <span className="text-gradient">Nearby Attractions</span>
                            </h3>
                            <div className="space-y-4">
                                {nearbyPlaces.map((place, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{place.icon}</span>
                                            <span className="text-white font-medium">{place.name}</span>
                                        </div>
                                        <span className="text-[#39ff14] text-sm font-semibold">{place.distance}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="glass-card">
                            <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-2xl">📞</span>
                                <span className="text-gradient">Contact Us</span>
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="tel:+381652288200"
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#39ff14]/10 transition-colors group"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <span className="text-xl">📱</span>
                                    <span className="text-slate-300 group-hover:text-[#39ff14] transition-colors">
                                        +381 65 228 8200
                                    </span>
                                </a>
                                <a
                                    href="mailto:hostelinndowntown@gmail.com"
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#39ff14]/10 transition-colors group"
                                >
                                    <span className="text-xl">✉️</span>
                                    <span className="text-slate-300 group-hover:text-[#39ff14] transition-colors">
                                        hostelinndowntown@gmail.com
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
