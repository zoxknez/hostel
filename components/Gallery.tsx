'use client';

import { galleryMedia } from '@/lib/media';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Camera, Expand, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ImageGallery from './ImageGallery';
import { useTranslations } from 'next-intl';

const galleryImages = galleryMedia;

export default function Gallery() {
    const t = useTranslations('Gallery');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <>
            <section
                id="gallery"
                className="relative overflow-hidden px-6 py-16 md:px-8 md:py-24 lg:py-28"
                style={{
                    background: 'linear-gradient(180deg, #050816 0%, #0c1428 52%, #050816 100%)',
                }}
            >
                <div className="absolute top-24 left-0 h-72 w-72 rounded-full bg-[#39ff14]/6 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#ffff00]/5 blur-[140px] pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-7xl">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-5xl text-center"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10 px-4 py-2">
                            <Camera size={14} className="text-[#39ff14]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#39ff14]">
                                {t('photoGallery')}
                            </span>
                        </div>

                        <h2 className="section-title mt-6 text-4xl leading-[0.95] md:text-5xl lg:text-6xl">
                            {t('insideThe')} <span className="text-gradient">{t('hostel')}</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                            {t('subtitle')}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {[t('pill1'), t('pill2'), t('pill3')].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {galleryImages.map((image, index) => (
                            <motion.button
                                key={image.src}
                                type="button"
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.55, delay: index * 0.07 }}
                                onClick={() => setSelectedImage(index)}
                                className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#101833]/90 text-left"
                            >
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${image.accent} opacity-70 pointer-events-none`} />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.04)_0%,rgba(5,8,22,0.18)_48%,rgba(5,8,22,0.82)_100%)]" />
                                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)]" />

                                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08101f]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                                        <Sparkles size={12} className="text-[#39ff14]" />
                                        {image.label}
                                    </div>

                                    <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#08101f]/78 text-slate-100 transition-all duration-300 group-hover:border-[#39ff14]/30 group-hover:text-[#39ff14]">
                                        <Expand size={17} />
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <div className="rounded-[1.35rem] border border-white/10 bg-[#08101f]/68 px-4 py-3.5 backdrop-blur-md">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                {t('clickExpand')}
                                            </p>
                                            <h3 className="mt-2 font-heading text-2xl font-bold text-white">
                                                {image.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedImage !== null && (
                    <ImageGallery
                        images={galleryImages.map((image) => ({
                            src: image.src,
                            alt: image.alt,
                            title: image.title,
                            label: image.label,
                        }))}
                        initialIndex={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
