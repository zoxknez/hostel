'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 100);

            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);

            const sections = ['home', 'features', 'rooms', 'gallery', 'location'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'rooms', label: 'Rooms' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'about', label: 'About Us' },
        { id: 'location', label: 'Location' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: isHidden ? -100 : 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'py-3'
                    : 'py-5'
                    }`}
                style={{
                    background: isScrolled
                        ? 'rgba(5, 8, 22, 0.85)'
                        : 'rgba(5, 8, 22, 0.3)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderBottom: isScrolled
                        ? '1px solid rgba(57, 255, 20, 0.1)'
                        : '1px solid transparent',
                    boxShadow: isScrolled
                        ? '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(57, 255, 20, 0.05)'
                        : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <button
                            onClick={() => scrollToSection('home')}
                            className="flex items-center gap-2 group"
                        >
                            <img
                                src="/logo.png"
                                alt="Downtown Inn"
                                className="w-10 h-10 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] object-cover transition-all duration-300 group-hover:scale-110"
                            />
                            <span className="font-heading text-xl font-bold hidden sm:block">
                                <span className="text-white">Downtown</span>
                                <span className="text-gradient"> Inn</span>
                            </span>
                        </button>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex gap-1 items-center">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === link.id
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {activeSection === link.id && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: 'rgba(57, 255, 20, 0.1)',
                                                    border: '1px solid rgba(57, 255, 20, 0.3)'
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Contact Info */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="tel:+381652288200"
                                className="flex items-center gap-2 text-slate-400 text-sm hover:text-[#39ff14] transition-colors"
                            >
                                <span className="text-lg">📞</span>
                                <span>+381 65 228 8200</span>
                            </a>
                            <a
                                href="/book"
                                className="btn-primary px-6 py-2.5 text-sm"
                            >
                                Book Now
                            </a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl transition-colors"
                            style={{
                                background: isMobileMenuOpen ? 'rgba(57, 255, 20, 0.1)' : 'transparent'
                            }}
                        >
                            <motion.span
                                animate={{
                                    rotate: isMobileMenuOpen ? 45 : 0,
                                    y: isMobileMenuOpen ? 6 : 0
                                }}
                                className="w-5 h-0.5 bg-white rounded-full"
                            />
                            <motion.span
                                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                className="w-5 h-0.5 bg-white rounded-full"
                            />
                            <motion.span
                                animate={{
                                    rotate: isMobileMenuOpen ? -45 : 0,
                                    y: isMobileMenuOpen ? -6 : 0
                                }}
                                className="w-5 h-0.5 bg-white rounded-full"
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-80 h-full z-50 md:hidden"
                            style={{
                                background: 'linear-gradient(180deg, rgba(5, 8, 22, 0.98) 0%, rgba(12, 20, 40, 0.98) 100%)',
                                backdropFilter: 'blur(40px)',
                                borderLeft: '1px solid rgba(57, 255, 20, 0.1)'
                            }}
                        >
                            <div className="flex flex-col h-full p-8 pt-24">
                                <nav className="flex flex-col gap-2">
                                    {navLinks.map((link, index) => (
                                        <motion.button
                                            key={link.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => scrollToSection(link.id)}
                                            className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-all ${activeSection === link.id
                                                ? 'text-white bg-[#39ff14]/10'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {link.label}
                                        </motion.button>
                                    ))}
                                </nav>

                                <div className="mt-auto pt-8 border-t border-white/10">
                                    <a
                                        href="tel:+381652288200"
                                        className="flex items-center gap-3 text-slate-400 mb-4 hover:text-[#39ff14] transition-colors"
                                    >
                                        <span className="text-xl">📞</span>
                                        <span>+381 65 228 8200</span>
                                    </a>
                                    <a
                                        href="/book"
                                        className="btn-primary w-full justify-center py-3"
                                    >
                                        Book Now
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
