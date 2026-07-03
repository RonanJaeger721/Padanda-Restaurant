import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Send, Phone, MapPin, Truck, Sparkles, CheckCircle } from 'lucide-react';
import { MenuItem } from '../types';
import { menuItems } from '../data/restaurantData';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
  onAddQuickItem: (item: MenuItem) => void;
}

export default function DeliveryModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
  onAddQuickItem,
}: DeliveryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    suburb: 'Avondale',
    instructions: '',
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderType, setOrderType] = useState<'whatsapp' | 'call' | null>(null);

  // Suburbs list in Harare for authentic location picking
  const suburbs = [
    'Avondale',
    'Avondale West',
    'Kensington',
    'Belgravia',
    'Milton Park',
    'Alexandra Park',
    'Mount Pleasant',
    'Emerald Hill',
    'Arundel',
    'CBD',
    'Borrowdale',
    'Eastlea',
    'Marlborough',
  ];

  const subtotal = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.menuItem.price.replace('$', ''));
    return acc + priceNum * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 3.00 : 0;
  const total = subtotal + deliveryFee;

  const handleOrder = (type: 'whatsapp' | 'call') => {
    if (cart.length === 0) return;
    setOrderType(type);

    // Format the order details for WhatsApp or Call
    const itemsText = cart
      .map((item) => `• ${item.quantity}x ${item.menuItem.name} (${item.menuItem.price} each)`)
      .join('\n');

    const totalText = `$${total.toFixed(2)}`;
    const messageText = `*NEW PADANDA DELIVERY ORDER* 🍲⚡\n\n` +
      `*Customer:* ${formData.name || 'Valued Guest'}\n` +
      `*Phone:* ${formData.phone || 'Provided'}\n` +
      `*Address:* ${formData.address}, ${formData.suburb}, Harare\n` +
      `${formData.instructions ? `*Note:* ${formData.instructions}\n` : ''}\n` +
      `*Items Ordered:*\n${itemsText}\n\n` +
      `*Subtotal:* $${subtotal.toFixed(2)}\n` +
      `*Delivery Fee:* $${deliveryFee.toFixed(2)}\n` +
      `*GRAND TOTAL:* ${totalText}\n\n` +
      `_Please confirm my order and send payment details. Paid at Padanda._`;

    // Hotlines: Primary +263 783 157174, Alternative +263 717 818658
    const cleanPhone = '263783157174';
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

    if (type === 'whatsapp') {
      window.open(whatsappUrl, '_blank');
    } else {
      window.open('tel:+263783157174', '_self');
    }

    // Persist order to local storage for realistic history
    const orders = JSON.parse(localStorage.getItem('padanda_orders') || '[]');
    orders.push({
      id: 'ord-' + Math.random().toString(36).substr(2, 9),
      customer: formData,
      items: cart.map(i => ({ name: i.menuItem.name, qty: i.quantity, price: i.menuItem.price })),
      total: totalText,
      type,
      created_at: new Date().toISOString()
    });
    localStorage.setItem('padanda_orders', JSON.stringify(orders));

    setIsOrdered(true);
  };

  const handleReset = () => {
    onClearCart();
    setFormData({
      name: '',
      phone: '',
      address: '',
      suburb: 'Avondale',
      instructions: '',
    });
    setIsOrdered(false);
    onClose();
  };

  if (!isOpen) return null;

  // Let's get some recommended items for quick adding if cart is empty or light
  const popularTraditional = menuItems.filter((i) => i.isPopular).slice(0, 3);

  return (
    <AnimatePresence>
      <div id="delivery-modal" className="fixed inset-0 z-50 flex items-center justify-end">
        {/* Backdrop */}
        <motion.div
          id="delivery-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Sidebar Cart Drawer */}
        <motion.div
          id="delivery-drawer-container"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-md h-full bg-[#FAFAF8] dark:bg-forest-dark p-6 shadow-2xl border-l border-secondary/20 dark:border-primary/30 z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-primary/20 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-secondary" size={24} />
              <h3 className="font-serif-display text-xl font-bold text-primary dark:text-accent">
                Your Padanda Cart
              </h3>
            </div>
            <button
              id="close-delivery-modal"
              onClick={onClose}
              className="rounded-full p-2 text-dark-text/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {!isOrdered ? (
            <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin">
              {cart.length === 0 ? (
                /* Empty Cart State */
                <div id="empty-cart-view" className="text-center py-12 space-y-4">
                  <div className="mx-auto h-16 w-16 bg-primary/5 rounded-full flex items-center justify-center text-primary/40 dark:text-accent/30 dark:bg-white/5">
                    <ShoppingBag size={32} />
                  </div>
                  <h4 className="font-serif-display text-lg font-bold text-dark-text dark:text-white">Your Cart is Empty</h4>
                  <p className="text-xs text-dark-text/60 dark:text-white/60 max-w-xs mx-auto">
                    Add our authentic Zimbabwean traditional dishes to experience the true taste of home delivered hot.
                  </p>

                  <div className="text-left border-t border-gray-200 dark:border-primary/15 pt-6 mt-6">
                    <h5 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Popular Dishes Today</h5>
                    <div className="space-y-3">
                      {popularTraditional.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-forest-dark border border-gray-100 dark:border-primary/10 hover:border-secondary/40 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-dark-text dark:text-white">{item.name}</p>
                              <p className="text-[11px] text-primary dark:text-accent font-medium">{item.price}</p>
                            </div>
                          </div>
                          <button
                            id={`add-quick-${item.id}`}
                            onClick={() => onAddQuickItem(item)}
                            className="p-1 rounded bg-secondary/10 hover:bg-secondary/20 text-secondary transition-colors cursor-pointer"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Cart Items List */
                <div id="cart-items-list" className="space-y-3">
                  <h4 className="text-xs font-bold text-primary dark:text-accent uppercase tracking-wider">Items in Cart</h4>
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-forest-dark border border-gray-100 dark:border-primary/10 shadow-sm"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-dark-text dark:text-white truncate">{item.menuItem.name}</h5>
                        <p className="text-[11px] text-secondary font-semibold mt-0.5">{item.menuItem.price}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-gray-200 dark:border-primary/30 rounded bg-gray-50 dark:bg-forest-dark">
                            <button
                              id={`decrease-qty-${item.menuItem.id}`}
                              onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                              className="p-1 text-dark-text/60 dark:text-white/60 hover:text-red-500 transition-colors cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-dark-text dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              id={`increase-qty-${item.menuItem.id}`}
                              onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                              className="p-1 text-dark-text/60 dark:text-white/60 hover:text-primary transition-colors cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-primary dark:text-accent">
                            ${(parseFloat(item.menuItem.price.replace('$', '')) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery Details Form */}
              {cart.length > 0 && (
                <form id="delivery-info-form" className="border-t border-gray-200 dark:border-primary/15 pt-5 space-y-3">
                  <h4 className="text-xs font-bold text-primary dark:text-accent uppercase tracking-wider mb-2">Delivery Location</h4>
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-dark-text/70 dark:text-white/70">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra Ndlovu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-xs text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-dark-text/70 dark:text-white/70">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +263 783 157174"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-xs text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>

                  {/* Harare Suburb Picker */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-dark-text/70 dark:text-white/70">Harare Suburb</label>
                      <select
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-xs text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                      >
                        {suburbs.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    {/* Street Address */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-dark-text/70 dark:text-white/70">Street Address</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 15 Connaught Road"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-xs text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-dark-text/70 dark:text-white/70">Delivery Instructions / Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Ring gate bell, house behind the big mango tree..."
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-primary/40 bg-white dark:bg-forest-dark px-3 py-2 text-xs text-dark-text dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Success Order View */
            <motion.div
              id="order-success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8"
            >
              <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center text-primary dark:bg-white/10 dark:text-secondary mb-4">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-primary dark:text-accent mb-2">Order Dispatched!</h3>
              <p className="text-xs text-dark-text/70 dark:text-white/70 max-w-xs mb-6">
                Your delivery request has been successfully processed via <span className="font-bold uppercase text-secondary">{orderType}</span>.
              </p>

              <div className="bg-primary/5 dark:bg-forest-dark rounded-xl p-4 text-left border border-primary/10 w-full max-w-xs space-y-2 text-xs text-dark-text/85 dark:text-white/85 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Delivery Suburb:</span>
                  <span className="text-secondary">{formData.suburb}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Grand Total:</span>
                  <span className="text-primary dark:text-accent">${total.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-dark-text/50 dark:text-white/50 text-center border-t border-gray-200 dark:border-primary/20 pt-2 mt-2">
                  We are preparing your meal now. Normal delivery time to {formData.suburb} is 25-45 minutes. Enjoy!
                </p>
              </div>

              <button
                id="done-order"
                onClick={handleReset}
                className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow hover:bg-[#222222] transition-colors cursor-pointer"
              >
                Clear & Back to Home
              </button>
            </motion.div>
          )}

          {/* Checkout Totals & Buttons */}
          {cart.length > 0 && !isOrdered && (
            <div className="border-t border-gray-200 dark:border-primary/15 pt-4 space-y-4">
              <div className="space-y-1.5 text-xs text-dark-text/80 dark:text-white/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck size={14} className="text-secondary" /> Delivery Fee
                  </span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary dark:text-accent border-t border-gray-200 dark:border-primary/15 pt-2 mt-1">
                  <span>Grand Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* WhatsApp button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!formData.name || !formData.address || !formData.phone}
                  onClick={() => handleOrder('whatsapp')}
                  className="rounded-lg bg-emerald-600 disabled:bg-emerald-600/50 disabled:cursor-not-allowed hover:bg-emerald-700 text-white font-bold py-3 px-2 text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Send size={14} />
                  <span>WhatsApp Order</span>
                </motion.button>

                {/* Call button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!formData.name || !formData.address || !formData.phone}
                  onClick={() => handleOrder('call')}
                  className="rounded-lg bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-[#16382b] text-white font-bold py-3 px-2 text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Phone size={14} />
                  <span>Call to Order</span>
                </motion.button>
              </div>

              {(!formData.name || !formData.address || !formData.phone) && (
                <p className="text-[10px] text-red-500 font-semibold text-center mt-1">
                  * Please fill in Name, Phone & Address to proceed.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
