import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, MessageSquare, Compass, Send, CheckCircle, Sparkles } from 'lucide-react';

export default function LocationContact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Allow easy editing of hours as requested
  const openingHours = {
    monday: '07:00 AM - 08:00 PM',
    tuesday: '07:00 AM - 08:00 PM',
    wednesday: '07:00 AM - 08:00 PM',
    thursday: '07:00 AM - 08:00 PM',
    friday: '07:00 AM - 08:00 PM',
    saturday: '07:00 AM - 08:00 PM',
    sunday: '07:00 AM - 08:00 PM',
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Save feedback in localStorage
      const feedbacks = JSON.parse(localStorage.getItem('padanda_feedback') || '[]');
      feedbacks.push({
        ...formState,
        id: 'msg-' + Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      });
      localStorage.setItem('padanda_feedback', JSON.stringify(feedbacks));
    }, 1200);
  };

  const handleResetForm = () => {
    setFormState({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  const mapIframeUrl = "https://maps.google.com/maps?q=70%20Cork%20Road,%20Avondale,%20Harare,%20Zimbabwe&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-forest-dark border-b border-secondary/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C79A32]">Find Us</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
            Location & Contacts
          </h2>
          <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans">
            Centrally located in the heart of Avondale, Harare. Visit us today or send an instant message.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Opening hours, contact details, embedded map */}
          <div className="space-y-8 text-left">
            
            {/* Opening hours & contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Opening Hours Card */}
              <div className="rounded-2xl bg-[#FAFAF8] dark:bg-forest-dark border border-gray-100 dark:border-primary/20 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#C79A32]">
                  <Clock size={18} />
                  <h3 className="font-serif-display text-base font-bold text-primary dark:text-accent uppercase tracking-wider">
                    Opening Hours
                  </h3>
                </div>
                
                <div className="space-y-1.5 text-xs text-dark-text/80 dark:text-white/80 font-sans">
                  <div className="flex justify-between font-bold border-b border-gray-200/50 dark:border-primary/10 pb-1.5">
                    <span>Monday - Sunday</span>
                    <span>07:00 AM - 08:00 PM</span>
                  </div>
                  <p className="text-[10px] text-[#C79A32] italic font-medium mt-1">
                    * Open daily, including public holidays.
                  </p>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="rounded-2xl bg-[#FAFAF8] dark:bg-forest-dark border border-gray-100 dark:border-primary/20 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary dark:text-[#C79A32]">
                  <Phone size={18} />
                  <h3 className="font-serif-display text-base font-bold text-primary dark:text-accent uppercase tracking-wider">
                    Contact Hotline
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-dark-text dark:text-white font-sans">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-dark-text/50 dark:text-white/50 uppercase font-bold tracking-wider">Primary Phone:</span>
                    <a href="tel:+263783157174" className="font-bold hover:text-[#C79A32] transition-colors">
                      +263 783 157174
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-dark-text/50 dark:text-white/50 uppercase font-bold tracking-wider">Alternative:</span>
                    <a href="tel:+263717818658" className="font-bold hover:text-[#C79A32] transition-colors">
                      +263 717 818658
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address callout */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10">
              <MapPin className="text-[#C79A32] flex-shrink-0 mt-0.5" size={20} />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-dark-text dark:text-white uppercase tracking-wider">
                  Avondale Sanctuary
                </h4>
                <p className="text-xs sm:text-sm text-dark-text/80 dark:text-white/80">
                  70 Cork Road, Avondale, Harare, Zimbabwe.
                </p>
                <p className="text-[11px] text-[#C79A32] font-semibold">
                  * Located approximately 100 metres from Kensington Shops.
                </p>
              </div>
            </div>

            {/* Embedded interactive Google Map */}
            <div id="google-map-container" className="rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-primary/25 h-72 relative">
              <iframe
                title="Padanda Restaurant Location"
                src={mapIframeUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="filter dark:contrast-125 dark:hue-rotate-[15deg]"
              />
            </div>

            {/* Quick action buttons for map & calls */}
            <div className="grid grid-cols-3 gap-3">
              {/* WhatsApp button */}
              <a
                id="contact-whatsapp"
                href="https://wa.me/263783157174?text=Hello%20Padanda%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table%20or%20inquire%20about%20today's%20specials."
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 shadow transition-all"
              >
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </a>

              {/* Call Now button */}
              <a
                id="contact-call-now"
                href="tel:+263783157174"
                className="p-3 rounded-xl bg-primary hover:bg-[#16382b] text-white font-bold text-[11px] uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 shadow transition-all"
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>

              {/* Directions button */}
              <a
                id="contact-directions"
                href="https://maps.google.com/?q=70%20Cork%20Road,%20Avondale,%20Harare,%20Zimbabwe"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white border border-[#C79A32] hover:bg-gray-50 text-[#C79A32] font-bold text-[11px] uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 shadow transition-all"
              >
                <Compass size={16} />
                <span>Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive customer contact form */}
          <div id="contact-form-container" className="rounded-3xl bg-[#FAFAF8] dark:bg-forest-dark/40 border border-gray-100 dark:border-primary/20 p-8 shadow-lg text-left">
            {!submitted ? (
              <div id="contact-form-view" className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C79A32]">Send Message</span>
                  <h3 className="font-serif-display text-2xl font-bold text-primary dark:text-accent">
                    We'd Love to Hear From You
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-text/70 dark:text-white/60">
                    Questions, feedback, special caterings or events? Drop us a line and we will reply promptly.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 font-sans">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-dark-text/70 dark:text-white/70">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruvarashe Moyo"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-primary/40 bg-white dark:bg-forest-dark px-4 py-3 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-dark-text/70 dark:text-white/70">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ruva@gmail.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-primary/40 bg-white dark:bg-forest-dark px-4 py-3 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-dark-text/70 dark:text-white/70">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Private Catering, Feedback"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-primary/40 bg-white dark:bg-forest-dark px-4 py-3 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-dark-text/70 dark:text-white/70">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Type your message here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-primary/40 bg-white dark:bg-forest-dark px-4 py-3 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary hover:bg-[#16382b] text-white font-bold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer mt-4"
                  >
                    {loading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send size={14} className="text-secondary" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            ) : (
              <motion.div
                id="contact-form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="mx-auto h-16 w-16 bg-[#1F4D3B]/10 rounded-full flex items-center justify-center text-primary dark:bg-white/10 dark:text-[#C79A32]">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-primary dark:text-accent">
                  Message Sent!
                </h3>
                <p className="text-sm text-dark-text/70 dark:text-white/70 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold">{formState.name}</span>! Your message has been safely received. We will get back to you at <span className="font-bold">{formState.email}</span> shortly.
                </p>

                <button
                  id="reset-contact-form"
                  onClick={handleResetForm}
                  className="px-6 py-2 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider shadow hover:bg-[#16382b] transition-colors cursor-pointer mt-4"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
