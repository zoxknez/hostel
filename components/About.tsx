'use client';

import { motion, useInView } from 'framer-motion';
import {
    CircleHelp,
    MapPinned,
    ShieldCheck,
    Sparkles,
    SunMedium,
    Ticket,
    TrainFront,
    Tv2,
    type LucideIcon,
} from 'lucide-react';
import { useRef } from 'react';

const facilityCards = [
    {
        title: 'Sunny Rooms',
        description: 'Bright, air-conditioned rooms with a spotless and relaxed feel.',
        icon: SunMedium,
        accent: 'from-[#39ff14]/16 via-[#39ff14]/8 to-transparent',
        iconColor: 'text-[#39ff14]',
    },
    {
        title: 'Entertainment',
        description: 'Cable TV, book exchange, and a relaxed common area for guests.',
        icon: Tv2,
        accent: 'from-[#ffff00]/18 via-[#ffff00]/8 to-transparent',
        iconColor: 'text-[#ffff00]',
    },
    {
        title: 'Guest Services',
        description: 'Laundry service and CCTV security focused on everyday comfort.',
        icon: ShieldCheck,
        accent: 'from-cyan-400/16 via-cyan-400/8 to-transparent',
        iconColor: 'text-cyan-300',
    },
];

const facilityAmenities = [
    'Unlimited High-speed WiFi',
    'Clean Sheets & Towels',
    '24h Hot Water',
    'Security Access Keys',
    'Fully Equipped Kitchen',
    'Belgrade Maps',
];

