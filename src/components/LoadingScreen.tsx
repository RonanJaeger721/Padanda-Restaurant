import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [proverbIndex, setProverbIndex] = useState(0);

  const traditionalSayings = [
    'The Real Taste of Home.',
    'Chara chimwe hachitswanyinda.',
    'Tradition Preserved. Hospitality Restored.',
    'Mugovera unotanga neSadza!',
  ];

  useEffect(() => {
    // Rotate sayings every 1.2s
    const textTimer = setInterval(() => {
      setProverbIndex((prev) => (prev + 1) % traditionalSayings.length);
    }, 1500);

    // Fade out load screen after 3.2s
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => {
      clearInterval(textTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-forest-dark flex flex-col items-center justify-center text-white"
        >
          {/* Logo container with pulse animation */}
          <motion.div
            id="loading-logo-holder"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [0.9, 1.02, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="space-y-6"
          >
            <Logo size="lg" light />
          </motion.div>

          {/* Loader bar spinner */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-8 max-w-xs">
            <motion.div
              id="loading-progress"
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              className="relative h-full w-2/3 bg-gradient-to-r from-transparent via-secondary to-transparent"
            />
          </div>

          {/* Traditional proverbs/quotes rotating */}
          <div className="h-8 mt-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={proverbIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm font-serif-menu italic tracking-widest text-accent text-center px-4"
              >
                "{traditionalSayings[proverbIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Secure disclaimer for premium look */}
          <p className="absolute bottom-6 text-[9px] font-sans text-white/30 tracking-widest uppercase">
            Padanda Luxury Dining • Avondale, Harare
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
