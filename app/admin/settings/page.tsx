'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'Hostel Downtown Inn',
        email: 'info@hosteldowntown.com',
        phone: '+381 65 228 8200',
        address: 'Balkanska 3, Belgrade',
        cityTax: 1.35,
        currency: 'EUR',
        maintenanceMode: false,
        bookingsEnabled: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would save to API/DB
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-8">
            <header>
                <a href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm mb-2 block">
                    ← Back to Dashboard
                </a>
                <h1 className="text-4xl font-bold text-white mb-2">Global Settings</h1>
                <p className="text-slate-500">Configure core application parameters.</p>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Info */}
                <div className="glass-card p-8 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6">General Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Contact Email</label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={settings.phone}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Booking Configuration */}
                <div className="glass-card p-8 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6">Booking Configuration</h3>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">City Tax (€)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="cityTax"
                                    value={settings.cityTax}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Currency</label>
                                <input
                                    type="text"
                                    name="currency"
                                    value={settings.currency}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                <span className="text-white font-medium">Accepting New Bookings</span>
                                <input
                                    type="checkbox"
                                    name="bookingsEnabled"
                                    checked={settings.bookingsEnabled}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-[#39ff14]"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                <span className="text-white font-medium">Maintenance Mode</span>
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-[#39ff14]"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <button
                        type="submit"
                        className="btn-primary w-full py-4 text-lg font-bold shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
