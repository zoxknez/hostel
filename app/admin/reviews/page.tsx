'use client';

import { useState } from 'react';

// Mock data for reviews
const initialReviews = [
    { id: 1, guest: 'Alice Johnson', rating: 5, date: '2024-01-15', content: 'Amazing stay! The location is perfect.', status: 'PUBLISHED' },
    { id: 2, guest: 'Mark Smith', rating: 4, date: '2024-01-12', content: 'Great hostel, but the wifi was a bit slow in the room.', status: 'PENDING' },
    { id: 3, guest: 'Elena D.', rating: 5, date: '2024-01-10', content: 'Best hostel in Belgrade! Staff is super friendly.', status: 'PUBLISHED' },
    { id: 4, guest: 'John Doe', rating: 2, date: '2024-01-05', content: 'Noisy neighbors.', status: 'HIDDEN' },
];

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState(initialReviews);

    const toggleStatus = (id: number) => {
        setReviews(reviews.map(r => {
            if (r.id === id) {
                return { ...r, status: r.status === 'PUBLISHED' ? 'HIDDEN' : 'PUBLISHED' };
            }
            return r;
        }));
    };

    const deleteReview = (id: number) => {
        if (confirm('Are you sure you want to delete this review?')) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <a href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm mb-2 block">
                        ← Back to Dashboard
                    </a>
                    <h1 className="text-4xl font-bold text-white mb-2">Guest Reviews</h1>
                    <p className="text-slate-500">Manage testimonials and feedback.</p>
                </div>
            </header>

            <div className="glass-card p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 text-slate-500 uppercase text-[10px] tracking-widest border-b border-white/5">
                            <th className="px-6 py-4 font-bold">Guest</th>
                            <th className="px-6 py-4 font-bold">Rating</th>
                            <th className="px-6 py-4 font-bold">Review</th>
                            <th className="px-6 py-4 font-bold">Date</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-bold text-white">{review.guest}</td>
                                <td className="px-6 py-4">
                                    <div className="flex text-[#ffff00]">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-300 text-sm max-w-xs truncate">{review.content}</td>
                                <td className="px-6 py-4 text-slate-400 text-xs">{review.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded inline-block border ${review.status === 'PUBLISHED'
                                        ? 'bg-[#39ff14]/10 text-[#39ff14] border-[#39ff14]/20'
                                        : review.status === 'HIDDEN'
                                            ? 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                            : 'bg-[#ffff00]/10 text-[#ffff00] border-[#ffff00]/20'
                                        }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => toggleStatus(review.id)}
                                        className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                                    >
                                        {review.status === 'PUBLISHED' ? 'Hide' : 'Publish'}
                                    </button>
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reviews.length === 0 && (
                    <div className="p-12 text-center text-slate-500">No reviews found.</div>
                )}
            </div>
        </div>
    );
}
