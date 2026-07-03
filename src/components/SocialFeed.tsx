import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';

export default function SocialFeed() {
  const feedItems = [
    {
      id: 's1',
      image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=600',
      likes: 1243,
      comments: 89,
      tag: '#TasteOfHome',
    },
    {
      id: 's2',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600',
      likes: 832,
      comments: 42,
      tag: '#AvondaleHarare',
    },
    {
      id: 's3',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
      likes: 1092,
      comments: 73,
      tag: '#TraditionalCuisine',
    },
    {
      id: 's4',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      likes: 924,
      comments: 54,
      tag: '#LuxuryDining',
    },
    {
      id: 's5',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400',
      likes: 712,
      comments: 31,
      tag: '#PadandaGardens',
    },
    {
      id: 's6',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400',
      likes: 1145,
      comments: 98,
      tag: '#KaribaBream',
    }
  ];

  return (
    <section
      id="social"
      className="py-24 bg-light-bg dark:bg-[#123024] border-b border-secondary/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 text-[#C79A32]">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Join Our Circle</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-black text-primary dark:text-accent leading-none tracking-tight">
              Follow Our Journey
            </h2>
            <p className="text-sm sm:text-base text-dark-text/75 dark:text-white/70 font-sans max-w-xl">
              We love sharing moments of cooking prep, rich garden events, and happy guests. Stay connected on social media for daily specials.
            </p>
          </div>

          {/* Social Links buttons */}
          <div className="flex items-center gap-3">
            <a
              id="follow-instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md"
            >
              <Instagram size={14} />
              <span>@PadandaHarare</span>
            </a>
            
            <a
              id="follow-facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md"
            >
              <Facebook size={14} />
              <span>Padanda Restaurant</span>
            </a>
          </div>
        </div>

        {/* Instagrid layout */}
        <div id="social-instagram-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {feedItems.map((item, index) => (
            <motion.div
              id={`social-post-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 dark:border-primary/10 shadow-sm cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.tag}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-3">
                <div className="flex items-center gap-4 text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <Heart size={16} fill="white" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} fill="white" /> {item.comments}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#C79A32] tracking-wider uppercase">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Facebook Embedded-style Highlight Preview */}
        <div id="facebook-highlight-post" className="max-w-xl mx-auto rounded-2xl bg-white dark:bg-forest-dark border border-gray-100 dark:border-primary/20 shadow p-6 text-left space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile icon */}
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-serif-display font-bold">
                P
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-dark-text dark:text-white">Padanda Restaurant</h4>
                <p className="text-[10px] text-dark-text/40 dark:text-white/40">2 hours ago • Avondale, Harare</p>
              </div>
            </div>
            <Facebook className="text-blue-600" size={18} />
          </div>

          <p className="text-xs sm:text-sm text-dark-text/80 dark:text-white/85 leading-relaxed font-sans">
            Mugovera unotanga neSadza! Bring the family over this Saturday to enjoy our legendary slow-cooked Oxtail, stewed free-range Road Runner chicken, and foaming hot Maheu. Secure your garden seating early. 70 Cork Road, Avondale (100m from Kensington Shops). 🇿🇼🍲❤️
          </p>

          <div className="aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-primary/5">
            <img
              src="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800"
              alt="Saturday Special Oxtail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 dark:border-primary/10 pt-4 text-xs text-dark-text/50 dark:text-white/50">
            <span className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
              <Heart size={14} /> Like (432)
            </span>
            <span className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
              <MessageCircle size={14} /> Comment (84)
            </span>
            <span className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
              <Share2 size={14} /> Share (29)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
