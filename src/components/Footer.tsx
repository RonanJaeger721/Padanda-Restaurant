import React from 'react';
import { Instagram, Facebook, MapPin, Phone, MessageSquare, Heart } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onOpenReserve: () => void;
  onOpenDelivery: () => void;
}

export default function Footer({ onOpenReserve, onOpenDelivery }: FooterProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  // Structured data (Schema.org Restaurant schema markup) for SEO
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    'name': 'Padanda Restaurant',
    'image': [
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800'
    ],
    '@id': 'https://ais-pre-bfbeskakjz55j7rb376yzp-553982460099.europe-west2.run.app/#restaurant',
    'url': 'https://ais-pre-bfbeskakjz55j7rb376yzp-553982460099.europe-west2.run.app',
    'telephone': '+263783157174',
    'priceRange': '$$',
    'menu': 'https://ais-pre-bfbeskakjz55j7rb376yzp-553982460099.europe-west2.run.app/#menu',
    'servesCuisine': ['Traditional Zimbabwean', 'African Fine Dining', 'Game Meat'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '70 Cork Road',
      'addressLocality': 'Avondale',
      'addressRegion': 'Harare',
      'addressCountry': 'ZW'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '-17.7981',
      'longitude': '31.0371'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        'opens': '07:00',
        'closes': '20:00'
      }
    ]
  };

  return (
    <footer
      id="main-footer"
      className="bg-forest-dark text-white py-16 border-t border-secondary/20"
    >
      {/* Inject SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Logo and brief story */}
          <div className="space-y-4">
            <div className="w-fit flex justify-start items-start">
              <Logo size="sm" light className="!items-start" />
            </div>
            <p className="text-xs text-white/60 font-sans leading-relaxed max-w-sm mt-3">
              Padanda brings together centuries of traditional Zimbabwean recipes, warm hospitality, and modern African fine dining. The real taste of home, nestled in Avondale.
            </p>
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-widest text-secondary">
              Visit & Call
            </h4>
            <div className="space-y-3 text-xs text-white/70 font-sans">
              <div className="flex gap-2 items-start">
                <MapPin size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                <span>70 Cork Road, Avondale, Harare, Zimbabwe (100m from Kensington Shops)</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone size={14} className="text-secondary flex-shrink-0" />
                <a href="tel:+263783157174" className="hover:text-white transition-colors">
                  +263 783 157174
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <Phone size={14} className="text-secondary flex-shrink-0" />
                <a href="tel:+263717818658" className="hover:text-white transition-colors">
                  +263 717 818658
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-widest text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-bold text-white/75 font-sans">
              <li>
                <button
                  id="footer-link-menu"
                  onClick={() => handleScrollTo('menu')}
                  className="hover:text-secondary transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Explore Menu
                </button>
              </li>
              <li>
                <button
                  id="footer-link-reserve"
                  onClick={onOpenReserve}
                  className="hover:text-secondary transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  id="footer-link-delivery"
                  onClick={onOpenDelivery}
                  className="hover:text-secondary transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Order Delivery
                </button>
              </li>
              <li>
                <button
                  id="footer-link-gallery"
                  onClick={() => handleScrollTo('gallery')}
                  className="hover:text-secondary transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => handleScrollTo('contact')}
                  className="hover:text-secondary transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Contact Info
                </button>
              </li>
            </ul>
          </div>

          {/* Social connections */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-widest text-secondary">
              Connect With Us
            </h4>
            <p className="text-xs text-white/60 font-sans leading-relaxed">
              Tag us in your photos of Sadza, Oxtail, and Maheu using <strong>#PadandaHarare</strong>!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all shadow"
                title="Follow Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                id="footer-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all shadow"
                title="Like on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                id="footer-maps"
                href="https://maps.google.com/?q=70%20Cork%20Road,%20Avondale,%20Harare,%20Zimbabwe"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all shadow"
                title="View on Google Maps"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-sans">
          <p>© 2026 Padanda Restaurant. All Rights Reserved. Crafted with pride in Avondale.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-secondary fill-current" /> for Zimbabwe
          </p>
        </div>

      </div>
    </footer>
  );
}
