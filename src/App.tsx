import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedDishes from './components/FeaturedDishes';
import FullMenu from './components/FullMenu';
import Delivery from './components/Delivery';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import SocialFeed from './components/SocialFeed';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ReservationModal from './components/ReservationModal';
import DeliveryModal from './components/DeliveryModal';
import { MenuItem } from './types';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('padanda_dark_mode');
    if (savedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 2. Load persistent cart on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('padanda_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Sync cart to local storage whenever it changes
  const saveCartToLocalStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('padanda_cart', JSON.stringify(newCart));
  };

  // 3. Toggle dark theme function
  const handleToggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('padanda_dark_mode', String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 4. Cart management operations
  const handleAddToCart = (item: MenuItem) => {
    const existingIndex = cart.findIndex((cartItem) => cartItem.menuItem.id === item.id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      // Increment quantity
      newCart[existingIndex].quantity += 1;
    } else {
      // Add fresh item
      newCart.push({ menuItem: item, quantity: 1 });
    }

    saveCartToLocalStorage(newCart);
    // Auto slide cart drawer open for great visual feedback
    setIsDeliveryOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    let newCart = cart
      .map((item) => {
        if (item.menuItem.id === itemId) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Purge items with 0 qty

    saveCartToLocalStorage(newCart);
  };

  const handleClearCart = () => {
    saveCartToLocalStorage([]);
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-[#123024] text-dark-text dark:text-white transition-colors duration-300 font-sans">
      
      {/* 1. Initial Elegant Proverb Loading Screen */}
      <LoadingScreen />

      {/* 2. Sticky Header & Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
        cartCount={cartCount}
      />

      {/* 3. Hero Visual Parallax Slider Banner */}
      <Hero
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
      />

      {/* 4. Brand Storytelling & About Us */}
      <About />

      {/* 5. Standards & Why Choose Us Bento Grid */}
      <WhyChooseUs />

      {/* 6. Curated Signature Featured Plates */}
      <FeaturedDishes onAddToCart={handleAddToCart} />

      {/* 7. Comprehensive Digital Expandable Searchable Menu */}
      <FullMenu onAddToCart={handleAddToCart} />

      {/* 8. Harare Delivery Banner & CTA */}
      <Delivery onOpenDelivery={() => setIsDeliveryOpen(true)} />

      {/* 9. Pinterest masonry lightbox gallery */}
      <Gallery />

      {/* 10. Carousel testimonials & Google trust ratings */}
      <Testimonials />

      {/* 11. Custom social layouts and feeds */}
      <SocialFeed />

      {/* 12. Address, Hours, google maps & Interactive messaging */}
      <LocationContact />

      {/* 13. Dynamic footer containing Schema SEO and custom links */}
      <Footer
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
      />

      {/* 14. Speed-dial Floating speed buttons */}
      <FloatingButtons />

      {/* 15. Modals / Dialog Drawers */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />

      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onAddQuickItem={handleAddToCart}
      />

    </div>
  );
}
