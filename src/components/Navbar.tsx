import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Calendar, ShoppingBag } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenReserve: () => void;
  onOpenDelivery: () => void;
  cartCount: number;
}

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  onOpenReserve,
  onOpenDelivery,
  cartCount,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'why-choose-us', label: 'Why Choose Us' },
    { id: 'featured', label: 'Featured' },
    { id: 'menu', label: 'Menu' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 90,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      id="main-nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-md py-2 border-b border-secondary/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => scrollToSection('home')} className="cursor-pointer">
          <Logo size="sm" light={!isScrolled && !darkMode} />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              id={`nav-link-${link.id}`}
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative py-2 text-xs font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer ${
                activeSection === link.id
                  ? 'text-primary dark:text-secondary'
                  : isScrolled
                  ? 'text-dark-text/75 hover:text-primary dark:text-white/75 dark:hover:text-secondary'
                  : 'text-white/85 hover:text-white dark:text-white/85 dark:hover:text-secondary'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            id="desktop-theme-toggle"
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              isScrolled
                ? 'text-dark-text/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10'
                : 'text-white/80 hover:bg-white/15'
            }`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Count Button */}
          <button
            id="desktop-cart-button"
            onClick={onOpenDelivery}
            className={`relative p-2 rounded-full transition-all cursor-pointer ${
              isScrolled
                ? 'text-dark-text/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10'
                : 'text-white/80 hover:bg-white/15'
            }`}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white font-bold text-[9px] h-5 w-5 rounded-full flex items-center justify-center animate-pulse border-2 border-[#FAFAF8] dark:border-forest-dark">
                {cartCount}
              </span>
            )}
          </button>

          {/* Sticky Book a Table Button */}
          <motion.button
            id="sticky-reserve-button"
            whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(240, 90, 40, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenReserve}
            className="flex items-center gap-2 rounded-full bg-primary hover:bg-[#222222] text-white dark:bg-secondary dark:hover:bg-orange-600 font-bold text-xs tracking-widest uppercase px-5 py-2.5 shadow transition-all cursor-pointer"
          >
            <Calendar size={14} />
            <span>Book a Table</span>
          </motion.button>
        </div>

        {/* Mobile menu, Theme Toggle, Cart */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Dark Mode Toggle */}
          <button
            id="mobile-theme-toggle"
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full cursor-pointer ${
              isScrolled ? 'text-dark-text dark:text-white' : 'text-white'
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart */}
          <button
            id="mobile-cart-button"
            onClick={onOpenDelivery}
            className={`relative p-2 rounded-full cursor-pointer ${
              isScrolled ? 'text-dark-text dark:text-white' : 'text-white'
            }`}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white font-bold text-[9px] h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Burger */}
          <button
            id="mobile-menu-burger"
            onClick={() => setMobileMenuOpen(true)}
            className={`p-2 rounded-full cursor-pointer ${
              isScrolled ? 'text-dark-text dark:text-white' : 'text-white'
            }`}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              id="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Content drawer */}
            <motion.div
              id="mobile-nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#FAFAF8] dark:bg-forest-dark p-6 shadow-2xl flex flex-col justify-between border-l border-secondary/20"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-primary/20 pb-4">
                  <Logo size="sm" />
                  <button
                    id="close-mobile-nav"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-dark-text/70 dark:text-white/70"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <button
                      id={`mobile-nav-link-${link.id}`}
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left py-2 px-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors ${
                        activeSection === link.id
                          ? 'bg-secondary/10 text-secondary'
                          : 'text-dark-text/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3 border-t border-gray-200 dark:border-primary/20 pt-4">
                <button
                  id="mobile-reserve-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReserve();
                  }}
                  className="w-full rounded-lg bg-primary hover:bg-[#222222] text-white font-bold py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={14} />
                  <span>Reserve Table</span>
                </button>
                
                <button
                  id="mobile-delivery-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDelivery();
                  }}
                  className="w-full rounded-lg bg-white border border-secondary text-secondary font-bold py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  <span>Order Delivery</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
