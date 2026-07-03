import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '18:00',
    area: 'Garden Terrace',
    requests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      
      // Persist booking to local storage for realistic system behavior
      const bookings = JSON.parse(localStorage.getItem('padanda_bookings') || '[]');
      const newBooking = {
        ...formData,
        id: 'res-' + Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      };
      bookings.push(newBooking);
      localStorage.setItem('padanda_bookings', JSON.stringify(bookings));
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '2',
      date: '',
      time: '18:00',
      area: 'Garden Terrace',
      requests: '',
    });
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="reservation-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="reservation-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          id="reservation-modal-container"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#FAFAF8] dark:bg-[#123024] p-8 shadow-2xl border border-secondary/20 dark:border-primary/30 z-10"
        >
          {/* Close Button */}
          <button
            id="close-reservation-modal"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-dark-text/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div id="reservation-form-view">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C79A32]">Luxury Dining</span>
                <h3 className="font-serif-display text-2xl font-bold text-primary dark:text-accent mt-1">
                  Reserve Your Table
                </h3>
                <p className="text-sm text-dark-text/70 dark:text-white/70 mt-1">
                  Experience authentic Zimbabwean hospitality at Padanda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary dark:text-accent flex items-center gap-1">
                      <Calendar size={12} /> Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary dark:text-accent flex items-center gap-1">
                      <Clock size={12} /> Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    >
                      <option value="07:00">07:00 AM (Breakfast)</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="11:30">11:30 AM (Lunch)</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM (Dinner)</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Guests */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary dark:text-accent flex items-center gap-1">
                      <Users size={12} /> Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8 Guests</option>
                      <option value="10">10+ Guests</option>
                    </select>
                  </div>

                  {/* Dining Seating Area */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary dark:text-accent flex items-center gap-1">
                      <MapPin size={12} /> Seating Area
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    >
                      <option value="Garden Terrace">Garden Terrace (Lush & Calm)</option>
                      <option value="Main Indoor Hall">Main Indoor Hall (African Art)</option>
                      <option value="Private Dining Nook">Private Dining Nook (Quiet)</option>
                      <option value="Bar-side Lounge">Bar-side Lounge (Social)</option>
                    </select>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary dark:text-accent">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ruvarashe Moyo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary dark:text-accent">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +263 783 157174"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary dark:text-accent">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ruva@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary dark:text-accent">Special Notes / Dietary Requests</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Celebrating anniversary, gluten-free, baby chair needed..."
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-[#16382b] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Sparkles size={16} className="text-secondary" />
                      <span>Confirm Reservation</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          ) : (
            <motion.div
              id="reservation-success-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="mx-auto h-16 w-16 bg-[#1F4D3B]/10 rounded-full flex items-center justify-center text-primary dark:bg-white/10 dark:text-[#C79A32] mb-4">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-primary dark:text-accent mb-2">
                Table Reserved!
              </h3>
              <p className="text-sm text-dark-text/70 dark:text-white/70 max-w-sm mx-auto mb-6">
                Thank you, <span className="font-bold">{formData.name}</span>! Your table for <span className="font-bold">{formData.guests} guests</span> on <span className="font-bold">{formData.date}</span> at <span className="font-bold">{formData.time}</span> has been confirmed.
              </p>

              <div className="bg-primary/5 dark:bg-forest-dark rounded-xl p-4 text-left border border-primary/10 max-w-xs mx-auto mb-6 space-y-2 text-xs text-dark-text/80 dark:text-white/80">
                <div className="flex justify-between">
                  <span className="font-medium text-dark-text/50 dark:text-white/50">Location:</span>
                  <span className="font-semibold text-primary dark:text-accent">70 Cork Road, Avondale</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-dark-text/50 dark:text-white/50">Dining Area:</span>
                  <span className="font-semibold text-[#C79A32]">{formData.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-dark-text/50 dark:text-white/50">Phone Contact:</span>
                  <span className="font-semibold">{formData.phone}</span>
                </div>
              </div>

              <button
                id="done-reservation"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow hover:bg-[#16382b] transition-colors cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
