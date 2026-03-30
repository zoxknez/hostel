'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Expand, ImageIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryImageItem {
    src: string;
    alt: string;
    title: string;
    label?: string;
}

interface ImageGalleryProps {
    images: GalleryImageItem[];
    initialIndex?: number;
    onClose?: () => void;
}

export default function ImageGallery({ images, initialIndex = 0, onClose }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setCurrentIndex((current) => (current + 1) % images.length);
            }

            if (event.key === 'ArrowLeft') {
                setCurrentIndex((current) => (current - 1 + images.length) % images.length);
            }

            if (event.key === 'Escape' && onClose) {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [images.length, onClose]);

    const currentImage = images[currentIndex];

    const showNext = () => {
        setCurrentIndex((current) => (current + 1) % images.length);
    };

    const showPrevious = () => {
        setCurrentIndex((current) => (current - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(5,8,22,0.9)] px-4 py-5 backdrop-blur-xl md:px-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Photo gallery"
                className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.97)_0%,rgba(9,14,34,0.95)_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:max-h-[calc(100vh-2.5rem)]"
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/35 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#39ff14]/6 blur-[120px] pointer-events-none" />

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close gallery"
                    className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#07101f]/85 text-slate-200 transition-all hover:scale-105 hover:border-[#39ff14]/30 hover:text-white"
                >
                    <X size={18} />
                </button>

                <div className="flex flex-col p-4 md:p-6 lg:p-7">
                    <div className="flex flex-col gap-4 border-b border-white/8 pb-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-3.5 py-2">
                                <ImageIcon size={14} className="text-[#39ff14]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                    Photo Viewer
                                </span>
                            </div>

                            <h3 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
                                <span className="text-gradient">{currentImage.title}</span>
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-[15px]">
                                {currentImage.alt}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {currentImage.label && (
                                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    {currentImage.label}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#091122]/80 px-4 py-2 text-[11px] font-semibold text-white">
                                <Expand size={14} className="text-[#39ff14]" />
                                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
                        <button
                            type="button"
                            onClick={showPrevious}
                            aria-label="Previous image"
                            className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#091122]/80 text-white transition-all hover:border-[#39ff14]/30 hover:text-[#39ff14] lg:flex"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#08101f]">
                            <div className="relative aspect-[16/10] max-h-[68vh] min-h-[260px]">
                                <Image
                                    key={currentImage.src}
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={showNext}
                            aria-label="Next image"
                            className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#091122]/80 text-white transition-all hover:border-[#39ff14]/30 hover:text-[#39ff14] lg:flex"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-3 lg:hidden">
                        <button
                            type="button"
                            onClick={showPrevious}
                            aria-label="Previous image"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#091122]/80 text-white transition-all hover:border-[#39ff14]/30 hover:text-[#39ff14]"
                        >
                            <ArrowLeft size={17} />
                        </button>
                        <button
                            type="button"
                            onClick={showNext}
                            aria-label="Next image"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#091122]/80 text-white transition-all hover:border-[#39ff14]/30 hover:text-[#39ff14]"
                        >
                            <ArrowRight size={17} />
                        </button>
                    </div>

                    <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
                        {images.map((image, index) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Show image ${index + 1}`}
                                className={`group relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border transition-all md:h-20 md:w-28 ${
                                    index === currentIndex
                                        ? 'border-[#39ff14] shadow-[0_0_0_1px_rgba(57,255,20,0.4)]'
                                        : 'border-white/10 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <Image
                                    src={image.src}
                                    alt=""
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
