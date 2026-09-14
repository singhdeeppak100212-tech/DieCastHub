import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  Package, 
  Send, 
  Check, 
  Instagram, 
  Youtube, 
  Mail, 
  ArrowUpRight,
  Sparkles,
  Phone,
  HelpCircle,
  Clock,
  RotateCcw
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setFilters, showToast, applyCoupon } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ title: string; content: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please provide a valid collector email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Collector Club! Use code COLLECTOR10 for 10% off.', 'success');
  };

  const openPolicy = (type: string) => {
    const policies: Record<string, { title: string; content: string }> = {
      shipping: {
        title: 'Insured Collector Shipping Policy',
        content: `All DieCastHub orders are hand-inspected under high-lumen studio lights before fulfillment. Every model is protected using custom double-bubble shock wrapping, rigid reinforced corner shields, and tamper-evident holographic tape. We guarantee 0% box crease on delivery. Standard domestic shipping arrives in 3-5 business days, with Collector Vault Priority arriving in 2-3 business days. Free shipping applies automatically to all orders over $75.`
      },
      return: {
        title: '30-Day Collector Return Policy',
        content: `We honor a 30-day return policy for unopened items in original factory condition with intact blister seals and undamaged acrylic display cases. For serialized/limited run models, matching authentication cards and certificates must be included. If an item arrives with manufacturer defects, our team will provide an immediate identical replacement or full refund.`
      },
      privacy: {
        title: 'Privacy & Collector Data Security',
        content: `DieCastHub respects collector privacy. We never sell, rent, or trade customer information. Payment transactions are processed through tokenized, PCI-DSS Level 1 compliant gateway endpoints. Your collection records, addresses, and order history are securely safeguarded.`
      },
      terms: {
        title: 'Terms of Service',
        content: `By purchasing from DieCastHub, collectors agree to our genuine merchandise authenticity standards. Limited edition models with production allocations are restricted to specified per-household limits during drop launches to ensure fair access for authentic hobbyists and enthusiasts.`
      },
      faq: {
        title: 'Collector Frequently Asked Questions',
        content: `Q: Are all models genuine?\nA: Yes, 100% genuine die-cast models licensed directly from Kaido House, Mini GT, Inno64, Hot Wheels RLC, AutoArt, Spark, and Tarmac Works.\n\nQ: What scales do you stock?\nA: We primarily specialize in 1:64 precision collector scale, 1:43 European track/heritage, and 1:18 heavyweight display models.\n\nQ: How do you package fragile wings and antennas?\nA: We use custom high-density pre-cut foam inserts inside rigid presentation boxes to ensure side-mirrors and delicate wings arrive in showroom condition.`
      },
      about: {
        title: 'About DieCastHub',
        content: `Founded by lifelong petrolheads and die-cast collectors, DieCastHub was created to fill the void between generic big-box toy aisles and shady auction resales. We curate only authentic, high-fidelity model cars for discerning adult collectors, track enthusiasts, and thoughtful gift givers.`
      }
    };

    if (policies[type]) {
      setPolicyModal(policies[type]);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#090b0f] border-t border-neutral-800 text-neutral-400">
      {/* Policy Modal */}
      {policyModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setPolicyModal(null)}
        >
          <div 
            className="bg-[#12151d] border border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-xl text-white mb-3">
              {policyModal.title}
            </h3>
            <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto pr-2">
              {policyModal.content}
            </div>
            <button
              onClick={() => setPolicyModal(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 flex items-center justify-center">
                <span className="font-display font-black text-white text-base">
                  D<span className="text-rose-500">C</span>H
                </span>
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                DieCast<span className="text-rose-500">Hub</span>
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The premier marketplace for genuine die-cast collectible model cars. Curated for automotive enthusiasts, scale model collectors, and motorsport connoisseurs worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3 text-neutral-400">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-rose-600 hover:text-white border border-neutral-800 transition-colors"
                aria-label="DieCastHub Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-rose-600 hover:text-white border border-neutral-800 transition-colors"
                aria-label="DieCastHub YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="mailto:concierge@diecasthub.com" 
                className="p-2 rounded-xl bg-neutral-900 hover:bg-rose-600 hover:text-white border border-neutral-800 transition-colors"
                aria-label="Email concierge"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Explore Vault
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => { setFilters(p => ({ ...p, category: 'jdm' })); navigateTo('shop'); }}
                  className="hover:text-rose-400 transition-colors"
                >
                  JDM Tuner Legends
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilters(p => ({ ...p, category: 'supercars' })); navigateTo('shop'); }}
                  className="hover:text-rose-400 transition-colors"
                >
                  Supercars & Hypercars
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilters(p => ({ ...p, category: 'rare-finds' })); navigateTo('shop'); }}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Rare & RLC Exclusives</span>
                  <span className="text-[9px] px-1 bg-amber-500/20 text-amber-400 rounded font-bold">VIP</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilters(p => ({ ...p, scale: '1:64' })); navigateTo('shop'); }}
                  className="hover:text-rose-400 transition-colors"
                >
                  1:64 Scale Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setFilters(p => ({ ...p, scale: '1:18' })); navigateTo('shop'); }}
                  className="hover:text-rose-400 transition-colors"
                >
                  1:18 Grand Scale Display
                </button>
              </li>
            </ul>
          </div>

          {/* Collector Support */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Collector Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => openPolicy('about')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  About DieCastHub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('order-tracking')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Track Your Package
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('shipping')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Collector Shipping & Packing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('return')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  30-Day Return Guarantee
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('faq')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Collector Club Signup */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Collector Club
            </h4>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Get notified first on limited serialized runs, chase variants, and secret discount codes.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are in! Code: <strong>COLLECTOR10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter collector email..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  Join Club & Get 10% Off
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500">
              Direct inquiries: concierge@diecasthub.com
            </div>
          </div>

        </div>

        {/* Bottom Bar with Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} DieCastHub Inc. All rights reserved. Built for true automotive collectors.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => openPolicy('privacy')} className="hover:text-neutral-300">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('terms')} className="hover:text-neutral-300">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('shipping')} className="hover:text-neutral-300">
              Shipping Policy
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('return')} className="hover:text-neutral-300">
              Return Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
