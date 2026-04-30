import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { getGuestGuide, guestGuides } from '@/lib/guest-guides';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft,
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

type GuidePageProps = {
    params: Promise<{ locale: string; slug: string }>;
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

const sectionToneMap = {
    default: {
        card: 'border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.94)_0%,rgba(8,13,30,0.92)_100%)]',
        note: 'border-white/10 bg-white/[0.04] text-slate-300',
    },
    highlight: {
        card: 'border-[#39ff14]/14 bg-[linear-gradient(135deg,rgba(16,24,51,0.96)_0%,rgba(8,13,30,0.92)_100%)]',
        note: 'border-[#39ff14]/18 bg-[#39ff14]/10 text-slate-200',
    },
    warning: {
        card: 'border-[#ffff00]/14 bg-[linear-gradient(135deg,rgba(16,24,51,0.96)_0%,rgba(8,13,30,0.92)_100%)]',
        note: 'border-[#ffff00]/20 bg-[#ffff00]/10 text-slate-200',
    },
} as const;

const mapSrc =
    'https://maps.google.com/maps?ll=44.812727,20.454593&q=44.812727,20.454593+(Hostel%20Downtown%20Inn)&t=&z=18&ie=UTF8&iwloc=B&output=embed';

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuestGuide(slug);

    if (!guide) {
        return {
            title: 'Guest Guide | Hostel Downtown Inn',
        };
    }

    return {
        title: `${guide.title} | Hostel Downtown Inn`,
        description: guide.description,
        alternates: {
            canonical: `/guides/${guide.slug}`,
        },
        openGraph: {
            type: 'article',
            url: `/guides/${guide.slug}`,
            title: `${guide.title} | Hostel Downtown Inn`,
            description: guide.description,
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
            title: `${guide.title} | Hostel Downtown Inn`,
            description: guide.description,
            images: ['/logo.png'],
        },
    };
}

