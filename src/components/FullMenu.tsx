import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, ShoppingBag, Leaf, Flame, Sparkles } from 'lucide-react';
import { menuItems } from '../data/restaurantData';
import { MenuItem } from '../types';

interface FullMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function FullMenu({ onAddToCart }: FullMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Traditional Meals': true,
    'Chicken': true,
    'Beef': true,
  });

  const categories = [
    'All',
    'Traditional Meals',
    'Chicken',
    'Beef',
    'Game Meat',
    'Fish',
    'Vegetarian',
    'Drinks',
    'Desserts',
  ];

  // Grouped items cache
  const groupedAndFilteredItems = useMemo(() => {
    // 1. Filter by search query
    const filteredBySearch = menuItems.filter((item) => {
      const matchName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDesc = item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchName || matchDesc;
    });

    // 2. Filter by category
    const filteredByCategory = selectedCategory === 'All'
      ? filteredBySearch
      : filteredBySearch.filter((item) => item.category === selectedCategory);

    // 3. Group by category
    const groups: Record<string, MenuItem[]> = {};
    filteredByCategory.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });

    return groups;
  }, [searchQuery, selectedCategory]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    // If a specific category is selected, auto-expand it
    if (cat !== 'All') {
      setExpandedCategories((prev) => ({
        ...prev,
        [cat]: true,
      }));
    }
  };

  return (
    <section
      id="menu"
      className="py-24 bg-white dark:bg-[#123024] border-b border-secondary/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C79A32]">Interactive Digital Menu</span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
            Explore Full Menu
          </h2>
          <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans">
            Feast your eyes on our comprehensive menu of premium traditional plates, game meat specialities, and custom fermented local beverages.
          </p>
        </div>

        {/* Search Bar & Categories Navigation */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between bg-[#FAFAF8] dark:bg-forest-dark p-4 rounded-2xl border border-gray-100 dark:border-primary/10 shadow-sm">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text/40 dark:text-white/40" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Sadza, Oxtail, Maheu, Chicken..."
                className="w-full rounded-xl border border-gray-200 dark:border-primary/30 bg-white dark:bg-forest-dark pl-11 pr-4 py-3 text-sm text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary shadow-inner"
              />
            </div>

            {/* Total items found indicator */}
            <span className="text-xs text-dark-text/50 dark:text-white/50 font-bold tracking-widest uppercase">
              {Object.values(groupedAndFilteredItems).reduce((acc: number, curr: unknown) => acc + (curr as MenuItem[]).length, 0)} Items Listed
            </span>
          </div>

          {/* Quick Category Filters (horizontal scrolling menu headings) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none scroll-smooth">
            {categories.map((cat) => (
              <button
                id={`cat-filter-${cat}`}
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C79A32] text-white shadow-md shadow-[#C79A32]/25 scale-105'
                    : 'bg-[#FAFAF8] text-dark-text/75 hover:bg-primary/5 dark:bg-forest-dark dark:text-white/75 dark:hover:bg-white/5 border border-gray-100 dark:border-primary/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Accordion menu list */}
        <div id="accordion-menu-categories" className="space-y-6">
          {Object.keys(groupedAndFilteredItems).length === 0 ? (
            /* No search results found */
            <div id="no-menu-results" className="text-center py-16 bg-[#FAFAF8] dark:bg-forest-dark rounded-2xl border border-dashed border-gray-200 dark:border-primary/20">
              <p className="text-sm font-bold text-dark-text/60 dark:text-white/60 font-sans">
                No culinary treasures match your search criteria. Try a different query!
              </p>
            </div>
          ) : (
            Object.entries(groupedAndFilteredItems).map(([catName, itemsUntyped]) => {
              const items = itemsUntyped as MenuItem[];
              const isExpanded = !!expandedCategories[catName];
              return (
                <div
                  id={`category-accordion-${catName}`}
                  key={catName}
                  className="rounded-2xl border border-gray-100 dark:border-primary/10 bg-[#FAFAF8] dark:bg-forest-dark overflow-hidden shadow-sm"
                >
                  {/* Accordion Trigger */}
                  <button
                    id={`trigger-${catName}`}
                    onClick={() => toggleCategory(catName)}
                    className="w-full flex items-center justify-between px-6 py-5 bg-[#FAFAF8] dark:bg-forest-dark hover:bg-primary/5 dark:hover:bg-white/5 transition-all text-left cursor-pointer border-b border-gray-100 dark:border-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif-display text-lg sm:text-xl font-bold text-primary dark:text-accent">
                        {catName}
                      </span>
                      <span className="text-[10px] bg-primary/10 text-primary dark:bg-[#C79A32]/10 dark:text-[#C79A32] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div>
                      {isExpanded ? <ChevronUp size={20} className="text-[#C79A32]" /> : <ChevronDown size={20} className="text-[#C79A32]" />}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#123024]/50">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 p-4 rounded-xl hover:bg-light-bg dark:hover:bg-forest-dark transition-colors duration-300 border border-transparent hover:border-gray-100 dark:hover:border-primary/5 shadow-none hover:shadow-sm"
                            >
                              {/* Photo */}
                              <img
                                src={item.image}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover flex-shrink-0 border border-[#C79A32]/10"
                              />

                              {/* Text & ordering option */}
                              <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div>
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="font-serif-display text-sm sm:text-base font-bold text-primary dark:text-accent truncate">
                                      {item.name}
                                    </h4>
                                    <span className="font-serif-menu text-sm font-bold text-[#C79A32] flex-shrink-0">
                                      {item.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] sm:text-xs text-dark-text/70 dark:text-white/60 font-sans leading-relaxed line-clamp-2 mt-1">
                                    {item.description}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-2 mt-2 border-t border-dashed border-gray-100 dark:border-primary/5">
                                  {/* Badges for dietary info */}
                                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-dark-text/40 dark:text-white/40 uppercase">
                                    {item.category === 'Vegetarian' && (
                                      <span className="flex items-center gap-0.5 text-emerald-600">
                                        <Leaf size={10} /> Vegetarian
                                      </span>
                                    )}
                                    {item.isPopular && (
                                      <span className="flex items-center gap-0.5 text-orange-500">
                                        <Sparkles size={10} /> Highly Rated
                                      </span>
                                    )}
                                  </div>

                                  {/* Add button */}
                                  <button
                                    id={`menu-add-btn-${item.id}`}
                                    onClick={() => onAddToCart(item)}
                                    className="p-1.5 px-3 rounded-lg bg-primary/5 hover:bg-primary hover:text-white dark:bg-[#C79A32]/10 dark:text-[#C79A32] dark:hover:bg-[#C79A32] dark:hover:text-forest-dark font-bold text-[10px] uppercase tracking-wider transition-colors duration-300 flex items-center gap-1 cursor-pointer border border-[#C79A32]/20"
                                  >
                                    <ShoppingBag size={11} />
                                    <span>Add</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
