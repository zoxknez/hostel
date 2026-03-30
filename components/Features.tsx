'use client';

import { motion, useInView } from 'framer-motion';
import {
    BedDouble,
    Landmark,
    MapPinned,
    type LucideIcon,
    Sparkles,
    Sunset,
    Tv2,
    Wifi,
} from 'lucide-react';
import { useRef } from 'react';
import { featuresData } from '@/lib/data';

type HostelFeature = (typeof featuresData)[number];

const featureOrder = [
    'High-Speed WiFi',
    'Entertainment',
    'City Maps',
    'Panoramic Terrace',
    'Prime Location',
    'Comfort First',
] as const;

const orderedFeatures: HostelFeature[] = featureOrder
    .map((title) => featuresData.find((feature) => feature.title === title))
    .filter((feature): feature is HostelFeature => Boolean(feature));

const sectionHighlights = [
    {
        label: 'Balanced Comfort',
        description: 'Thoughtful essentials across every part of the stay.',
    },
    {
        label: 'Belgrade Atmosphere',
        description: 'A section that feels social, local, and rooftop-driven.',
    },
    {
        label: 'Refined Presentation',
        description: 'Cleaner cards and sharper hierarchy, aligned with the site.',
    },
];

const featurePresentation: Record<string, {
    accent: string;
    eyebrow: string;
    icon: LucideIcon;
    iconColor: string;
    footer: string;
}> = {
    'High-Speed WiFi': {
        accent: 'from-cyan-400/16 via-cyan-400/7 to-transparent',
        eyebrow: 'Always Connected',
        icon: Wifi,
        iconColor: 'text-cyan-300',
        footer: 'Work, browse, stream',
    },
    'Entertainment': {
        accent: 'from-[#ffff00]/18 via-[#ffff00]/8 to-transparent',
        eyebrow: 'Shared Lounge',
        icon: Tv2,
        iconColor: 'text-[#ffff00]',
        footer: 'Cable TV and social energy',
    },
    'City Maps': {
        accent: 'from-emerald-400/14 via-emerald-400/6 to-transparent',
        eyebrow: 'Local Guidance',
        icon: MapPinned,
        iconColor: 'text-emerald-300',
        footer: 'Explore smarter on foot',
    },
    'Panoramic Terrace': {
        accent: 'from-[#39ff14]/18 via-[#39ff14]/8 to-transparent',
        eyebrow: 'Signature Space',
        icon: Sunset,
        iconColor: 'text-[#39ff14]',
        footer: 'Rooftop views over the city',
    },
    'Prime Location': {
        accent: 'from-[#39ff14]/14 via-[#ffff00]/6 to-transparent',
        eyebrow: 'Downtown Base',
        icon: Landmark,
        iconColor: 'text-[#39ff14]',
        footer: 'Central and walkable',
    },
    'Comfort First': {
        accent: 'from-slate-200/10 via-slate-200/4 to-transparent',
        eyebrow: 'Rest Better',
        icon: BedDouble,
        iconColor: 'text-white',
        footer: 'Bright rooms, easy nights',
    },
};

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="features"
            className="relative py-16 md:py-24 lg:py-28 px-6 md:px-8 overflow-hidden"
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(57, 255, 20, 0.3) 50%, transparent 100%)'
                }}
            />
            <div className="absolute top-28 left-0 w-72 h-72 rounded-full bg-[#39ff14]/6 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-12 right-0 w-80 h-80 rounded-full bg-[#ffff00]/5 blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#ffff00]/20 bg-[#ffff00]/10 px-4 py-2">
                        <Sparkles size={14} className="text-[#ffff00]" />
                        <span className="text-[#ffff00] text-[11px] font-semibold tracking-[0.24em] uppercase">
                            Why Choose Us
                        </span>
                    </div>

                    <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mt-6 leading-[0.95]">
                        What We <span className="text-gradient">Offer</span>
                    </h2>
                    <p className="mt-5 text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                        Everything you need for an unforgettable stay in the heart of Belgrade,
                        presented in a cleaner and more balanced way for the web layout.
                    </p>

                    <div className="mt-8 grid gap-3 md:grid-cols-3">
                        {sectionHighlights.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                    {item.label}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
                    {orderedFeatures.map((feature, index) => {
                        const meta = featurePresentation[feature.title];
                        const Icon = meta.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#101833]/85"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} pointer-events-none`} />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)] pointer-events-none" />

                                <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="inline-flex items-center rounded-full border border-white/10 bg-[#091122]/80 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400">
                                            {meta.eyebrow}
                                        </div>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${meta.iconColor}`}>
                                            <Icon size={22} strokeWidth={2.2} />
                                        </div>
                                    </div>

                                    <h3 className="mt-8 font-heading text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-sm md:text-[15px] leading-7 text-slate-400">
                                        {feature.description}
                                    </p>

                                    <div className="mt-auto pt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.65)]" />
                                        <span>{meta.footer}</span>
                                    </div>
                                </div>

                                <div
                                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)'
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
