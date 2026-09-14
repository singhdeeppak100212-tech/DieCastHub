import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  ArrowLeft,
  Plus,
  Minus,
  Check,
  RotateCcw
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    products, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    shippingProtection,
    setShippingProtection,
    navigateTo,
    showToast
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Recommended products not in cart
  const cartIds = cart.map((i) => i.product.id);
  const recommended = products.filter((p) => !cartIds.includes(p.id)).slice(0, 4);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    const res = applyCoupon(couponCodeInput);
    setCouponMsg({ text: res.message, success: res.success });
    if (res.success) {
      setCouponCodeInput('');
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'warning');
    }
  };

  return (
    <div id="full-cart-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Collector Cart
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Review your allocations and verify packaging security before checkout
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#11141c] border border-neutral-800 p-8 max-w-xl mx-auto shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-xl text-white mb-2">
              Your Collector Cart is Empty
            </h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6 leading-relaxed">
              Explore our verified JDM tuners, European road classics, and rare Red Line Club limited editions.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold transition-all shadow-lg shadow-rose-950/40"
            >
              Discover Rare Models
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            
            {/* Left Column: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Meter Banner */}
              <div className="p-4 rounded-2xl bg-[#121620] border border-neutral-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-300 font-medium">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    {remainingForFreeShipping > 0 ? (
                      <span>
                        Add <strong className="text-white">${remainingForFreeShipping.toFixed(2)}</strong> more to unlock <span className="text-emerald-400 font-bold">FREE Vault Insured Shipping</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Qualified for FREE Insured Collector Shipping!
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-neutral-400">{progressToFreeShipping.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="rounded-3xl bg-[#10131a] border border-neutral-800 divide-y divide-neutral-800 overflow-hidden shadow-xl">
                {cart.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-900/30 transition-colors"
                  >
                    {/* Item Image and Description */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div 
                        className="w-24 h-20 rounded-2xl bg-black overflow-hidden shrink-0 border border-neutral-800 cursor-pointer"
                        onClick={() => navigateTo('product', item.product.id)}
                      >
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] mb-0.5">
                          <span className="text-rose-400 font-bold uppercase">{item.product.brand}</span>
                          <span className="text-neutral-500">•</span>
                          <span className="text-neutral-400 font-mono">Scale {item.product.specs.scale}</span>
                        </div>
                        <h3 
                          onClick={() => navigateTo('product', item.product.id)}
                          className="font-bold text-white text-sm sm:text-base hover:text-rose-400 transition-colors cursor-pointer truncate max-w-md"
                        >
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-neutral-500 font-mono mt-0.5">
                          SKU: {item.product.sku}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-xl p-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[80px]">
                        <div className="font-mono font-bold text-base text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-neutral-500 font-mono">
                            ${item.product.price.toFixed(2)} ea
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-neutral-500 hover:text-rose-400 transition-colors"
                        aria-label="Remove item from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-500 hover:text-rose-400 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Entire Cart
                </button>
              </div>

            </div>

            {/* Right Column: Order Summary & Checkout (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-3xl bg-[#11141c] border border-neutral-800 shadow-xl space-y-6">
                <h2 className="font-display font-bold text-lg text-white pb-3 border-b border-neutral-800">
                  Order Summary
                </h2>

                {/* Subtotal, Discount, Shipping Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-white">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount ({activeCoupon?.code})</span>
                      <span className="font-mono">-${cartDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>Estimated Shipping</span>
                    <span className="font-mono font-bold text-white">
                      {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>Estimated Tax (7%)</span>
                    <span className="font-mono">
                      ${(((cartSubtotal - cartDiscount) * 0.07)).toFixed(2)}
                    </span>
                  </div>

                  {/* Vault Armor Shipping Protection Toggle */}
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                      <div>
                        <span className="font-semibold text-white block">Vault Armor Protection</span>
                        <span className="text-[10px] text-neutral-400">Crush-proof &amp; insured ($2.95)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShippingProtection(!shippingProtection)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${
                        shippingProtection ? 'bg-rose-600' : 'bg-neutral-800'
                      }`}
                    >
                      <span 
                        className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                          shippingProtection ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-neutral-800 flex justify-between items-baseline">
                    <span className="font-bold text-base text-white">Estimated Total</span>
                    <span className="font-display font-black text-2xl text-rose-400 font-mono">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-neutral-800">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    Collector Discount Code
                  </label>
                  {activeCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-400" />
                        <span>Code <strong>{activeCoupon.code}</strong> applied!</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-neutral-400 hover:text-white underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCodeInput}
                          onChange={(e) => setCouponCodeInput(e.target.value)}
                          placeholder="Try COLLECTOR10 or FIRST50"
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white uppercase focus:outline-none focus:border-rose-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponMsg && (
                        <p className={`text-xs ${couponMsg.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {couponMsg.text}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Checkout CTA */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigateTo('checkout')}
                    className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigateTo('shop')}
                    className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="text-[11px] text-center text-neutral-500 space-y-1">
                  <p>🔒 256-Bit SSL Encrypted Checkout</p>
                  <p>Authenticated packaging inspection on every piece</p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Recommended Products Below Cart */}
        {recommended.length > 0 && (
          <div className="border-t border-neutral-800/80 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 block mb-1">
                  You Might Also Like
                </span>
                <h2 className="font-display font-black text-2xl text-white">
                  Recommended For Your Collection
                </h2>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-semibold text-neutral-400 hover:text-white"
              >
                View Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
