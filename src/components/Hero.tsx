import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ShoppingBag, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenReserve: () => void;
  onOpenDelivery: () => void;
}

export default function Hero({ onOpenReserve, onOpenDelivery }: HeroProps) {
  const bgImage = '/src/assets/images/padanda_hero_bg_1783105194356.jpg';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const textFloatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Zooming Parallax-like Background */}
      <motion.div
        id="hero-bg"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 12, ease: 'easeOut' }}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      />

      {/* Earthy Dark Green & Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#123024]/90 via-black/50 to-transparent z-1" />
      <div className="absolute inset-0 bg-black/30 z-1" />

      {/* Floating Shona/Traditional Texture accents */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAF8] dark:from-[#123024] to-transparent z-2 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Subtitle Accent */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-[#C79A32]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-[#C79A32]">
              Welcome to Padanda Restaurant
            </span>
            <span className="h-[1px] w-8 bg-[#C79A32]" />
          </motion.div>

          {/* Main Massive Title */}
          <motion.h1
            variants={itemVariants}
            className="font-serif-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-white max-w-4xl mx-auto"
          >
            Authentic <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#DFB251] to-[#C79A32]">Zimbabwean</span> Cuisine
          </motion.h1>

          {/* Slogan */}
          <motion.p
            variants={itemVariants}
            className="font-serif-menu text-xl sm:text-2xl md:text-3xl text-accent/90 italic font-light tracking-wide max-w-2xl mx-auto"
          >
            "The Real Taste of Home."
          </motion.p>

          {/* Staggered Floating Traditional Taglines */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10"
          >
            {[
              { text: 'Freshly Prepared.', desc: 'From our farms daily' },
              { text: 'Lovingly Served.', desc: 'With authentic Unhu/Ubuntu' },
              { text: 'Tradition Preserved.', desc: 'Heritage in every bite' },
            ].map((tag, idx) => (
              <motion.div
                key={idx}
                variants={textFloatVariants}
                animate="animate"
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col justify-center items-center transition-all duration-300 hover:bg-white/10 hover:border-[#C79A32]/40"
              >
                <span className="text-sm font-bold text-[#C79A32]">{tag.text}</span>
                <span className="text-[10px] text-white/60 tracking-wider font-sans mt-0.5 uppercase">
                  {tag.desc}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* Reserve Table Popup Trigger */}
            <motion.button
              id="hero-reserve-button"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(199, 154, 50, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenReserve}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#C79A32] hover:bg-[#b08525] text-white font-bold text-xs sm:text-sm tracking-widest uppercase px-8 py-4 shadow-xl transition-all cursor-pointer"
            >
              <Calendar size={16} />
              <span>Reserve a Table</span>
            </motion.button>

            {/* Delivery Popup Trigger */}
            <motion.button
              id="hero-delivery-button"
              whileHover={{ scale: 1.05, bg: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDelivery}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-bold text-xs sm:text-sm tracking-widest uppercase px-8 py-3.5 backdrop-blur-sm transition-all cursor-pointer"
            >
              <ShoppingBag size={16} className="text-[#C79A32]" />
              <span>Order Delivery</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Chevron Down to scroll */}
      <motion.div
        id="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer text-[#C79A32] hover:text-white transition-colors p-2"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}
