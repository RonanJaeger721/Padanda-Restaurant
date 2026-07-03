import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageSquare } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappUrl = "https://wa.me/263783157174?text=Hello%20Padanda%20Restaurant!%20I%20have%20a%20question%20regarding%20reservations,%20delivery,%20or%20today's%20menu.";

  return (
    <div id="floating-actions" className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-3">
      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-primary/95 dark:bg-secondary text-white dark:text-forest-dark border border-secondary/20 shadow-xl hover:scale-110 transition-transform cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Speed Dial */}
      <motion.a
        id="floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="p-4 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 hover:scale-110 transition-transform flex items-center justify-center border border-white/10"
        title="Chat on WhatsApp"
      >
        <MessageSquare size={22} fill="white" />
      </motion.a>
    </div>
  );
}