const guestInfoItems: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
    accent: string;
    iconColor: string;
}> = [
    {
        title: 'City & Country Info',
        description: 'Helpful orientation and practical local pointers for moving around Belgrade.',
        icon: MapPinned,
        accent: 'from-[#39ff14]/16 via-[#39ff14]/8 to-transparent',
        iconColor: 'text-[#39ff14]',
    },
    {
        title: 'Accommodation Advice',
        description: 'Useful stay-related recommendations if you need help planning around the city.',
        icon: CircleHelp,
        accent: 'from-[#ffff00]/18 via-[#ffff00]/8 to-transparent',
        iconColor: 'text-[#ffff00]',
    },
    {
        title: 'Transport Timetables',
        description: 'Quick guidance for buses, local transport timing, and practical route details.',
        icon: TrainFront,
        accent: 'from-cyan-400/16 via-cyan-400/8 to-transparent',
        iconColor: 'text-cyan-300',
    },
    {
        title: 'Ticket Reservations',
        description: 'Support with ticket-related questions and planning for onward travel.',
        icon: Ticket,
        accent: 'from-emerald-400/14 via-emerald-400/6 to-transparent',
        iconColor: 'text-emerald-300',
    },
    {
        title: 'Maps & Guides',
        description: 'Belgrade maps and practical tips that make exploring the city easier.',
        icon: Sparkles,
        accent: 'from-slate-200/10 via-slate-200/4 to-transparent',
        iconColor: 'text-white',
    },
];

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
                    className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.96)_0%,rgba(9,15,34,0.94)_100%)] p-5 md:p-7 lg:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/40 to-transparent pointer-events-none" />
                    <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#39ff14]/5 blur-[85px] pointer-events-none" />
                    <div className="absolute bottom-6 left-8 h-24 w-24 rounded-full bg-[#ffff00]/5 blur-[75px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col gap-6 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2">
                                    <Sparkles size={14} className="text-[#39ff14]" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                                        Designed Around Comfort
                                    </span>
                                </div>

                                <h2 className="section-title mt-4 text-3xl md:text-4xl lg:text-5xl leading-[0.95]">
                                    World-Class <span className="text-gradient">Facilities</span>
                                </h2>
                                <p className="mt-4 max-w-xl text-sm md:text-[15px] leading-relaxed text-slate-300">
                                    Bright rooms, shared spaces, and the practical details that make the stay feel easy from day one.
                                </p>
                            </div>

                            <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                3 comfort zones
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 lg:grid-cols-3">
                            {facilityCards.map((card, index) => {
                                const Icon = card.icon;

                                return (
                                    <motion.div
                                        key={card.title}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, delay: index * 0.08 }}
                                        className="group relative overflow-hidden rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-5 md:p-6"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 pointer-events-none`} />
                                        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)] pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${card.iconColor}`}>
                                                <Icon size={18} strokeWidth={2.2} />
                                            </div>
                                            <h3 className="mt-5 text-xl font-bold text-white">{card.title}</h3>
                                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                                {card.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-[1.55rem] border border-white/8 bg-[#0b1327]/85 p-4 md:p-5">
                            <div className="flex flex-col gap-3 border-b border-white/8 pb-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Included Essentials
                                    </p>
                                    <h3 className="mt-2 text-xl font-bold text-white">
                                        The practical details that make the stay easy
                                    </h3>
                                </div>
                                <span className="inline-flex w-fit rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#39ff14]">
                                    6 verified amenities
                                </span>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {facilityAmenities.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.035] px-4 py-3.5 transition-colors hover:border-[#39ff14]/20 hover:bg-white/[0.05]"
                                    >
                                        <span className="h-2 w-2 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.65)]" />
                                        <span className="text-sm font-medium text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid items-stretch gap-8 md:gap-10 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full"
                    >
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-7">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/35 to-transparent pointer-events-none" />
                            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#ffff00]/5 blur-[95px] pointer-events-none" />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex flex-col gap-5 border-b border-white/8 pb-5">
                                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2">
                                        <Sparkles size={14} className="text-[#39ff14]" />
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                            Experience The Vibe
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h2 className="section-title text-3xl leading-tight md:text-4xl">
                                            See The <span className="text-gradient">Atmosphere</span>
                                        </h2>
                                        <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                                            A quick look at the terrace, lounge, and shared spaces that shape the everyday hostel feel.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-1 flex-col">
                                    <div className="group relative min-h-[280px] flex-1 overflow-hidden rounded-[1.45rem] border border-white/8 bg-[#08101f] p-2">
                                        <div className="absolute inset-0 bg-[#39ff14]/10 opacity-0 transition-opacity duration-500 pointer-events-none z-20 group-hover:opacity-100" />
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="h-full w-full rounded-[1.15rem] object-cover"
                                        >
                                            <source src="/hostel-story.mp4" type="video/mp4" />
                                        </video>

                                        <div className="absolute inset-0 rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(5,8,22,0.06)_0%,rgba(5,8,22,0.22)_50%,rgba(5,8,22,0.84)_100%)]" />

                                        <div className="absolute inset-x-5 bottom-5">
                                            <div className="rounded-[1.35rem] border border-white/10 bg-[#08101f]/68 p-4 backdrop-blur-md">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                                    Inside The Stay
                                                </p>
                                                <div className="mt-3 flex flex-wrap gap-2.5">
                                                    {['Terrace scenes', 'Shared lounge', 'Real hostel atmosphere'].map((item) => (
                                                        <span
                                                            key={item}
                                                            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full"
                    >
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-7">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffff00]/35 to-transparent pointer-events-none" />
                            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#39ff14]/5 blur-[90px] pointer-events-none" />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex flex-col gap-5 border-b border-white/8 pb-5">
                                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ffff00]/15 bg-[#ffff00]/8 px-3.5 py-2">
                                        <Sparkles size={14} className="text-[#ffff00]" />
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffff00]">
                                            Local Support
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h2 className="section-title text-3xl leading-tight md:text-4xl">
                                            Helpful <span className="text-gradient">Guest Info</span>
                                        </h2>
                                        <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                                            During your stay, we can help with practical local information, transport basics, and everyday pointers that make the city easier to navigate.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid flex-1 content-start gap-3 sm:grid-cols-2">
                                    {guestInfoItems.map((item, index) => {
                                        const Icon = item.icon;

                                        return (
                                            <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, y: 18 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.45, delay: index * 0.06 }}
                                                className="group relative overflow-hidden rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4 md:p-4.5"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-75 pointer-events-none`} />
                                                <div className="relative z-10 flex items-start gap-3.5">
                                                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${item.iconColor}`}>
                                                        <Icon size={18} strokeWidth={2.2} />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-base font-bold text-white md:text-lg">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
