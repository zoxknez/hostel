'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid admin password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6">
            <div className="glass-card w-full max-w-md p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#39ff14] to-[#ffff00] rounded-2xl flex items-center justify-center text-primary font-bold text-2xl mx-auto mb-6 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                        DI
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-slate-500">Enter your credentials to continue.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Admin Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[#39ff14] outline-none transition-all text-center tracking-widest relative z-20"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button type="submit" className="btn-primary w-full py-4 text-lg">
                        Authorize Access
                    </button>
                </form>
            </div>
        </div>
    );
}
