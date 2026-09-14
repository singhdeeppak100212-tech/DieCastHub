import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  PackageCheck,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal,
    activeCoupon,
    shippingProtection,
    setShippingProtection,
    createOrder,
    navigateTo,
    showToast,
    user
  } = useStore();

  // Checkout Step: 1: Details & Shipping, 2: Payment, 3: Confirmation
  const [step, setStep] = useState<1 | 2>(1);

  // Form States
  const [email, setEmail] = useState(user?.email || 'collector@speedhub.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Vance');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [apartment, setApartment] = useState('Suite 4B');
  const [city, setCity] = useState('Portland');
  const [state, setState] = useState('OR');
  const [zip, setZip] = useState('97201');
  const [country, setCountry] = useState('United States');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'vault'>('vault');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Confirmation state
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Calculate dynamic shipping cost
  const shippingCost = (() => {
    if (shippingMethod === 'standard') {
      return cartSubtotal >= 75 ? 0 : 7.95;
    }
    if (shippingMethod === 'express') {
      return 14.95;
    }
    if (shippingMethod === 'vault') {
      return 18.95; // Collector Vault Priority with extra heavy shock shielding
    }
    return 0;
  })();

  const tax = (cartSubtotal - cartDiscount) * 0.07;
  const protectionCost = shippingProtection ? 2.95 : 0;
  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost + tax + protectionCost);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !address || !city || !zip) {
      showToast('Please fill in all required shipping fields.', 'warning');
      return;
    }

    const order = createOrder({
      shippingAddress: {
        fullName: `${firstName} ${lastName}`,
        address,
        apartment,
        city,
        state,
        zip,
        country
      },
      paymentMethod,
      shippingMethod
    });

    setConfirmedOrderId(order.id);
    setTrackingNumber(order.trackingNumber);
    showToast('Collector order placed successfully!', 'success');
  };

  const handleCopyTracking = () => {
    if (navigator.clipboard && trackingNumber) {
      navigator.clipboard.writeText(trackingNumber);
      setCopiedTracking(true);
      showToast('Tracking number copied to clipboard!', 'success');
      setTimeout(() => setCopiedTracking(false), 2500);
    }
  };

  // If order is already placed, render confirmation screen
  if (confirmedOrderId) {
    return (
      <div id="order-confirmation-screen" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-16 px-4">
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#11141d] border border-neutral-800 p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
            <PackageCheck className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            Payment Confirmed • In Vault Fulfillment
          </span>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-white mt-4 mb-2">
            Order Dispatched to Vault
          </h1>

          <p className="text-sm text-neutral-300 max-w-md mx-auto mb-8 leading-relaxed">
            Thank you, {firstName}. Your collectible models are currently undergoing climate-controlled inspection and shock-armor packing.
          </p>

          {/* Tracking Box */}
          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-neutral-800 mb-8 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Order ID:</span>
              <span className="text-xs font-mono font-bold text-white">{confirmedOrderId}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Assigned Insured Tracking:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  {trackingNumber}
                </span>
                <button
                  onClick={handleCopyTracking}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  title="Copy tracking"
                >
                  {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Shipping Standard:</span>
              <span className="text-xs font-bold text-neutral-200 uppercase">
                {shippingMethod === 'vault' ? 'Collector Vault Priority (Reinforced)' : shippingMethod}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
              <span className="text-xs text-neutral-400">Total Billed:</span>
              <span className="text-sm font-mono font-bold text-white">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('order-tracking')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-950/50 transition-all"
            >
              Track Package Live
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-semibold text-sm border border-neutral-700 transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Encrypted Vault Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step Indicators */}
            <div className="flex items-center gap-4 border-b border-neutral-800 pb-4 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 ${
                  step === 1 ? 'text-rose-500' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] ${
                  step === 1 ? 'bg-rose-600 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  1
                </span>
                <span>Shipping &amp; Delivery</span>
              </button>

              <span className="text-neutral-700">/</span>

              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 ${
                  step === 2 ? 'text-rose-500' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] ${
                  step === 2 ? 'bg-rose-600 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  2
                </span>
                <span>Payment Method</span>
              </button>
            </div>

            {/* STEP 1: Shipping & Delivery */}
            {step === 1 && (
              <div className="space-y-6">
                
                {/* Contact Information */}
                <div>
                  <h2 className="font-display font-bold text-base text-white mb-3">
                    Contact Information
                  </h2>
                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">
                      Collector Email Address (for tracking &amp; invoice)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className="font-display font-bold text-base text-white">
                    Vault Shipping Address
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">State / Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method Selector */}
                <div className="space-y-3 pt-2">
                  <h2 className="font-display font-bold text-base text-white">
                    Shipping Method
                  </h2>

                  {/* Standard */}
                  <label 
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'bg-neutral-900 border-rose-500 ring-1 ring-rose-500/30'
                        : 'bg-[#10131a] border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-rose-500"
                      />
                      <div>
                        <span className="font-bold text-white text-sm block">Standard Insured Ground</span>
                        <span className="text-xs text-neutral-400">3-5 business days • Hand-wrapped in foam</span>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-white">
                      {cartSubtotal >= 75 ? 'FREE' : '$7.95'}
                    </span>
                  </label>

                  {/* Express */}
                  <label 
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'bg-neutral-900 border-rose-500 ring-1 ring-rose-500/30'
                        : 'bg-[#10131a] border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-rose-500"
                      />
                      <div>
                        <span className="font-bold text-white text-sm block">Express Air Dispatch</span>
                        <span className="text-xs text-neutral-400">1-2 business days • Fast flight courier</span>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-white">$14.95</span>
                  </label>

                  {/* Collector Vault Priority */}
                  <label 
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'vault'
                        ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/30'
                        : 'bg-[#10131a] border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'vault'}
                        onChange={() => setShippingMethod('vault')}
                        className="accent-amber-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">Collector Vault Priority</span>
                          <span className="text-[10px] font-bold uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded">
                            Recommended
                          </span>
                        </div>
                        <span className="text-xs text-neutral-400">
                          Extra thick shock armor, reinforced acrylic protectors, priority courier handling
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-300">$18.95</span>
                  </label>
                </div>

                {/* Continue to Payment Button */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

            {/* STEP 2: Payment Methods */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                
                <div>
                  <h2 className="font-display font-bold text-base text-white mb-3">
                    Select Payment Method
                  </h2>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-rose-600/20 border-rose-500 text-white'
                          : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === 'paypal'
                          ? 'bg-rose-600/20 border-rose-500 text-white'
                          : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="font-display font-black text-sm text-sky-400">PayPal</span>
                      <span>PayPal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === 'applepay'
                          ? 'bg-rose-600/20 border-rose-500 text-white'
                          : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="font-display font-bold text-sm text-white"> Pay</span>
                      <span>Apple Pay</span>
                    </button>
                  </div>

                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="p-5 rounded-2xl bg-[#10131a] border border-neutral-800 space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-neutral-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full px-4 py-2.5 text-sm font-mono rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-neutral-400 block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2.5 text-sm font-mono rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-neutral-400 block mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="123"
                            className="w-full px-4 py-2.5 text-sm font-mono rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-6 rounded-2xl bg-[#10131a] border border-neutral-800 text-center text-xs text-neutral-400 space-y-3">
                      <p>You will be redirected to PayPal sandbox to authorize your collector purchase safely.</p>
                      <div className="font-bold text-white text-sm">One-click instant approval available</div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="p-6 rounded-2xl bg-[#10131a] border border-neutral-800 text-center text-xs text-neutral-400 space-y-3">
                      <p>Authenticate with Touch ID or Face ID on your compatible Apple device.</p>
                      <div className="font-bold text-white text-sm">Instant biometric authorization</div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-bold text-xs border border-neutral-800"
                  >
                    Back to Shipping
                  </button>

                  <button
                    type="submit"
                    className="w-2/3 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm tracking-wider uppercase transition-all shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize &amp; Place Order • ${finalTotal.toFixed(2)}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#11141c] border border-neutral-800 shadow-2xl space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="font-display font-bold text-base text-white">
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
                </h3>
                <button
                  onClick={() => navigateTo('cart')}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Edit Cart
                </button>
              </div>

              {/* Thumbnails list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-12 rounded-lg bg-black overflow-hidden shrink-0 border border-neutral-800">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {item.product.brand} • {item.product.specs.scale}
                      </span>
                    </div>

                    <div className="font-mono text-xs font-bold text-white shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="pt-4 border-t border-neutral-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${cartSubtotal.toFixed(2)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon ({activeCoupon?.code})</span>
                    <span className="font-mono">-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Shipping ({shippingMethod})</span>
                  <span className="font-mono text-white">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                {shippingProtection && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Armor Transit Protection</span>
                    <span className="font-mono text-white">$2.95</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (7%)</span>
                  <span className="font-mono text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-white">Total Amount</span>
                  <span className="font-display font-black text-2xl text-rose-400 font-mono">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>The DieCastHub Authenticity Promise</span>
                </div>
                <p className="leading-relaxed">
                  Every scale car is dispatched from our climate-controlled vault in museum-condition packaging. 100% genuine guaranteed.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
