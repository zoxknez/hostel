'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Rooms', href: '#rooms' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Location', href: '#location' },
    ];

    const socialLinks = [
        { icon: '📘', label: 'Facebook', href: '#' },
        { icon: '📸', label: 'Instagram', href: '#' },
        { icon: '🐦', label: 'Twitter', href: '#' },
    ];

    return (
        <footer
            className="relative py-20 px-6 md:px-8 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #050816 0%, #030510 100%)'
            }}
        >
            {/* Top Border Gradient */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0, 245, 255, 0.3) 50%, transparent 100%)'
                }}
            />

            {/* Background Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #915eff 0%, transparent 70%)',
                    filter: 'blur(100px)'
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #00f5ff 0%, #915eff 100%)',
                                    boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)'
                                }}
                            >
                                DI
                            </div>
                            <span className="font-heading text-2xl font-bold">
                                <span className="text-white">Downtown</span>
                                <span className="text-gradient"> Inn</span>
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed max-w-md mb-6">
                            Experience Belgrade like never before. Premium comfort meets unbeatable location
                            with stunning panoramic views of Kalemegdan Fortress and the confluence of Sava and Danube rivers.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 transition-colors" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-lg font-bold mb-6 text-white">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="text-lg">📍</span>
                                <span>Karađorđeva 69<br />11000 Belgrade, Serbia</span>
                            </li>
                            <li>
                                <a
                                    href="tel:+381652288200"
                                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                                >
                                    <span className="text-lg">📞</span>
                                    +381 65 228 8200
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hostelinndowntown@gmail.com"
                                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                                >
                                    <span className="text-lg">✉️</span>
                                    Email Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm"
                    style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                    <p>© {currentYear} Hostel Downtown Inn Belgrade. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
