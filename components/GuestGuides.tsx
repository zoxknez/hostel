import { guestGuides } from '@/lib/guest-guides';
import { ArrowUpRight, Compass, MapPinned, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<(typeof guestGuides)[number]['icon'], LucideIcon> = {
    route: MapPinned,
    shield: ShieldCheck,
    map: Compass,
};

const accentMap: Record<(typeof guestGuides)[number]['icon'], string> = {
    route: 'from-[#39ff14]/16 via-[#39ff14]/8 to-transparent',
    shield: 'from-[#ffff00]/18 via-[#ffff00]/8 to-transparent',
    map: 'from-cyan-400/16 via-cyan-400/8 to-transparent',
};

const iconColorMap: Record<(typeof guestGuides)[number]['icon'], string> = {
    route: 'text-[#39ff14]',
    shield: 'text-[#ffff00]',
    map: 'text-cyan-300',
};

export default function GuestGuides() {
    return (
        <section id="guides" className="relative overflow-hidden px-6 py-16 md:px-8 md:py-24">
            <div className="absolute left-0 top-24 h-72 w-72 -translate-x-1/3 rounded-full bg-[#39ff14]/6 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 rounded-full bg-[#ffff00]/6 blur-[130px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                        <Sparkles size={14} className="text-[#39ff14]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                            Guest Guides
                        </span>
                    </div>

                    <h2 className="section-title mt-6 text-4xl leading-[0.95] md:text-5xl lg:text-6xl">
                        Practical <span className="text-gradient">Travel Notes</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                        We turned the most useful guest information into clean, easy-to-open guides so visitors can plan arrival, understand the stay, and make the most of Belgrade.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 xl:grid-cols-3">
                    {guestGuides.map((guide) => {
                        const Icon = iconMap[guide.icon];

                        return (
                            <article
                                key={guide.slug}
                                className="group relative overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.96)_0%,rgba(8,13,30,0.92)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1 md:p-6"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[guide.icon]} opacity-80 pointer-events-none`} />
                                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)] pointer-events-none" />

                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#08101f]/85 ${iconColorMap[guide.icon]}`}>
                                            <Icon size={20} strokeWidth={2.1} />
                                        </div>
                                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                            Opens in new tab
                                        </span>
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                            {guide.eyebrow}
                                        </p>
                                        <h3 className="mt-2 font-heading text-2xl font-bold text-white">
                                            {guide.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-300">
                                            {guide.cardSummary}
                                        </p>
                                    </div>

                                    <div className="mt-5 space-y-2.5">
                                        {guide.cardPoints.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                                            >
                                                <span className="h-2 w-2 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.65)]" />
                                                <span className="text-sm font-medium text-slate-200">{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-2">
                                        <Link
                                            href={`/guides/${guide.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/18 bg-[#39ff14]/10 px-4 py-2.5 text-sm font-semibold text-[#39ff14] transition-colors hover:border-[#39ff14]/30 hover:bg-[#39ff14]/16"
                                        >
                                            Open guide
                                            <ArrowUpRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
