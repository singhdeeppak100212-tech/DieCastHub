import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Truck, 
  Headphones, 
  Sparkles, 
  Flame, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  Award,
  Layers,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    categories, 
    reviews, 
    navigateTo, 
    setFilters, 
    showToast 
  } = useStore();

  const [clubEmail, setClubEmail] = useState('');
  const [clubJoined, setClubJoined] = useState(false);

  // Best Sellers (high rating & review count)
  const bestSellers = products
    .filter((p) => p.rating >= 4.8)
    .slice(0, 4);

  // New Arrivals
  const newArrivals = products
    .filter((p) => p.isNew)
    .slice(0, 4);

  // Rare Finds
  const rareFinds = products
    .filter((p) => p.isRare || p.isLimited)
    .slice(0, 3);

  const handleCategoryClick = (categorySlug: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categorySlug,
      sortBy: 'featured',
    }));
    navigateTo('shop');
  };

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubEmail || !clubEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setClubJoined(true);
    showToast('Welcome to the DieCastHub Collector Club! Coupon: COLLECTOR10', 'success');
  };

  return (
    <div id="home-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB]">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-800/80">
        {/* Cinematic Backdrop with Radial Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
            alt="Collector Die-Cast Car"
            className="w-full h-full object-cover object-center opacity-30 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/70 to-black/40" />
          <div className="absolute inset-0 carbon-grid opacity-25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          
          {/* Eyebrow / Provenance Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-neutral-300 text-xs font-semibold backdrop-blur-md mb-6 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>AUTHENTIC COLLECTIBLE DIE-CAST REPLICAS</span>
            <span className="text-neutral-500">•</span>
            <span className="text-amber-400 font-mono">1:64 / 1:43 / 1:18</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase max-w-5xl mx-auto leading-[0.95]"
          >
            BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-rose-500">COLLECTION.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Premium Die-Cast Cars for Every Collector.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mt-2"
          >
            Hand-curated metal-on-metal castings, real rubber tires, serialized vault grails, and tamper-proof collector packaging.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <button
              onClick={() => {
                setFilters((p) => ({ ...p, category: 'all' }));
                navigateTo('shop');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-rose-950/50 hover:shadow-rose-600/30 flex items-center justify-center gap-2 group"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setFilters((p) => ({ ...p, category: 'all', sortBy: 'newest' }));
                navigateTo('shop');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-sm tracking-wide border border-neutral-700/80 transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <span>Explore New Arrivals</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-14 pt-8 border-t border-neutral-800/60 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-rose-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">100% Genuine</div>
                <div className="text-[11px] text-neutral-400">Direct licensed models</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-rose-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Armor Packaging</div>
                <div className="text-[11px] text-neutral-400">Zero-crease guarantee</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-rose-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Fast Courier</div>
                <div className="text-[11px] text-neutral-400">Free delivery over $75</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-rose-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Vault Grails</div>
                <div className="text-[11px] text-neutral-400">Serialized certificates</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Explore By Category
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((p) => ({ ...p, category: 'all' }));
              navigateTo('shop');
            }}
            className="mt-4 md:mt-0 text-sm font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out brightness-75 group-hover:brightness-90"
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Badge if available */}
              {cat.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900/90 text-rose-400 border border-neutral-700 backdrop-blur-md">
                    {cat.badge}
                  </span>
                </div>
              )}

              {/* Category Info */}
              <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end">
                <span className="text-[11px] font-mono text-neutral-400 mb-0.5">
                  {cat.itemCount}+ Models
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-rose-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1.5 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              Collector Favorites
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((p) => ({ ...p, sortBy: 'rating' }));
              navigateTo('shop');
            }}
            className="mt-4 md:mt-0 text-sm font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All Top Rated</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. PREMIUM PROMOTIONAL BANNER ("COLLECT THE ICONS") */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-[#12151d] p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Background image & lighting */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1800&auto=format&fit=crop"
              alt="Premium Die-Cast Showcase"
              className="w-full h-full object-cover object-right opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12151d] via-[#12151d]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Museum Grade
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-4">
              COLLECT THE <span className="text-amber-400">ICONS.</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              Experience unparalleled craftsmanship with our premium line. Featuring heavy diecast chassis, opening hoods with wired engine bays, Real Riders rubber treads, and high-definition tampo sponsor liveries.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setFilters((p) => ({ ...p, category: 'premium' }));
                  navigateTo('shop');
                }}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-amber-950/40 flex items-center gap-2"
              >
                <span>Explore Premium</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setFilters((p) => ({ ...p, scale: '1:18' }));
                  navigateTo('shop');
                }}
                className="px-6 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-white font-bold text-sm border border-neutral-700/80 transition-colors"
              >
                1:18 Master Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Fresh Off The Factory Floor
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((p) => ({ ...p, sortBy: 'newest' }));
              navigateTo('shop');
            }}
            className="mt-4 md:mt-0 text-sm font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All New Releases</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. RARE FINDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 bg-neutral-950/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Serialized Vault Pieces
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Rare Finds &amp; Limited Runs
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Strictly allocated production pieces with certificates of authenticity and acrylic display pedestals.
            </p>
          </div>
          <button
            onClick={() => {
              setFilters((p) => ({ ...p, category: 'rare-finds' }));
              navigateTo('shop');
            }}
            className="mt-4 md:mt-0 text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Browse Vault Grails</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rareFinds.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHY DIECASTHUB? (Four Feature Cards) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            The Collector Standard
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Why DieCastHub?
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            We are not a toy aisle. We are an authentic scale automotive gallery designed to protect and honor your investment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Genuine Products */}
          <div className="p-6 rounded-2xl bg-[#11141b] border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Genuine Products
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every casting is sourced directly from certified manufacturers: Mini GT, Inno64, Kaido House, AutoArt, and Spark. 100% authentic licensing guaranteed.
            </p>
          </div>

          {/* 2. Secure Packaging */}
          <div className="p-6 rounded-2xl bg-[#11141b] border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Secure Packaging
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Double-bubble wrapping, reinforced corner guards, and rigid crush-proof shipping boxes. No bent card hooks or cracked blister bubbles on delivery.
            </p>
          </div>

          {/* 3. Fast Shipping */}
          <div className="p-6 rounded-2xl bg-[#11141b] border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Fast Shipping
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Same-day order dispatch from our climate-controlled vault warehouse. Track your parcel at every junction until signed safe at your door.
            </p>
          </div>

          {/* 4. Collector-Friendly Support */}
          <div className="p-6 rounded-2xl bg-[#11141b] border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Collector-Friendly Support
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Staffed by avid diecast enthusiasts who understand card quality, paint variants, and chase pieces. We speak your scale language.
            </p>
          </div>

        </div>
      </section>

      {/* 8. COLLECTOR CLUB (Newsletter Section) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#131722] via-[#0f1219] to-black border border-neutral-800 p-8 sm:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 carbon-grid opacity-15" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Private Dispatch
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
              JOIN THE DIECASTHUB COLLECTOR CLUB
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base mb-8 max-w-lg mx-auto">
              Get notified about new arrivals, rare finds and exclusive offers before public drops.
            </p>

            {clubJoined ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 text-sm max-w-md mx-auto flex items-center justify-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You are on the VIP drop list! Use code <strong className="text-white font-mono">COLLECTOR10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleClubSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={clubEmail}
                  onChange={(e) => setClubEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full sm:flex-1 px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <p className="text-[11px] text-neutral-500 mt-4">
              Zero spam. Unsubscribe at any time with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER REVIEWS (Testimonial Section with Star Ratings) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2 flex items-center justify-center gap-1.5">
            <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
            Verified Collector Feedback
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Loved By Serious Collectors
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Read unedited reviews from fellow enthusiasts who trust DieCastHub for their display garages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#11141b] border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <h4 className="font-bold text-sm text-white mb-2 line-clamp-1">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4 mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{rev.author}</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Collector
                  </div>
                </div>
                {rev.scalePurchased && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                    {rev.scalePurchased}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
