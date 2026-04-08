'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '../i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';

export default function Navigation() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const router = useRouter();
    
    const navLinks = [
        { id: 'home', label: t('home') },
        { id: 'features', label: t('features') },
        { id: 'rooms', label: t('rooms') },
        { id: 'gallery', label: t('gallery') },
        { id: 'guides', label: t('guides') },
        { id: 'about', label: t('about') },
        { id: 'location', label: t('location') },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 72);
            setIsHidden(currentScrollY > lastScrollY && currentScrollY > 220);
            setLastScrollY(currentScrollY);

            for (const section of navLinks.map((link) => link.id)) {
                const element = document.getElementById(section);
                if (!element) {
                    continue;
                }

                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (sectionId: string) => {
        if (pathname !== '/') {
            router.push(`/#${sectionId}`);
            closeMobileMenu();
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 92;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }

        closeMobileMenu();
    };

    const handleLogoClick = () => {
        if (pathname === '/') {
            scrollToSection('home');
        } else {
            router.push('/');
            closeMobileMenu();
        }
    };

    return (
        <>
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isHidden ? -120 : 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-5 md:pt-4"
        >
            <div
                className={`mx-auto max-w-7xl rounded-full border px-4 py-2.5 transition-all duration-500 md:px-5 ${
                    isScrolled
                        ? 'border-white/10 bg-[rgba(5,8,22,0.75)] shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl'
                        : 'border-white/5 bg-[rgba(5,8,22,0.35)] backdrop-blur-lg'
                }`}
            >
                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={handleLogoClick}
                        className="flex items-center gap-2.5"
                    >
                        <Image
                            src="/logo.png"
                            alt="Hostel Downtown Inn"
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-xl border border-white/10 object-cover shadow-[0_0_15px_rgba(57,255,20,0.15)]"
                        />
                        <div className="hidden min-w-0 sm:block text-left">
                            <p className="font-heading text-base font-bold leading-none text-white lg:text-lg">
                                Hostel Downtown <span className="text-gradient">Inn</span>
                            </p>
                            <p className="mt-[3px] text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Belgrade Stay
                            </p>
                        </div>
                    </button>

                    <div className="hidden items-center gap-0.5 md:flex lg:gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() => scrollToSection(link.id)}
                                className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                                    activeSection === link.id
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="active-nav-link"
                                        className="absolute inset-0 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/10"
                                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="hidden items-center gap-2.5 lg:flex">
                        <LanguageSwitcher />
                        <a
                            href="tel:+381652288200"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white whitespace-nowrap"
                        >
                            <Phone size={14} className="text-[#39ff14]" />
                            <span>+381 65 228 8200</span>
                        </a>
                        <Link 
                            href="/book" 
                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#39ff14] to-[#22cc00] px-5 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#050816] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] whitespace-nowrap"
                        >
                            {t('bookNow')}
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white transition-colors hover:border-[#39ff14]/30 md:hidden"
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>
        </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-[rgba(5,8,22,0.72)] backdrop-blur-md md:hidden"
                            onClick={closeMobileMenu}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="fixed inset-x-4 top-[5.5rem] z-50 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(5,8,22,0.98)_0%,rgba(12,20,40,0.98)_100%)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:hidden"
                        >
                            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={14} className="text-[#39ff14]" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                        Explore Hostel Downtown Inn
                                    </span>
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            type="button"
                                            onClick={() => scrollToSection(link.id)}
                                            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                                                activeSection === link.id
                                                    ? 'bg-[#39ff14]/10 text-white'
                                                    : 'bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:text-white'
                                            }`}
                                        >
                                            <span>{link.label}</span>
                                            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                                Open
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <a
                                    href="tel:+381652288200"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-300"
                                >
                                    <Phone size={15} className="text-[#39ff14]" />
                                    <span>Call Hostel</span>
                                </a>
                                <Link
                                    href="/book"
                                    onClick={closeMobileMenu}
                                    className="btn-primary justify-center py-3 text-sm"
                                >
                                    {t('bookNow')}
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
