'use client';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: string;
    trend: string;
    color: 'cyan' | 'purple' | 'emerald' | 'gold';
    highlight?: boolean;
}

const colorMap = {
    cyan: 'from-cyan-400/20 to-cyan-400/5 text-cyan-400 border-cyan-400/20',
    purple: 'from-purple-400/20 to-purple-400/5 text-purple-400 border-purple-400/20',
    emerald: 'from-emerald-400/20 to-emerald-400/5 text-emerald-400 border-emerald-400/20',
    gold: 'from-amber-400/20 to-amber-400/5 text-amber-400 border-amber-400/20',
};

export default function StatsCard({ label, value, icon, trend, color, highlight }: StatsCardProps) {
    return (
        <div className={`glass-card p-6 bg-gradient-to-br ${colorMap[color]} ${highlight ? 'ring-2 ring-purple-500 ring-offset-4 ring-offset-[#02040a]' : ''}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                    {icon}
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest bg-white/5 px-2 py-1 rounded">
                    {trend}
                </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
    );
}
