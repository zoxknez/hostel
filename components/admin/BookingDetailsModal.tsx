'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface BookingDetailsModalProps {
    booking: any;
    onClose: () => void;
    onUpdate: (updatedBooking: any) => void;
}

export default function BookingDetailsModal({ booking, onClose, onUpdate }: BookingDetailsModalProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(booking.status);
    const [notes, setNotes] = useState(booking.internalNotes || '');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/bookings/${booking.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, internalNotes: notes })
            });
            const data = await res.json();
            onUpdate(data);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to permanently delete this booking? This action cannot be undone.')) return;

        try {
            setLoading(true);
            const res = await fetch(`/api/bookings/${booking.id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // Signal to parent to refresh
                onUpdate(booking);
                onClose();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const modalContent = (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#39ff14]/20 shadow-[0_0_50px_rgba(57,255,20,0.2)]"
                >
                    <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                        <div>
                            <p className="text-[#39ff14] font-mono text-xs mb-1 uppercase tracking-widest">{booking.bookingNumber}</p>
                            <h2 className="text-3xl font-bold text-white">Booking Details</h2>
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-2xl">✕</button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Guest Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="text-[#39ff14] text-lg">👤</span> Guest Information
                                </h3>
                                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Name:</span> {booking.guestName}</p>
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Email:</span> {booking.guestEmail}</p>
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Phone:</span> {booking.guestPhone}</p>
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Country:</span> {booking.guestCountry || 'N/A'}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="text-[#39ff14] text-lg">🏨</span> Stay & Room
                                </h3>
                                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Room:</span> {booking.room.name}</p>
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Guests:</span> {booking.numberOfGuests}</p>
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Check-In:</span> {format(new Date(booking.checkIn), 'PPP')}</p>
                                    <p className="text-white"><span className="text-slate-500 text-xs uppercase mr-2">Check-Out:</span> {format(new Date(booking.checkOut), 'PPP')}</p>
                                    <p className="text-white font-bold text-[#39ff14] pt-2 border-t border-white/5">
                                        <span className="text-slate-500 text-xs uppercase mr-2">Total Paid/Due:</span> €{booking.totalPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Management */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white font-bold mb-4">Update Status</h3>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#39ff14] transition-all"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-4">Internal Notes</h3>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={5}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#39ff14] transition-all text-sm"
                                    placeholder="Add notes about this booking..."
                                />
                            </div>

                            {booking.specialRequests && (
                                <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10">
                                    <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest mb-2">Guest Special Requests</p>
                                    <p className="text-slate-300 text-sm italic">"{booking.specialRequests}"</p>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    disabled={loading}
                                    onClick={handleDelete}
                                    className="px-6 py-4 rounded-full border border-red-500/30 text-red-400 font-bold uppercase tracking-widest text-sm hover:bg-red-500/10 transition-colors"
                                >
                                    Delete
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={handleUpdate}
                                    className="btn-primary flex-1 py-4 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                                >
                                    {loading ? 'Saving...' : 'Save Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(modalContent, document.body);
}
