import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { galleryItems } from '../data/restaurantData';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'interior' | 'exterior' | 'events'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: Array<{ id: 'all' | 'food' | 'interior' | 'exterior' | 'events'; label: string }> = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Fine Food' },
    { id: 'interior', label: 'Interior Ambiance' },
    { id: 'exterior', label: 'Lush Gardens' },
    { id: 'events', label: 'Events & Warmth' },
  ];

  // Filtered gallery items list
  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredItems.length;
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-light-bg dark:bg-forest-dark border-b border-secondary/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Visual Feast</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
            Padanda Gallery
          </h2>
          <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans">
            Step inside our cozy sanctuary and explore our culinary masterpieces. Browse real snapshots of our luxury setups and traditional plates.
          </p>
        </div>

        {/* Gallery Filter Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {filters.map((filter) => (
            <button
              id={`gallery-filter-${filter.id}`}
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-primary text-white dark:bg-secondary dark:text-forest-dark'
                  : 'bg-white text-dark-text/70 dark:bg-forest-dark dark:text-white/70 border border-gray-100 dark:border-primary/10 hover:bg-primary/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Pinterest style Masonry Gallery Grid */}
        <motion.div
          id="gallery-masonry-grid"
          layout
          className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              id={`gallery-item-${item.id}`}
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setLightboxIndex(index)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden bg-[#FAFAF8] dark:bg-forest-dark border border-gray-100 dark:border-primary/20 shadow group cursor-pointer"
            >
              {/* Image element with lazy loading */}
              <img
                src={item.url}
                alt={item.caption}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay with maximize icon and caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                  <Maximize2 size={14} />
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-secondary">
                    {item.category}
                  </span>
                  <p className="text-xs font-medium font-serif-display leading-tight">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div
              id="gallery-lightbox"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close button */}
              <button
                id="close-lightbox"
                onClick={() => setLightboxIndex(null)}
                className="absolute right-6 top-6 rounded-full p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Navigation Left */}
              <button
                id="prev-lightbox"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors hidden sm:block"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Central high quality lightbox display */}
              <motion.div
                id="lightbox-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center gap-4"
              >
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] rounded-xl object-contain shadow-2xl border border-white/10"
                />
                
                {/* Text description inside lightbox */}
                <div className="text-center text-white space-y-1 mt-2">
                  <p className="text-sm font-semibold font-serif-display text-secondary">
                    {filteredItems[lightboxIndex].caption}
                  </p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 font-sans">
                    Category: {filteredItems[lightboxIndex].category} | {lightboxIndex + 1} of {filteredItems.length}
                  </p>
                </div>
              </motion.div>

              {/* Navigation Right */}
              <button
                id="next-lightbox"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors hidden sm:block"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
