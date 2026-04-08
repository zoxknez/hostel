'use client';

import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Bath,
    BedDouble,
    CookingPot,
    Eye,
    Info,
    Lightbulb,
    LockKeyhole,
    MapPinned,
    Phone,
    Sparkles,
    SunMedium,
    Tv2,
    Wifi,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Room } from '@/lib/data';
import Image from 'next/image';
import { Link } from '../i18n/routing';
import { useTranslations } from 'next-intl';

interface RoomModalProps {
    room: Room;
    onClose: () => void;
}

const featureIconMap: Record<string, LucideIcon> = {
    'Double Bed': BedDouble,
    '4 Beds': BedDouble,
    '6 Beds': BedDouble,
    'Shared Bathroom': Bath,
    'Kitchen Access': CookingPot,
    Terrace: SunMedium,
    Entertainment: Tv2,
    WiFi: Wifi,
    'Free WiFi': Wifi,
    'City Maps': MapPinned,
    'Free Maps': MapPinned,
    'Personal Lockers': LockKeyhole,
    'Reading Lights': Lightbulb,
    'Great Views': Eye,
};

export default function RoomModal({ room, onClose }: RoomModalProps) {
    const t = useTranslations('Rooms');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const meta = {
        double: {
            eyebrow: t('doubleModalEyebrow'),
            summary: t('doubleModalSummary'),
            badge: t('doubleModalBadge'),
            accent: 'from-[#39ff14]/18 via-[#39ff14]/8 to-transparent',
            amenities: [t('doubleModalAm1'), t('doubleModalAm2'), t('doubleModalAm3'), t('doubleModalAm4'), t('doubleModalAm5'), t('doubleModalAm6')],
        },
        'four-bed': {
            eyebrow: t('fourModalEyebrow'),
            summary: t('fourModalSummary'),
            badge: t('fourModalBadge'),
            accent: 'from-[#ffff00]/16 via-[#ffff00]/7 to-transparent',
            amenities: [t('fourModalAm1'), t('fourModalAm2'), t('fourModalAm3'), t('fourModalAm4'), t('fourModalAm5'), t('fourModalAm6')],
        },
        'six-bed': {
            eyebrow: t('sixModalEyebrow'),
            summary: t('sixModalSummary'),
            badge: t('sixModalBadge'),
            accent: 'from-cyan-400/16 via-cyan-400/7 to-transparent',
            amenities: [t('sixModalAm1'), t('sixModalAm2'), t('sixModalAm3'), t('sixModalAm4'), t('sixModalAm5'), t('sixModalAm6')],
        },
    }[room.id] ?? {
        eyebrow: t('modalEyebrow'),
        summary: room.description,
        badge: 'Hostel Downtown Inn',
        accent: 'from-[#39ff14]/16 via-[#39ff14]/8 to-transparent',
        amenities: ['WiFi'],
    };

    const stayNotes = useMemo(() => room.details.slice(0, 3), [room.details]);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }

            if (room.images.length > 1 && event.key === 'ArrowRight') {
                setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
            }

            if (room.images.length > 1 && event.key === 'ArrowLeft') {
                setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
            }
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, room.images.length]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(5,8,22,0.88)] px-3 py-3 backdrop-blur-xl md:px-8 md:py-5 md:items-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`room-modal-title-${room.id}`}
                className="relative w-full max-w-6xl overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.97)_0%,rgba(9,14,34,0.95)_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:max-h-[calc(100vh-2.5rem)] md:rounded-[2rem] lg:h-[82vh] lg:max-h-[820px]"
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/35 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#39ff14]/6 blur-[130px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#ffff00]/5 blur-[120px] pointer-events-none" />

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close room details"
                    className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#07101f]/85 text-slate-200 transition-all hover:scale-105 hover:border-[#39ff14]/30 hover:text-white md:right-4 md:top-4 md:h-11 md:w-11"
                >
                    <X size={18} />
                </button>

                <div className="grid lg:h-full lg:grid-cols-[minmax(0,0.94fr)_minmax(360px,0.9fr)]">
                    <div className="relative h-[260px] overflow-hidden bg-[#08101f] sm:h-[320px] md:h-[430px] lg:h-full">
                        <Image
                            src={room.images[currentImageIndex]}
                            alt={room.title}
                            fill
                            priority
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.08)_0%,rgba(5,8,22,0.2)_48%,rgba(5,8,22,0.78)_100%)]" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-55`} />

                        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08101f]/80 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-100 sm:left-4 sm:top-4 sm:px-3 sm:tracking-[0.2em] md:left-5 md:top-5">
                            <Sparkles size={12} className="text-[#39ff14]" />
                            {meta.eyebrow}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-5 md:left-5 md:right-5">
                            <div className="rounded-[1.35rem] border border-white/10 bg-[#08101f]/68 p-3.5 backdrop-blur-md md:rounded-[1.5rem] md:p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="inline-flex rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200 sm:px-3 sm:tracking-[0.18em]">
                                        {meta.badge}
                                    </div>
                                    <div className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold text-white">
                                        {String(currentImageIndex + 1).padStart(2, '0')} / {String(room.images.length).padStart(2, '0')}
                                    </div>
                                </div>

                                {room.images.length > 1 && (
                                    <div className="mt-3 flex items-center gap-2.5 md:mt-4 md:gap-3">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={prevImage}
                                                aria-label="Previous room image"
                                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white transition-all hover:border-[#39ff14]/30 hover:text-[#39ff14] md:h-10 md:w-10"
                                            >
                                                <ArrowLeft size={17} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={nextImage}
                                                aria-label="Next room image"
                                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white transition-all hover:border-[#39ff14]/30 hover:text-[#39ff14] md:h-10 md:w-10"
                                            >
                                                <ArrowRight size={17} />
                                            </button>
                                        </div>

                                        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-1 sm:gap-2">
                                            {room.images.map((image, index) => (
                                                <button
                                                    key={image}
                                                    type="button"
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    aria-label={`Show room image ${index + 1}`}
                                                    className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border transition-all sm:h-12 sm:w-12 md:h-14 md:w-14 ${
                                                        index === currentImageIndex
                                                            ? 'border-[#39ff14] shadow-[0_0_0_1px_rgba(57,255,20,0.4)]'
                                                            : 'border-white/10 opacity-70 hover:opacity-100'
                                                    }`}
                                                >
                                                    <Image
                                                        src={image}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/8 lg:border-l lg:border-t-0 lg:min-h-0 lg:overflow-y-auto">
                        <div className="flex h-full flex-col p-4 sm:p-5 md:p-7 lg:p-8">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2">
                                <Info size={14} className="text-[#39ff14]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                    {t('modalEyebrow')}
                                </span>
                            </div>

                            <h2
                                id={`room-modal-title-${room.id}`}
                                className="mt-4 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
                            >
                                <span className="text-gradient">{room.title}</span>
                            </h2>
                            <p className="mt-2 text-sm text-slate-400 sm:text-base">{room.subtitle}</p>
                            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-[15px]">
                                {meta.summary}
                            </p>

                            <div className="mt-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        {t('modalEyebrow')}
                                    </span>
                                </div>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    {room.features.map((feature) => {
                                        const Icon = featureIconMap[feature.staticTitle ?? feature.icon] ?? Sparkles;

                                        return (
                                            <div
                                                key={feature.title}
                                                className="flex items-center gap-3 rounded-[1.15rem] border border-white/6 bg-white/[0.035] px-4 py-3"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/80 text-[#39ff14] sm:h-11 sm:w-11">
                                                    <Icon size={18} strokeWidth={2.1} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-200">
                                                    {feature.title}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    {t('stayNotes')}
                                </p>
                                <div className="mt-3 space-y-3">
                                    {stayNotes.map((detail) => (
                                        <div
                                            key={detail}
                                            className="flex items-start gap-3 rounded-[1.15rem] border border-white/6 bg-white/[0.03] px-4 py-3"
                                        >
                                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.65)]" />
                                            <p className="text-sm leading-6 text-slate-300">{detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    {t('includedEssentials')}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2.5">
                                    {meta.amenities.map((amenity) => (
                                        <span
                                            key={amenity}
                                            className="inline-flex items-center rounded-full border border-[#39ff14]/20 bg-[#39ff14]/8 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#39ff14]"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={`/book?room=${room.id}`}
                                    className="btn-primary flex-1 py-3.5 text-center text-sm"
                                >
                                    {t('bookThisStay')}
                                </Link>
                                <a
                                    href="tel:+381652288200"
                                    className="btn-outline flex flex-1 items-center justify-center gap-2 py-3.5 text-center text-sm"
                                >
                                    <Phone size={16} />
                                    {t('quickCall')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
