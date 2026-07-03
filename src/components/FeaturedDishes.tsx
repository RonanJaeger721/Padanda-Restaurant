import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Sparkles, Flame } from 'lucide-react';
import { menuItems } from '../data/restaurantData';
import { MenuItem } from '../types';

interface FeaturedDishesProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function FeaturedDishes({ onAddToCart }: FeaturedDishesProps) {
  // Get featured items
  const featured = menuItems.filter((item) => item.isFeatured);

  return (
    <section
      id="featured"
      className="py-24 bg-light-bg dark:bg-[#123024] border-b border-secondary/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C79A32]">
              <Flame size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Signature Plates</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
              Featured Dishes
            </h2>
            <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans max-w-xl">
              Hand-crafted masterpieces celebrating centuries of Zimbabwean culinary heritage, refined for the modern luxury palate.
            </p>
          </div>
        </div>

        {/* Responsive Grid with custom layouts */}
        <div id="featured-dishes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item, index) => (
            <motion.div
              id={`featured-card-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-forest-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-primary/20 shadow-lg group flex flex-col justify-between"
            >
              {/* Image Container with Hover zoom */}
              <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Visual Glassmorphism Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Popular Badge */}
                {item.isPopular && (
                  <div className="absolute top-4 left-4 bg-[#C79A32] text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
                    <Star size={10} fill="currentColor" />
                    <span>Highly Popular</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-4 right-4 bg-primary/95 backdrop-blur-md text-white px-3 py-1 rounded-md text-[9px] font-bold tracking-widest uppercase border border-secondary/20">
                  {item.category}
                </div>
              </div>

              {/* Info & CTA content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-display text-xl font-bold text-primary dark:text-accent group-hover:text-[#C79A32] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="font-serif-menu text-lg font-bold text-[#C79A32]">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-dark-text/75 dark:text-white/60 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Add to Cart CTA */}
                <motion.button
                  id={`order-btn-${item.id}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAddToCart(item)}
                  className="w-full rounded-xl bg-primary hover:bg-[#16382b] text-white font-bold text-xs tracking-widest uppercase py-3 px-4 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#C79A32]/25"
                >
                  <ShoppingBag size={14} className="text-secondary" />
                  <span>Order Delivery</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
