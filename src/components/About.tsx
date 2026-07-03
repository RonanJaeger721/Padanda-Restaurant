import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Sparkles } from 'lucide-react';

export default function About() {
  const interiorImage = '/src/assets/images/padanda_interior_1783105209426.jpg';

  return (
    <section
      id="about"
      className="relative py-24 bg-light-bg dark:bg-forest-dark border-b border-secondary/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative Shona-style gold radial texture background */}
      <div className="absolute inset-0 african-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Animated Image Showcase (Left Column) */}
          <motion.div
            id="about-visuals"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative"
          >
            {/* Main Lifestyle Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C79A32]/20 aspect-video lg:aspect-square group">
              <img
                src={interiorImage}
                alt="Padanda Luxury Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-primary/95 dark:bg-[#C79A32]/95 backdrop-blur-md px-4 py-2.5 rounded-lg border border-secondary/20 shadow-lg text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Est. In Harare</span>
                <span className="text-sm font-bold font-serif-display">Padanda Avondale</span>
              </div>
            </div>

            {/* Decorative background blocks to represent high craftsmanship */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 dark:bg-[#C79A32]/5 rounded-2xl -z-1 border border-primary/10 dark:border-secondary/10" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/5 dark:bg-[#C79A32]/5 rounded-3xl -z-1 border border-primary/10 dark:border-secondary/10" />
          </motion.div>

          {/* About Copy Column (Right Column) */}
          <motion.div
            id="about-copy"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Header Badge */}
            <div className="flex items-center gap-2 text-[#C79A32]">
              <Sparkles size={16} />
              <span className="text-xs font-extrabold uppercase tracking-[0.3em]">Our Story</span>
            </div>

            {/* Big Headline */}
            <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-tight tracking-tight">
              Where <span className="text-[#C79A32] italic">Zimbabwe</span> Eats.
            </h2>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-dark-text/80 dark:text-white/80 font-sans text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-primary dark:text-accent text-base sm:text-lg">
                Padanda Restaurant brings together authentic Zimbabwean recipes, warm hospitality and unforgettable flavours.
              </p>
              <p>
                Every dish is freshly prepared using quality local ingredients while preserving the traditions that have been enjoyed for generations. We pride ourselves on sourcing everything locally—from finger millet to free-range poultry—supporting small Harare and Mashonaland farming collectives.
              </p>
              <p>
                Whether you're enjoying a family lunch, a business meeting or celebrating a special occasion, Padanda Restaurant welcomes everyone with authentic African warmth (Unhu). Our dining space represents a celebration of Shona and Ndebele cultural arts, merging upscale styling with national elements.
              </p>
            </div>

            {/* Micro details / values */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-primary/20">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-[#C79A32]/10 text-[#C79A32]">
                  <Flame size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark-text dark:text-white uppercase tracking-wider">Traditional Fire</h4>
                  <p className="text-[11px] text-dark-text/60 dark:text-white/60">Simmered slowly in authentic clay pots.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary dark:text-[#C79A32] dark:bg-white/10">
                  <Star size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark-text dark:text-white uppercase tracking-wider">100% Organic</h4>
                  <p className="text-[11px] text-dark-text/60 dark:text-white/60">Daily farm-to-table deliveries.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
