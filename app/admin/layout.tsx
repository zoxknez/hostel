'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Calendar, BedDouble, Settings, ClipboardList } from 'lucide-react';

const sidebarItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Bookings', href: '/admin/bookings', icon: ClipboardList },
    { label: 'Calendar', href: '/admin/calendar', icon: Calendar },
    { label: 'Rooms', href: '/admin/rooms', icon: BedDouble },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/login', { method: 'DELETE' });
            if (res.ok) {
                router.push('/admin/login');
            }
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setLoading(false);
        }
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center gap-3 mb-12">
                <img
                    src="/logo.png"
                    alt="Downtown Inn"
                    className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(57,255,20,0.3)] object-cover"
                />
                <span className="font-heading font-bold text-white text-lg tracking-wide">Admin Panel</span>
            </div>

            <nav className="space-y-2 flex-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${isActive
                                ? 'text-[#39ff14] bg-[#39ff14]/10 border border-[#39ff14]/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-[#39ff14]' : 'text-slate-400 group-hover:text-white transition-colors'} />
                            <span className="font-medium">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-8 rounded-r-full bg-[#39ff14]"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all w-full"
                >
                    <LogOut size={20} />
                    <span className="font-medium">{loading ? 'Signing Out...' : 'Sign Out'}</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#02040a] flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="Downtown Inn"
                        className="w-8 h-8 rounded-lg shadow-[0_0_10px_rgba(57,255,20,0.3)] object-cover"
                    />
                    <span className="font-bold text-white">Admin</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed inset-y-0 left-0 w-64 bg-[#050816] border-r border-white/10 z-50 md:hidden"
                        >
                            <div className="absolute top-4 right-4">
                                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 border-r border-white/5 bg-[#050816] fixed inset-y-0 left-0">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full md:pl-64">
                <div className="p-4 md:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
