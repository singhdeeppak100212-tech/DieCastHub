import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    products, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal,
    shippingProtection,
    setShippingProtection,
    navigateTo,
    addToCart
  } = useStore();

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Recommended products not already in cart
  const cartIds = cart.map((i) => i.product.id);
  const recommendations = products.filter((p) => !cartIds.includes(p.id)).slice(0, 3);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewCartPage = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="cart-drawer-backdrop"
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-y-0 right-0 max-w-md w-full bg-[#10131a] border-l border-neutral-800 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="font-display font-bold text-lg text-white tracking-tight">
                Collector Cart
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-neutral-900/60 px-5 py-3 border-b border-neutral-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300 flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-emerald-400" />
                {remainingForFreeShipping > 0 ? (
                  <span>Add <strong className="text-white">${remainingForFreeShipping.toFixed(2)}</strong> more for FREE shipping</span>
                ) : (
                  <span className="text-emerald-400 font-bold">You unlocked FREE Insured Shipping!</span>
                )}
              </span>
              <span className="font-mono text-neutral-400">{progressToFreeShipping.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Your collector cart is empty</h3>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
                  Discover rare JDM icons, Formula and Le Mans legends, or RLC exclusives to build your display garage.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold transition-all shadow-lg"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700/80 transition-colors"
                    >
                      <div 
                        className="w-20 h-16 rounded-lg bg-black overflow-hidden shrink-0 border border-neutral-800 cursor-pointer"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('product', item.product.id);
                        }}
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider">
                              {item.product.brand} • {item.product.specs.scale}
                            </div>
                            <h4 
                              onClick={() => {
                                setIsCartOpen(false);
                                navigateTo('product', item.product.id);
                              }}
                              className="text-xs font-bold text-white hover:text-rose-400 transition-colors truncate cursor-pointer"
                            >
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-700 bg-neutral-950 rounded-lg">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-neutral-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-neutral-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-mono font-bold text-white">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-[10px] text-neutral-500 font-mono">
                                ${item.product.price.toFixed(2)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vault Armor Shipping Protection */}
                <div className="p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Collector Vault Armor Protection</div>
                      <div className="text-[10px] text-neutral-400">Guaranteed crease-free packaging + transit loss cover ($2.95)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShippingProtection(!shippingProtection)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      shippingProtection ? 'bg-rose-600' : 'bg-neutral-800'
                    }`}
                  >
                    <span 
                      className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        shippingProtection ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Recommended Add-ons */}
                {recommendations.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Add to your shipment:
                    </div>
                    <div className="space-y-2">
                      {recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={rec.images[0]}
                              alt=""
                              className="w-10 h-8 rounded object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-white truncate">{rec.name}</p>
                              <span className="text-[10px] text-neutral-400 font-mono">${rec.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(rec, 1)}
                            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-bold shrink-0 ml-2"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-[#0c0d12] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-white">
                    {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Estimated Total</span>
                  <span className="font-mono text-lg text-rose-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleViewCartPage}
                  className="w-1/3 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs border border-neutral-800 transition-colors text-center"
                >
                  View Cart
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-2/3 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-neutral-500">
                🔒 Authentic Collector Packaging • Insured Tracking on all orders
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
