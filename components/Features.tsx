'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { featuresData } from '@/lib/data';

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" className="relative py-32 px-6 md:px-8 overflow-hidden">
            {/* Background Decoration */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(57, 255, 20, 0.3) 50%, transparent 100%)'
                }}
            />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    {/* Section Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#ffff00]/30 bg-[#ffff00]/10">
                        <span className="text-[#ffff00] text-sm font-semibold tracking-wide uppercase">
                            Why Choose Us
                        </span>
                    </div>

                    <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6">
                        What We <span className="text-gradient">Offer</span>
                    </h2>
                    <p className="section-subtitle">
                        Everything you need for an unforgettable stay in the heart of Belgrade
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-card group text-center"
                        >
                            {/* Icon */}
                            <div className="icon-glow mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-3xl">{feature.icon}</span>
                            </div>

                            <h4 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300">
                                {feature.title}
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover accent line */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)'
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
