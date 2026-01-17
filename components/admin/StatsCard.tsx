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
    cyan: 'from-[#39ff14]/20 to-[#39ff14]/5 text-[#39ff14] border-[#39ff14]/20',
    purple: 'from-[#ffff00]/20 to-[#ffff00]/5 text-[#ffff00] border-[#ffff00]/20',
    emerald: 'from-[#00754a]/40 to-[#00754a]/10 text-[#39ff14] border-[#00754a]/40',
    gold: 'from-[#ffff00]/20 to-[#ffff00]/5 text-[#ffff00] border-[#ffff00]/20',
};

export default function StatsCard({ label, value, icon, trend, color, highlight }: StatsCardProps) {
    return (
        <div className={`glass-card p-6 bg-gradient-to-br ${colorMap[color]} ${highlight ? 'ring-2 ring-[#ffff00] ring-offset-4 ring-offset-[#02040a]' : ''}`}>
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
