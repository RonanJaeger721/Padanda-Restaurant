import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/restaurantData';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll through reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="reviews"
      className="py-24 bg-white dark:bg-forest-dark border-b border-secondary/10 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C79A32]">Guest Voices</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
            Loved by Our Guests
          </h2>
          <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans">
            Read real feedback from Avondale locals and international travelers who choose Padanda for the absolute finest Zimbabwean hospitality.
          </p>
        </div>

        {/* Centralized Google Reviews Rating Banner (Luxury Trust Builder) */}
        <motion.div
          id="google-reviews-badge"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto p-4 rounded-2xl bg-[#FAFAF8] dark:bg-forest-dark border border-[#C79A32]/20 shadow-sm flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            {/* Google G icon styling */}
            <div className="h-10 w-10 rounded-full bg-white shadow flex items-center justify-center font-black text-lg text-blue-600">
              G
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-dark-text dark:text-white">Google Rating</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-full uppercase">Verified</span>
              </div>
              <p className="text-xs text-dark-text/60 dark:text-white/60">Based on 432 local reviews</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-0.5 text-[#C79A32]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-black text-primary dark:text-accent">4.9 / 5.0</span>
          </div>
        </motion.div>

        {/* Interactive Luxury Carousel */}
        <div id="reviews-carousel" className="relative max-w-4xl mx-auto mt-12 bg-[#FAFAF8] dark:bg-forest-dark/30 border border-gray-100 dark:border-primary/10 rounded-3xl p-8 sm:p-12 shadow-md">
          <Quote className="absolute right-8 top-8 text-[#C79A32]/10 h-32 w-32 -z-0 pointer-events-none" />

          <div className="relative z-10 min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-left"
              >
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C79A32]">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-dark-text/40 dark:text-white/40 font-mono">
                    {testimonials[activeIndex].date}
                  </span>
                </div>

                {/* Testimonial body text */}
                <p className="font-serif-menu text-lg sm:text-2xl text-primary dark:text-accent italic leading-relaxed font-light">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author profile and verification badge */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-primary/10">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 rounded-full object-cover border-2 border-[#C79A32]/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-dark-text dark:text-white">
                        {testimonials[activeIndex].name}
                      </h4>
                      <CheckCircle2 size={12} className="text-blue-500" />
                    </div>
                    <p className="text-xs text-dark-text/60 dark:text-white/60">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation and Indicators */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-gray-200 dark:border-primary/10">
              {/* Dots indicator */}
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    id={`testimonial-dot-${idx}`}
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIndex === idx ? 'w-6 bg-[#C79A32]' : 'w-2 bg-gray-300 dark:bg-primary/20 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Back/Next triggers */}
              <div className="flex items-center gap-2">
                <button
                  id="prev-testimonial"
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gray-200 dark:border-primary/30 hover:bg-black/5 dark:hover:bg-white/10 text-dark-text/70 dark:text-white/70 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  id="next-testimonial"
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gray-200 dark:border-primary/30 hover:bg-black/5 dark:hover:bg-white/10 text-dark-text/70 dark:text-white/70 transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
