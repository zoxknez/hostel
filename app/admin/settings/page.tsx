'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SettingsFormData {
    hostelName: string;
    hostelEmail: string;
    hostelPhone: string;
    checkInTime: string;
    checkOutTime: string;
    cityTax: number;
    currency: string;
    minAdvanceBooking: number;
    maxAdvanceBooking: number;
    cancellationPolicy: string;
}

const defaultSettings: SettingsFormData = {
    hostelName: 'Hostel Downtown Inn',
    hostelEmail: 'hostelinndowntown@gmail.com',
    hostelPhone: '+381652288200',
    checkInTime: '14:00',
    checkOutTime: '10:00',
    cityTax: 1.35,
    currency: 'EUR',
    minAdvanceBooking: 0,
    maxAdvanceBooking: 365,
    cancellationPolicy: '',
};

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SettingsFormData>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        async function loadSettings() {
            try {
                const res = await fetch('/api/settings');
                if (!res.ok) {
                    throw new Error('Failed to fetch settings');
                }

                const data = await res.json();
                if (active) {
                    setSettings({
                        hostelName: data.hostelName,
                        hostelEmail: data.hostelEmail,
                        hostelPhone: data.hostelPhone,
                        checkInTime: data.checkInTime,
                        checkOutTime: data.checkOutTime,
                        cityTax: data.cityTax,
                        currency: data.currency,
                        minAdvanceBooking: data.minAdvanceBooking,
                        maxAdvanceBooking: data.maxAdvanceBooking,
                        cancellationPolicy: data.cancellationPolicy ?? '',
                    });
                }
            } catch (err) {
                console.error('Failed to load settings:', err);
                if (active) {
                    setMessage('Settings could not be loaded. Showing defaults.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadSettings();

        return () => {
            active = false;
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (!res.ok) {
                throw new Error('Failed to save settings');
            }

            setMessage('Settings saved successfully.');
        } catch (err) {
            console.error('Failed to save settings:', err);
            setMessage('Saving failed. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm mb-2 block">
                    ← Back to Dashboard
                </Link>
                <h1 className="text-4xl font-bold text-white mb-2">Global Settings</h1>
                <p className="text-slate-500">Configure the live hostel settings stored in the database.</p>
            </header>

            {message && (
                <div className="glass-card py-4">
                    <p className="text-sm text-slate-300">{message}</p>
                </div>
            )}

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6">General Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Hostel Name</label>
                            <input
                                type="text"
                                name="hostelName"
                                value={settings.hostelName}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Contact Email</label>
                            <input
                                type="email"
                                name="hostelEmail"
                                value={settings.hostelEmail}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="hostelPhone"
                                value={settings.hostelPhone}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Check-In Time</label>
                                <input
                                    type="time"
                                    name="checkInTime"
                                    value={settings.checkInTime}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Check-Out Time</label>
                                <input
                                    type="time"
                                    name="checkOutTime"
                                    value={settings.checkOutTime}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6">Booking Rules</h3>

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
                                    disabled={loading}
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
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Min Advance (days)</label>
                                <input
                                    type="number"
                                    name="minAdvanceBooking"
                                    value={settings.minAdvanceBooking}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Max Advance (days)</label>
                                <input
                                    type="number"
                                    name="maxAdvanceBooking"
                                    value={settings.maxAdvanceBooking}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Cancellation Policy</label>
                            <textarea
                                name="cancellationPolicy"
                                value={settings.cancellationPolicy}
                                onChange={handleChange}
                                disabled={loading}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] outline-none transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <button
                        type="submit"
                        disabled={loading || saving}
                        className="btn-primary w-full py-4 text-lg font-bold shadow-[0_0_30px_rgba(57,255,20,0.3)] disabled:opacity-60"
                    >
                        {saving ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
