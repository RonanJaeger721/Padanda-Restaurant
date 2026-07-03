import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { whyUsItems } from '../data/restaurantData';

export default function WhyChooseUs() {
  // Helper to dynamically render a Lucide Icon based on name string
  const renderIcon = (name: string) => {
    const LucideIcon = (Icons as any)[name];
    if (LucideIcon) {
      return <LucideIcon className="h-6 w-6 stroke-[2]" />;
    }
    return <Icons.HelpCircle className="h-6 w-6" />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="why-choose-us"
      className="py-24 bg-white dark:bg-forest-dark border-b border-secondary/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C79A32]">Our Standards</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans">
            At Padanda, we fuse modern gourmet aesthetics with rich African traditions to deliver an unforgettable luxury dining experience.
          </p>
        </div>

        {/* Bento/Grid of Animated Cards */}
        <motion.div
          id="why-us-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          {whyUsItems.map((item, idx) => (
            <motion.div
              id={`why-card-${item.id}`}
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 12px 30px rgba(31, 77, 59, 0.08)',
                borderColor: 'rgba(199, 154, 50, 0.5)',
              }}
              className="group relative rounded-2xl bg-[#FAFAF8] dark:bg-forest-dark border border-gray-100 dark:border-primary/20 p-6 transition-all duration-300 flex flex-col justify-between h-56 shadow-sm overflow-hidden"
            >
              {/* Top Accent Icon & Number */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 w-12 h-12 rounded-xl bg-primary/5 text-primary dark:bg-[#C79A32]/10 dark:text-[#C79A32] group-hover:bg-primary group-hover:text-white dark:group-hover:bg-[#C79A32] dark:group-hover:text-forest-dark transition-colors duration-300 flex items-center justify-center">
                    {renderIcon(item.iconName)}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#C79A32] flex items-center justify-center text-[#C79A32] text-xs font-mono font-bold">
                    0{idx + 1}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-display text-lg font-bold text-primary dark:text-accent group-hover:text-[#C79A32] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-dark-text/70 dark:text-white/60 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Subtle background glow on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#1F4D3B] to-[#C79A32] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
