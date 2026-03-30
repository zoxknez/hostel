'use client';

import { Mail, MapPinned, Phone, Sparkles } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Rooms', href: '/#rooms' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Location', href: '/#location' },
    { label: 'Book Stay', href: '/book' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="relative overflow-hidden px-6 py-16 md:px-8 md:py-20"
            style={{
                background: 'linear-gradient(180deg, #050816 0%, #030510 100%)',
            }}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ffff00]/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(16,24,51,0.94)_0%,rgba(8,13,30,0.92)_100%)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:p-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.55fr)_minmax(260px,0.75fr)]">
                        <div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/8 px-4 py-2">
                                <Sparkles size={14} className="text-[#39ff14]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#39ff14]">
                                    Hostel Downtown Inn
                                </span>
                            </div>

                            <h3 className="mt-5 font-heading text-3xl font-bold text-white md:text-4xl">
                                A calmer city stay in <span className="text-gradient">Belgrade</span>
                            </h3>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-[15px]">
                                Premium comfort, a central Savamala location, bright rooms, and practical details that make the stay feel easy from arrival to checkout.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href="tel:+381652288200"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-[#39ff14]/20"
                                >
                                    <Phone size={15} className="text-[#39ff14]" />
                                    <span>+381 65 228 8200</span>
                                </a>
                                <a
                                    href="mailto:hostelinndowntown@gmail.com"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-[#39ff14]/20"
                                >
                                    <Mail size={15} className="text-[#39ff14]" />
                                    <span>Email Hostel</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Quick Links
                            </p>
                            <div className="mt-5 grid gap-2">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-[#39ff14]/20 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Contact & Address
                            </p>
                            <div className="mt-5 space-y-3">
                                <div className="rounded-[1.35rem] border border-white/6 bg-white/[0.03] px-4 py-4">
                                    <div className="flex items-start gap-3">
                                        <MapPinned size={18} className="mt-0.5 shrink-0 text-[#39ff14]" />
                                        <div>
                                            <p className="font-medium text-white">Koce Popovica 6</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-300">
                                                11000 Belgrade, Serbia
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[1.35rem] border border-white/6 bg-white/[0.03] px-4 py-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Booking Contact
                                    </p>
                                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                                        <p>hostelinndowntown@gmail.com</p>
                                        <p>+381 65 228 8200</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                        <p>© {currentYear} Hostel Downtown Inn Belgrade. All rights reserved.</p>
                        <div className="flex flex-wrap gap-4">
                            <span>Belgrade, Serbia</span>
                            <span>Central hostel stay</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