export default async function GuidePage({ params }: GuidePageProps) {
    const { locale, slug } = await params;
    const guide = getGuestGuide(slug);

    if (!guide) {
        notFound();
    }

    const GuideIcon = iconMap[guide.icon];
    const otherGuides = guestGuides.filter((item) => item.slug !== guide.slug);
    const isArrivalGuide = guide.slug === 'getting-here';
    const localizePath = (path: string) => {
        if (locale === 'en') {
            return path;
        }

        return path === '/' ? `/${locale}` : `/${locale}${path}`;
    };

    return (
        <main className="min-h-screen bg-primary">
            <Navigation />

            <section className="px-4 pb-20 pt-28 sm:px-6 md:px-8 md:pt-36">
                <div className="mx-auto max-w-7xl">
                    <header className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_380px] lg:items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                                <GuideIcon size={14} className={iconColorMap[guide.icon]} />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                                    {guide.eyebrow}
                                </span>
                            </div>

                            <h1 className="section-title mt-6 max-w-4xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                                {guide.title}
                            </h1>
                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                                {guide.description}
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Link href={localizePath('/')} className="btn-outline w-full justify-center gap-2 px-5 py-3 text-sm sm:w-auto">
                                    <ArrowLeft size={16} />
                                    Back to Homepage
                                </Link>
                                {guide.resources?.slice(0, 2).map((resource) => (
                                    <a
                                        key={resource.label}
                                        href={resource.href}
                                        target={resource.external ? '_blank' : undefined}
                                        rel={resource.external ? 'noreferrer' : undefined}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-[#39ff14]/20 hover:text-white sm:w-auto"
                                    >
                                        {resource.label}
                                        <ArrowUpRight size={15} className="text-[#39ff14]" />
                                    </a>
                                ))}
                                <Link href={localizePath('/book')} className="btn-primary w-full justify-center gap-2 px-5 py-3 text-sm sm:w-auto">
                                    Book Your Stay
                                </Link>
                            </div>
                        </div>

                        <aside className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${iconColorMap[guide.icon]}`}>
                                    <GuideIcon size={20} strokeWidth={2.1} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Guest Guide
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">{guide.label}</p>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-3">
                                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3">
                                    <span className="text-sm font-medium text-slate-300">Read time</span>
                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                                        <Clock3 size={14} className={iconColorMap[guide.icon]} />
                                        {guide.readTime}
                                    </span>
                                </div>
                                {guide.quickFacts.slice(0, 3).map((fact) => (
                                    <div
                                        key={fact.label}
                                        className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                                    >
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            {fact.label}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-white">{fact.value}</p>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {isArrivalGuide && (
                            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08101f] shadow-[0_24px_70px_rgba(0,0,0,0.22)] lg:col-span-2">
                                <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4">
                                    <div>
                                        <p className="text-sm font-bold text-white">Hostel Downtown Inn</p>
                                        <p className="mt-1 text-xs text-slate-400">Koče Popovića 6, Belgrade</p>
                                    </div>
                                    <Navigation2 size={18} className="shrink-0 text-[#39ff14]" />
                                </div>
                                <div className="h-[300px] sm:aspect-[16/9] sm:h-auto sm:min-h-[300px]">
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
                        )}
                    </header>

                    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="space-y-6">
                            {guide.sections.map((section) => {
                                const tone = sectionToneMap[section.tone ?? 'default'];

                                return (
                                    <section
                                        key={section.title}
                                        className={`overflow-hidden rounded-[1.8rem] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-6 ${tone.card}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Sparkles size={14} className={iconColorMap[guide.icon]} />
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                Guide Section
                                            </span>
                                        </div>

                                        <h2 className="mt-4 font-heading text-2xl font-bold text-white md:text-3xl">
                                            {section.title}
                                        </h2>

                                        {section.intro && (
                                            <p className="mt-3 text-sm leading-7 text-slate-300 md:text-[15px]">
                                                {section.intro}
                                            </p>
                                        )}

                                        {section.items && (
                                            <div className="mt-5 space-y-3">
                                                {section.items.map((item) => (
                                                    <div
                                                        key={item.title}
                                                        className="rounded-[1.35rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                                                    >
                                                        <h3 className="text-base font-bold text-white md:text-lg">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-2 text-sm leading-7 text-slate-300">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {section.bullets && (
                                            <ul className="mt-5 space-y-3">
                                                {section.bullets.map((bullet) => (
                                                    <li
                                                        key={bullet}
                                                        className="flex items-start gap-3 rounded-[1.2rem] border border-white/6 bg-white/[0.03] px-4 py-3.5"
                                                    >
                                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.65)]" />
                                                        <span className="text-sm leading-7 text-slate-300">
                                                            {bullet}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.note && (
                                            <div className={`mt-5 rounded-[1.3rem] border px-4 py-4 text-sm leading-7 ${tone.note}`}>
                                                {section.note}
                                            </div>
                                        )}
                                    </section>
                                );
                            })}

                            {guide.closingNote && (
                                <div className="rounded-[1.6rem] border border-[#ffff00]/18 bg-[#ffff00]/10 px-5 py-5 text-sm leading-7 text-slate-200">
                                    {guide.closingNote}
                                </div>
                            )}
                        </div>

                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Quick Facts
                                </p>
                                <div className="mt-4 space-y-3">
                                    {guide.quickFacts.map((fact) => (
                                        <div
                                            key={fact.label}
                                            className="rounded-[1.2rem] border border-white/6 bg-white/[0.03] px-4 py-3.5"
                                        >
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                {fact.label}
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-white">{fact.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.95)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Helpful Links
                                </p>

                                <div className="mt-4 grid gap-3">
                                    <Link
                                        href={localizePath('/book')}
                                        className="btn-primary justify-center gap-2 py-3 text-sm"
                                    >
                                        Book Your Stay
                                    </Link>
                                    <Link
                                        href={localizePath('/guides')}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-[#39ff14]/20 hover:text-white"
                                    >
                                        <BookOpenText size={15} className="text-[#39ff14]" />
                                        More Guest Guides
                                    </Link>

                                    {guide.resources?.map((resource) => (
                                        <a
                                            key={resource.label}
                                            href={resource.href}
                                            target={resource.external ? '_blank' : undefined}
                                            rel={resource.external ? 'noreferrer' : undefined}
                                            className="inline-flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-[#39ff14]/20 hover:text-white"
                                        >
                                            <span>{resource.label}</span>
                                            <ArrowUpRight size={15} className="text-[#39ff14]" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>

                    <section className="mt-12">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Keep Exploring
                                </p>
                                <h2 className="mt-2 font-heading text-3xl font-bold text-white">
                                    Other useful <span className="text-gradient">guest reads</span>
                                </h2>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {otherGuides.map((item) => {
                                const OtherIcon = iconMap[item.icon];

                                return (
                                    <Link
                                        key={item.slug}
                                        href={localizePath(`/guides/${item.slug}`)}
                                        className="group rounded-[1.7rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.94)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${iconColorMap[item.icon]}`}>
                                                <OtherIcon size={18} strokeWidth={2.1} />
                                            </div>
                                            <ArrowUpRight size={16} className="text-slate-500 transition-colors group-hover:text-[#39ff14]" />
                                        </div>

                                        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                            {item.eyebrow}
                                        </p>
                                        <h3 className="mt-2 font-heading text-2xl font-bold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-300">
                                            {item.cardSummary}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </section>

            <Footer />
        </main>
    );
}
