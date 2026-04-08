'use client';

import { motion, useInView } from 'framer-motion';
import { MessageSquareQuote, ShieldCheck, Star } from 'lucide-react';
import Script from 'next/script';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
    const t = useTranslations('Testimonials');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const trustPoints = [
        t('trustPoint1'),
        t('trustPoint2'),
        t('trustPoint3'),
    ];

    const livePoints = [
        t('livePoint1'),
        t('livePoint2'),
        t('livePoint3'),
    ];

    return (
        <section className="relative overflow-hidden px-6 py-16 md:px-8 md:py-24 lg:py-28">
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

            <div className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/6 blur-[140px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 36 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-5xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                        <MessageSquareQuote size={14} className="text-[#39ff14]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                            {t('guestReviews')}
                        </span>
                    </div>

                    <h2 className="section-title mt-6 text-4xl leading-[0.95] md:text-5xl lg:text-6xl">
                        {t('whatGuests')} <span className="text-gradient">{t('say')}</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                        {t('subtitle')}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        {trustPoints.map((item) => (
                            <span
                                key={item}
                                className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.12 }}
                    className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.96)_0%,rgba(9,15,34,0.94)_100%)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:p-7"
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/35 to-transparent pointer-events-none" />

                    <div className="grid gap-6 lg:grid-cols-[minmax(250px,0.38fr)_minmax(0,1fr)]">
                        <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-5 md:p-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffff00]/15 bg-[#ffff00]/8 px-3.5 py-2">
                                <Star size={14} className="fill-[#ffff00] text-[#ffff00]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffff00]">
                                    {t('trustedSocialProof')}
                                </span>
                            </div>

                            <h3 className="mt-5 font-heading text-2xl font-bold text-white">
                                {t('liveReviewFeed')}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                {t('liveReviewDesc')}
                            </p>

                            <div className="mt-6 space-y-3">
                                {livePoints.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.035] px-4 py-3.5"
                                    >
                                        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#39ff14]" />
                                        <span className="text-sm leading-6 text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-white p-1.5 shadow-[0_0_60px_rgba(255,255,255,0.08)]">
                            <div className="min-h-[480px] rounded-[1.45rem] bg-white px-4 pb-6 pt-8">
                                <div className="elfsight-app-a66df53c-de61-4bb3-806d-b1222db66f2e" data-elfsight-app-lazy />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex justify-center"
                >
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.7)]" />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-300">
                            {t('liveSync')} <span className="text-[#39ff14]">TripAdvisor</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
