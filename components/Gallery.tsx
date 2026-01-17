'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ImageGallery from './ImageGallery';

const galleryImages = [
    { src: '/assets/images/terrace-view.jpg', alt: 'Rooftop Terrace View' },
    { src: '/assets/images/common-room.jpg', alt: 'Common Lounge Area' },
    { src: '/assets/images/kitchen.jpg', alt: 'Modern Guest Kitchen' },
    { src: '/assets/images/bathroom.jpg', alt: 'Clean Facilities' },
    { src: '/assets/images/about-2.jpg', alt: 'Hostel Atmosphere' },
    { src: '/assets/images/lounge-area.jpg', alt: 'Relaxation Zone' },
];

export default function Gallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <>
            <section
                id="gallery"
                className="relative py-32 px-6 md:px-8 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #050816 0%, #0c1428 50%, #050816 100%)'
                }}
            >
                {/* Background Glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 rounded-full opacity-20 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)',
                        filter: 'blur(100px)'
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10">
                            <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">
                                📸 Photo Gallery
                            </span>
                        </div>

                        <h2 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6">
                            Stunning <span className="text-gradient">Views</span>
                        </h2>
                        <p className="section-subtitle">
                            Experience breathtaking panoramas of Belgrade from our famous rooftop terrace
                        </p>
                    </motion.div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onClick={() => setSelectedImage(index)}
                                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                    }`}
                                style={{
                                    aspectRatio: index === 0 ? '4/3' : '1/1'
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(180deg, transparent 0%, rgba(5, 8, 22, 0.9) 100%)'
                                    }}
                                >
                                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-3xl mb-2 block">🔍</span>
                                        <span className="text-white font-medium text-sm">{image.alt}</span>
                                    </div>
                                </div>

                                {/* Border Glow */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: 'inset 0 0 0 2px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.2)'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fullscreen Gallery */}
            {selectedImage !== null && (
                <ImageGallery
                    images={galleryImages.map(img => img.src)}
                    initialIndex={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </>
    );
}
