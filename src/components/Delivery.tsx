import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Truck, ShieldCheck, Zap } from 'lucide-react';

interface DeliveryProps {
  onOpenDelivery: () => void;
}

export default function Delivery({ onOpenDelivery }: DeliveryProps) {
  return (
    <section
      id="delivery"
      className="relative py-24 bg-primary dark:bg-forest-dark border-b border-secondary/15 overflow-hidden text-white"
    >
      {/* Absolute decorative textures */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F05A28_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Banner Copy (Left Column) */}
          <div className="space-y-6 text-left">
            {/* Header Tag */}
            <div className="flex items-center gap-2 text-secondary">
              <Truck size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Harare-wide Delivery</span>
            </div>

            {/* Massive Title */}
            <h2 className="font-serif-display text-4xl sm:text-6xl font-black text-white leading-none tracking-tight">
              Padanda Delivers.
            </h2>

            {/* Slogan & Paragraph */}
            <p className="font-sans text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
              Enjoy your favourite authentic Zimbabwean meals from the comfort of your home or office. Freshly cooked, sealed in hot-holding luxury containers, and couriered straight to you.
            </p>

            {/* Distinct bullet checklist */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-md">
              <div className="space-y-1">
                <span className="h-2 w-2 rounded-full bg-secondary inline-block mb-1" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fast.</h4>
                <p className="text-[10px] text-white/50">Couriered in under 45 mins</p>
              </div>
              <div className="space-y-1">
                <span className="h-2 w-2 rounded-full bg-secondary inline-block mb-1" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fresh.</h4>
                <p className="text-[10px] text-white/50">Sealed piping hot in thermal boxes</p>
              </div>
              <div className="space-y-1">
                <span className="h-2 w-2 rounded-full bg-secondary inline-block mb-1" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Reliable.</h4>
                <p className="text-[10px] text-white/50">Trusted drivers with real tracking</p>
              </div>
            </div>

            {/* Ordering CTA triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              {/* WhatsApp Trigger (slides cart open) */}
              <motion.button
                id="delivery-whatsapp-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDelivery}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-widest uppercase px-8 py-4 shadow transition-all cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Order</span>
              </motion.button>

              {/* Call Now Trigger */}
              <motion.a
                id="delivery-call-btn"
                href="tel:+263783157174"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm tracking-widest uppercase px-8 py-3.5 backdrop-blur-sm transition-all"
              >
                <Phone size={16} className="text-secondary" />
                <span>Call to Order</span>
              </motion.a>
            </div>
          </div>

          {/* Graphical delivery representation (Right Column) */}
          <div className="relative flex justify-center">
            <motion.div
              id="delivery-badge-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-sm w-full space-y-6 shadow-2xl"
            >
              <h3 className="font-serif-display text-lg font-bold text-secondary text-center uppercase tracking-widest border-b border-white/10 pb-3">
                How It Works
              </h3>

              <div className="space-y-4">
                {[
                  { icon: <Zap className="text-secondary" size={18} />, label: '1. Build Your Cart', text: 'Select traditional stews or grilled meals and hit Checkout.' },
                  { icon: <MessageSquare className="text-secondary" size={18} />, label: '2. Ping WhatsApp', text: 'We convert your list into an instant structured message.' },
                  { icon: <Truck className="text-secondary" size={18} />, label: '3. Hot Dispatch', text: 'Our drivers ride to Avondale, Belgravia, Mt Pleasant, or Borrowdale.' },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-left">
                    <div className="p-2 rounded bg-white/5 text-white h-fit mt-0.5">{step.icon}</div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.label}</h4>
                      <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
