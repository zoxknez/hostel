import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Link } from '@/i18n/routing';
import { guestGuides } from '@/lib/guest-guides';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import {
    ArrowUpRight,
    BookOpenText,
    Clock3,
    Compass,
    MapPinned,
    Navigation2,
    ShieldCheck,
    Sparkles,
    type LucideIcon,
} from 'lucide-react';

type GuidesPageProps = {
    params: Promise<{ locale: string }>;
};

const iconMap: Record<(typeof guestGuides)[number]['icon'], LucideIcon> = {
    route: MapPinned,
    shield: ShieldCheck,
    map: Compass,
};

const iconColorMap: Record<(typeof guestGuides)[number]['icon'], string> = {
    route: 'text-[#39ff14]',
    shield: 'text-[#ffff00]',
    map: 'text-cyan-300',
};

const guideKeysMap: Record<string, string> = {
    'getting-here': 'gettingHere',
    'house-rules': 'houseRules',
    'belgrade-guide': 'belgradeGuide',
};

const mapSrc =
    'https://maps.google.com/maps?ll=44.812727,20.454593&q=44.812727,20.454593+(Hostel%20Downtown%20Inn)&t=&z=18&ie=UTF8&iwloc=B&output=embed';

const googleMapsHref =
    'https://www.google.com/maps/search/?api=1&query=Ko%C4%8De%20Popovi%C4%87a%206%2C%2011000%20Belgrade%2C%20Serbia';

export async function generateMetadata({ params }: GuidesPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'GuestGuides' });

    const title = `${t('guestGuides')} | Hostel Downtown Inn`;
    const description = t('subtitle');

    return {
        title,
        description,
        alternates: {
            canonical: '/guides',
        },
        openGraph: {
            type: 'website',
            url: '/guides',
            title,
            description,
            images: [
                {
                    url: '/logo.png',
                    width: 512,
                    height: 512,
                    alt: 'Hostel Downtown Inn logo',
                },
            ],
        },
        twitter: {
            card: 'summary',
            title,
            description,
            images: ['/logo.png'],
        },
    };
}

export default async function GuidesPage({ params }: GuidesPageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'GuestGuides' });
    const arrivalGuide = guestGuides.find((guide) => guide.slug === 'getting-here') ?? guestGuides[0];

    return (
        <main className="min-h-screen bg-primary">
            <Navigation />

            <section className="px-4 pb-16 pt-28 sm:px-6 md:px-8 md:pb-20 md:pt-36">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1fr)] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                                <BookOpenText size={14} className="text-[#39ff14]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                                    {t('guestGuides')}
                                </span>
                            </div>

                            <h1 className="section-title mt-6 max-w-4xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                                {t('practical')} <span className="text-gradient">{t('travelNotes')}</span>
                            </h1>
                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                                {t('subtitle')}
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Link
                                    href={`/guides/${arrivalGuide.slug}`}
                                    className="btn-primary w-full justify-center gap-2 px-5 py-3 text-sm sm:w-auto"
                                >
                                    <MapPinned size={16} />
                                    {t('gettingHereEyebrow')}
                                </Link>
                                <a
                                    href={googleMapsHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-[#39ff14]/20 hover:text-white sm:w-auto"
                                >
                                    <Navigation2 size={16} className="text-[#39ff14]" />
                                    Google Maps
                                </a>
                            </div>

                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        Address
                                    </p>
                                    <p className="mt-2 text-sm font-semibold leading-6 text-white">
                                        Koče Popovića 6
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        Area
                                    </p>
                                    <p className="mt-2 text-sm font-semibold leading-6 text-white">
                                        Savski Venac
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        Landmark
                                    </p>
                                    <p className="mt-2 text-sm font-semibold leading-6 text-white">
                                        Savski Trg
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(16,24,51,0.94)_0%,rgba(8,13,30,0.92)_100%)] shadow-[0_28px_80px_rgba(0,0,0,0.25)]">
                            <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    <Image
                                        src="/logo.png"
                                        alt="Hostel Downtown Inn"
                                        width={42}
                                        height={42}
                                        className="h-10 w-10 shrink-0 rounded-xl border border-white/10 object-cover"
                                        priority
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-white">Hostel Downtown Inn</p>
                                        <p className="mt-0.5 text-xs text-slate-400">Koče Popovića 6, Belgrade</p>
                                    </div>
                                </div>
                                <MapPinned size={18} className="shrink-0 text-[#39ff14]" />
                            </div>
                            <div className="h-[320px] bg-[#08101f] sm:aspect-[4/3] sm:h-auto sm:min-h-[320px]">
                                <iframe
                                    src={mapSrc}
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Hostel Downtown Inn location"
                                    className="h-full w-full border-0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {guestGuides.map((guide) => {
                            const Icon = iconMap[guide.icon];
                            const baseKey = guideKeysMap[guide.slug];
                            const translatedEyebrow = baseKey ? t(`${baseKey}Eyebrow`) : guide.eyebrow;
                            const translatedTitle = baseKey ? t(`${baseKey}Title`) : guide.title;
                            const translatedSummary = baseKey ? t(`${baseKey}Summary`) : guide.cardSummary;
                            const translatedPoints = baseKey ? (t.raw(`${baseKey}Points`) as string[]) : guide.cardPoints;

                            return (
                                <Link
                                    key={guide.slug}
                                    href={`/guides/${guide.slug}`}
                                    className="group flex min-h-full flex-col rounded-[1.4rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${iconColorMap[guide.icon]}`}>
                                            <Icon size={20} strokeWidth={2.1} />
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                            <Clock3 size={12} className={iconColorMap[guide.icon]} />
                                            {guide.readTime}
                                        </span>
                                    </div>

                                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        {translatedEyebrow}
                                    </p>
                                    <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
                                        {translatedTitle}
                                    </h2>
                                    <p className="mt-3 text-sm leading-7 text-slate-300">
                                        {translatedSummary}
                                    </p>

                                    <div className="mt-5 space-y-2.5">
                                        {translatedPoints.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                                            >
                                                <Sparkles size={14} className={`mt-0.5 shrink-0 ${iconColorMap[guide.icon]}`} />
                                                <span className="text-sm leading-6 text-slate-200">{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#39ff14]">
                                            {t('openGuide')}
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
