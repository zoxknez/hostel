'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    initialIndex?: number;
    onClose?: () => void;
    roomTitle?: string;
}

export default function ImageGallery({ images, initialIndex = 0, onClose, roomTitle }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const showNext = () => {
        setCurrentIndex((current) => (current + 1) % images.length);
    };

    const showPrevious = () => {
        setCurrentIndex((current) => (current - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setCurrentIndex((current) => (current + 1) % images.length);
            }
            if (e.key === 'ArrowLeft') {
                setCurrentIndex((current) => (current - 1 + images.length) % images.length);
            }
            if (e.key === 'Escape' && onClose) onClose();
        };

        window.addEventListener('keydown', handleKeyPress);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            document.body.style.overflow = '';
        };
    }, [images.length, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors text-3xl"
            >
                ×
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-24" onClick={(e) => e.stopPropagation()}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="relative w-full h-full max-w-7xl"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={roomTitle || `Gallery image ${currentIndex + 1}`}
                        fill
                        className="object-contain shadow-2xl"
                        priority
                    />
                </motion.div>

                <button
                    onClick={showPrevious}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/10 transition-all hover:scale-110"
                >
                    ←
                </button>
                <button
                    onClick={showNext}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/10 transition-all hover:scale-110"
                >
                    →
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                    {roomTitle && <p className="text-cyan-400 font-bold mb-2">{roomTitle}</p>}
                    <p className="text-white/30 text-sm font-mono tracking-widest uppercase">
                        {currentIndex + 1} / {images.length}
                    </p>
                </div>

                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto max-w-[80vw] pb-4 no-scrollbar">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${idx === currentIndex ? 'ring-2 ring-cyan-400 scale-110 opacity-100' : 'opacity-40 hover:opacity-100'
                                }`}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
