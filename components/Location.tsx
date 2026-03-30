'use client';

import { motion, useInView } from 'framer-motion';
import {
    Building2,
    Clock3,
    Mail,
    MapPinned,
    Phone,
    Route,
    Sparkles,
} from 'lucide-react';
import { useRef } from 'react';

const nearbyPlaces = [
    { name: 'Kalemegdan Fortress', distance: '10 min walk', icon: Building2 },
    { name: "Branko's Bridge", distance: '3 min walk', icon: Route },
    { name: 'Knez Mihailova', distance: '10 min walk', icon: Route },
    { name: 'Republic Square', distance: '12 min walk', icon: Clock3 },
];

export default function Location() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const mapSrc =
        'https://maps.google.com/maps?ll=44.812727,20.454593&q=44.812727,20.454593+(Hostel%20Downtown%20Inn)&t=&z=18&ie=UTF8&iwloc=B&output=embed';

    return (
        <section
            id="location"
            className="relative overflow-hidden px-6 py-16 md:px-8 md:py-24 lg:py-28"
        >
            <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#39ff14]/6 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-12 right-0 h-72 w-72 rounded-full bg-[#ffff00]/5 blur-[130px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-5xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                        <MapPinned size={14} className="text-[#39ff14]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                            Find Us
                        </span>
                    </div>

                    <h2 className="section-title mt-6 text-4xl leading-[0.95] md:text-5xl lg:text-6xl">
                        Our <span className="text-gradient">Location</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                        Located in Belgrade&apos;s Savamala district, within walking distance of the river, the city center, and the practical spots guests use most.
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(330px,0.94fr)]">
                    <motion.div
                        initial={{ opacity: 0, x: -36 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.12 }}
                        className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.96)_0%,rgba(9,15,34,0.94)_100%)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:p-5"
                    >
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-4 py-3.5">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Hostel Downtown Inn
                                </p>
                                <h3 className="mt-1 text-xl font-bold text-white">Koce Popovica 6, Belgrade</h3>
                            </div>
                            <span className="inline-flex rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39ff14]">
                                Exact pinned location
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#08101f]">
                            <div className="relative h-[300px] sm:h-[360px] md:h-[520px]">
                                <iframe
                                    src={mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Hostel Downtown Inn location"
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 36 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid gap-5"
                    >
                        <div className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2">
                                <Sparkles size={14} className="text-[#39ff14]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                    Our Address
                                </span>
                            </div>

                            <div className="mt-5 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                                <p className="font-heading text-2xl font-bold text-white">Koce Popovica 6</p>
                                <p className="mt-2 text-sm leading-6 text-slate-300">11000 Belgrade, Serbia</p>
                                <p className="mt-4 text-sm leading-6 text-slate-400">
                                    A central city base close to the river, bridges, and the walkable core of Belgrade.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-6">
                            <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Nearby Attractions
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold text-white">Walkable highlights</h3>
                                </div>
                                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    From the hostel
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {nearbyPlaces.map((place) => {
                                    const Icon = place.icon;

                                    return (
                                        <div
                                            key={place.name}
                                            className="flex flex-col items-start gap-3 rounded-[1.25rem] border border-white/6 bg-white/[0.035] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 text-[#39ff14]">
                                                    <Icon size={18} strokeWidth={2.1} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-200 md:text-base">{place.name}</span>
                                            </div>
                                            <span className="rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#39ff14]">
                                                {place.distance}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <a
                                href="tel:+381652288200"
                                className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition-colors hover:border-[#39ff14]/20"
                            >
                                <Phone size={18} className="text-[#39ff14]" />
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Call Us
                                </p>
                                <p className="mt-2 text-sm font-medium text-white">+381 65 228 8200</p>
                            </a>

                            <a
                                href="mailto:hostelinndowntown@gmail.com"
                                className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition-colors hover:border-[#39ff14]/20"
                            >
                                <Mail size={18} className="text-[#39ff14]" />
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Email
                                </p>
                                <p className="mt-2 break-all text-sm font-medium text-white">
                                    hostelinndowntown@gmail.com
                                </p>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
