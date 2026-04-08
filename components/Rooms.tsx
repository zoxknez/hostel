'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
    ArrowUpRight,
    Bath,
    BedDouble,
    Building2,
    CookingPot,
    Eye,
    Footprints,
    Info,
    Lightbulb,
    LockKeyhole,
    type LucideIcon,
    MapPinned,
    Sparkles,
    SunMedium,
    Users,
    WalletCards,
    Wifi,
} from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '../i18n/routing';
import { roomsData } from '@/lib/data';
import type { Room } from '@/lib/data';
import RoomModal from './RoomModal';
import { useTranslations } from 'next-intl';

type TKey = Parameters<ReturnType<typeof useTranslations<'Rooms'>>>[0];

const roomFeatureIconMap: Record<string, LucideIcon> = {
    'Double Bed': BedDouble,
    '4 Beds': Users,
    '6 Beds': Users,
    'Shared Bathroom': Bath,
    'Kitchen Access': CookingPot,
    Terrace: SunMedium,
    WiFi: Wifi,
    'City Maps': MapPinned,
    'Personal Lockers': LockKeyhole,
    'Reading Lights': Lightbulb,
    'Great Views': Eye,
};

export default function Rooms() {
    const t = useTranslations('Rooms');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const roomMeta: Record<string, {
        eyebrow: string;
        accent: string;
        note: string;
    }> = {
        double: {
            eyebrow: t('doubleEyebrow'),
            accent: 'from-[#39ff14]/18 via-[#39ff14]/8 to-transparent',
            note: t('doubleNote'),
        },
        'four-bed': {
            eyebrow: t('fourEyebrow'),
            accent: 'from-[#ffff00]/16 via-[#ffff00]/7 to-transparent',
            note: t('fourNote'),
        },
        'six-bed': {
            eyebrow: t('sixEyebrow'),
            accent: 'from-cyan-400/16 via-cyan-400/7 to-transparent',
            note: t('sixNote'),
        },
    };

    const infoCards: Array<{
        title: string;
        description: string;
        icon: LucideIcon;
        accent: string;
        glow: string;
        label: string;
    }> = [
        {
            title: t('info1Title'),
            description: t('info1Desc'),
            icon: MapPinned,
            accent: 'text-[#39ff14]',
            glow: 'from-[#39ff14]/16 via-[#39ff14]/6 to-transparent',
            label: t('info1Label'),
        },
        {
            title: t('info2Title'),
            description: t('info2Desc'),
            icon: Building2,
            accent: 'text-[#ffff00]',
            glow: 'from-[#ffff00]/16 via-[#ffff00]/6 to-transparent',
            label: t('info2Label'),
        },
        {
            title: t('info3Title'),
            description: t('info3Desc'),
            icon: Footprints,
            accent: 'text-cyan-300',
            glow: 'from-cyan-400/16 via-cyan-400/6 to-transparent',
            label: t('info3Label'),
        },
        {
            title: t('info4Title'),
            description: t('info4Desc'),
            icon: WalletCards,
            accent: 'text-emerald-300',
            glow: 'from-emerald-400/16 via-emerald-400/6 to-transparent',
            label: t('info4Label'),
        },
    ];

    const translatedRoomsData: Room[] = roomsData.map(room => {
        let titleKey = 'doubleTitle';
        let subKey = 'doubleSubtitle';
        let descKey = 'doubleDesc';
        let feat1Key = 'doubleFeature1';
        let feat1Static = 'Double Bed';
        
        if (room.id === 'four-bed') {
            titleKey = 'fourTitle';
            subKey = 'fourSubtitle';
            descKey = 'fourDesc';
            feat1Key = 'fourFeature1';
            feat1Static = '4 Beds';
        } else if (room.id === 'six-bed') {
            titleKey = 'sixTitle';
            subKey = 'sixSubtitle';
            descKey = 'sixDesc';
            feat1Key = 'sixFeature1';
            feat1Static = '6 Beds';
        }

        const roomInfoDetails = [
            t('info1Desc'),
            t('info3Desc'),
            t('info4Desc')
        ];

        return {
            ...room,
            title: t(titleKey as TKey),
            subtitle: t(subKey as TKey),
            description: t(descKey as TKey),
            details: roomInfoDetails,
            features: room.features.map(f => {
                let trans;
                if (f.title === feat1Static) trans = t(feat1Key as TKey);
                else if (f.title === 'Shared Bathroom') trans = t('sharedFeatureBath');
                else if (f.title === 'Kitchen Access') trans = t('sharedFeatureKitchen');
                else if (f.title === 'Terrace') trans = t('sharedFeatureTerrace');
                else if (f.title === 'WiFi') trans = t('sharedFeatureWiFi');
                else if (f.title === 'City Maps') trans = t('sharedFeatureMaps');
                else if (f.title === 'Personal Lockers') trans = t('sharedFeatureLocker');
                else if (f.title === 'Reading Lights') trans = t('sharedFeatureLight');
                else if (f.title === 'Great Views') trans = t('sharedFeatureViews');
                else trans = f.title;
                return { ...f, staticTitle: f.title, title: trans };
            })
        };
    });

    return (
        <>
            <section
                id="rooms"
                className="relative py-16 md:py-24 lg:py-28 px-6 md:px-8 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #050816 0%, #0c1428 50%, #050816 100%)'
                }}
            >
                <div
                    className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, #ffff00 0%, transparent 70%)',
                        filter: 'blur(100px)',
                        transform: 'translateX(-50%)'
                    }}
                />
                <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[#39ff14]/6 blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10">
                            <Sparkles size={14} className="text-[#39ff14]" />
                            <span className="text-[#39ff14] text-[11px] font-semibold tracking-[0.24em] uppercase">
                                {t('accommodations')}
                            </span>
                        </div>

                        <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6 leading-[0.95]">
                            {t('our')} <span className="text-gradient">{t('rooms')}</span>
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                            {t('description')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-12">
                        {translatedRoomsData.map((room, index) => {
                            const meta = roomMeta[room.id];

                            return (
                                <motion.div
                                    key={room.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.12 }}
                                    className="group relative overflow-hidden rounded-[1.9rem] border border-white/8 bg-[#101833]/88 cursor-pointer"
                                    onClick={() => setSelectedRoom(room)}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} pointer-events-none`} />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)] pointer-events-none" />

                                    <div className="relative z-10 p-5">
                                        <div className="relative h-60 w-full overflow-hidden rounded-[1.45rem]">
                                            <Image
                                                src={room.images[0]}
                                                alt={room.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: 'linear-gradient(180deg, rgba(5, 8, 22, 0.05) 0%, rgba(5, 8, 22, 0.78) 100%)'
                                                }}
                                            />
                                            <div className="absolute top-4 left-4 inline-flex rounded-full border border-white/10 bg-[#091122]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                                                {meta.eyebrow}
                                            </div>
                                            <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span>{t('viewDetails')}</span>
                                                <ArrowUpRight size={12} />
                                            </div>
                                        </div>

                                        <div className="pt-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                                                        {room.title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-slate-400">
                                                        {room.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-sm leading-7 text-slate-300 sm:min-h-[3.5rem]">
                                                {meta.note}
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-2.5">
                                                {room.features.slice(0, 3).map((feature) => {
                                                    const Icon = roomFeatureIconMap[feature.staticTitle ?? feature.icon] ?? Sparkles;

                                                    return (
                                                        <span
                                                            key={feature.title}
                                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300"
                                                        >
                                                            <Icon size={12} strokeWidth={2.2} className="text-[#39ff14]" />
                                                            {feature.title}
                                                        </span>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedRoom(room);
                                                    }}
                                                    className="btn-primary flex-1 py-3 text-xs"
                                                >
                                                    {t('viewDetails')}
                                                </button>
                                                <Link
                                                    href={`/book?room=${room.id}`}
                                                    className="btn-outline flex-1 py-3 text-xs text-center"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {t('bookNow')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="max-w-5xl mx-auto rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(10,15,35,0.92)_100%)] backdrop-blur-xl p-5 md:p-7 lg:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] relative overflow-hidden"
                    >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/35 to-transparent pointer-events-none" />

                        <div className="grid gap-6 xl:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] xl:items-start">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2">
                                    <Info size={14} className="text-[#39ff14]" />
                                    <span className="text-[#39ff14] text-[11px] font-semibold uppercase tracking-[0.22em]">
                                        {t('stayDetails')}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="font-heading text-2xl md:text-3xl font-bold text-white">
                                        <span className="text-gradient">{t('importantInformation')}</span>
                                    </h4>
                                    <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-slate-300">
                                        {t('importantDesc')}
                                    </p>
                                </div>

                                <div className="rounded-[1.4rem] border border-white/6 bg-white/[0.035] px-4 py-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        {t('beforeYouArrive')}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                        {t('beforeDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                                {infoCards.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="group relative overflow-hidden rounded-[1.45rem] border border-white/6 bg-white/[0.04] p-4 md:p-5 transition-colors hover:border-[#39ff14]/20 hover:bg-white/[0.05]"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} pointer-events-none`} />

                                            <div className="relative z-10">
                                                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${item.accent}`}>
                                                        <Icon size={20} strokeWidth={2.2} />
                                                    </div>
                                                    <span className="rounded-full border border-white/10 bg-[#091122]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                                        {item.label}
                                                    </span>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="font-semibold text-white">{item.title}</p>
                                                    <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedRoom && (
                    <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
