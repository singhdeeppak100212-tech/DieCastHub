import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  ChevronRight,
  ZoomIn,
  MessageSquare,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    reviews, 
    addReview, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    recentlyViewed,
    showToast,
    setIsCartOpen
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'returns' | 'reviews'>('specs');

  // New review form states
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isLiked = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products from the same brand or category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  // Recently viewed products
  const recentProducts = recentlyViewed
    .filter((id) => id !== product.id)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as typeof products;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigateTo('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      showToast('Please fill in your name and comment.', 'warning');
      return;
    }

    addReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Exceptional collector piece',
      comment: reviewComment.trim(),
      verified: true,
      scalePurchased: product.specs.scale
    });

    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    }
  };

  return (
    <div id="product-detail-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">Shop</button>
          <span>/</span>
          <span className="text-neutral-500 uppercase">{product.category}</span>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage with Zoom Lens */}
            <div 
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0e1017] border border-neutral-800 cursor-crosshair group select-none shadow-2xl"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                {product.isRare && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 fill-black" />
                    Vault Grail
                  </span>
                )}
                {product.isLimited && product.limitedNumber && (
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-900/90 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 backdrop-blur-md">
                    {product.limitedNumber}
                  </span>
                )}
              </div>

              {/* Zoom hint indicator */}
              <div className="absolute bottom-4 right-4 pointer-events-none z-10 flex items-center gap-1.5 text-xs text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-white" />
                <span>Hover to inspect paint &amp; engine</span>
              </div>
            </div>

            {/* Thumbnail Selector Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-24 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImgIndex === idx
                      ? 'border-rose-500 ring-2 ring-rose-500/30 shadow-lg'
                      : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-700'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Authenticity Certificate Callout */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Certificate of Authenticity Guaranteed</span>
                  <span>Individually inspected and serialized in climate-controlled collector storage.</span>
                </div>
              </div>
              <button 
                onClick={handleShare}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                title="Share model link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Details & Purchasing Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Brand & Scale Pills */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-500 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-lg">
                    {product.brand}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-300 bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded-lg">
                    Scale {product.specs.scale}
                  </span>
                </div>

                <span className="text-xs font-mono text-neutral-500">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
                {product.name}
              </h1>

              {/* Series and Rating */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="text-neutral-400">
                  Series: <strong className="text-neutral-200">{product.series}</strong>
                </span>
                <span className="text-neutral-600">•</span>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-500 font-normal">({product.reviewCount} collector reviews)</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[#11141b] border border-neutral-800 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-neutral-400 mb-1">Collector Price</div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-black text-3xl sm:text-4xl text-white font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-base text-neutral-500 line-through font-mono">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {product.compareAtPrice && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Save ${(product.compareAtPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  <span className="font-semibold text-white">
                    {product.stock > 0 ? `Ready for dispatch from vault` : 'Sold out in vault'}
                  </span>
                </div>
                <span className="font-mono text-neutral-400">
                  {product.stock > 0 ? `${product.stock} units left` : '0 available'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity and Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-white font-bold text-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-white text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-white font-bold text-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-rose-950/50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isLiked 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' 
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-700'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-950 disabled:text-neutral-700 text-white font-bold text-sm border border-neutral-700 hover:border-neutral-600 transition-all flex items-center justify-center gap-2"
                >
                  <span>Instant Collector Checkout</span>
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                </button>
              </div>

              {/* Guarantees List */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free shipping on orders $75+</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-day unopened returns</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Tabbed Detailed Specifications & Reviews */}
        <div className="mb-20 rounded-3xl bg-[#10131a] border border-neutral-800 overflow-hidden shadow-xl">
          {/* Tab Header */}
          <div className="flex border-b border-neutral-800 overflow-x-auto bg-neutral-950/40">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
                activeTab === 'specs'
                  ? 'border-rose-500 text-white bg-neutral-900/50'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Collector Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
                activeTab === 'shipping'
                  ? 'border-rose-500 text-white bg-neutral-900/50'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Shipping &amp; Armor Packaging
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
                activeTab === 'returns'
                  ? 'border-rose-500 text-white bg-neutral-900/50'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Authenticity Guarantee &amp; Returns
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
                activeTab === 'reviews'
                  ? 'border-rose-500 text-white bg-neutral-900/50'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Collector Reviews ({productReviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-10">
            
            {/* 1. Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="font-display font-bold text-lg text-white mb-4">
                  Die-Cast Model Architecture &amp; Construction
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Scale</span>
                    <span className="font-mono font-bold text-white">{product.specs.scale}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Body &amp; Base Material</span>
                    <span className="font-medium text-white">{product.specs.material}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Chassis</span>
                    <span className="font-medium text-white">{product.specs.chassis}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Wheel &amp; Tire Setup</span>
                    <span className="font-medium text-white">{product.specs.tires}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Opening Features</span>
                    <span className="font-medium text-white">{product.specs.openingParts}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Official Manufacturer</span>
                    <span className="font-medium text-white">{product.specs.manufacturer}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Series Line</span>
                    <span className="font-medium text-white">{product.specs.series}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Release Year</span>
                    <span className="font-mono font-bold text-white">{product.specs.releaseYear}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Presentation Packaging</span>
                    <span className="font-medium text-white">{product.specs.packaging}</span>
                  </div>
                  {product.specs.productionRun && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex justify-between items-center text-sm">
                      <span className="text-amber-300 font-semibold">Production Allocation</span>
                      <span className="font-mono font-bold text-amber-200">{product.specs.productionRun}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. Shipping & Packaging Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-6 max-w-3xl text-sm leading-relaxed text-neutral-300">
                <h3 className="font-display font-bold text-lg text-white">
                  Collector-Armor Packaging Standard
                </h3>
                <p>
                  At DieCastHub, we understand that for serious collectors, the packaging condition is just as valuable as the diecast car inside. 
                  Every shipment follows our rigid 4-step collector protocol:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-rose-500">
                  <li>
                    <strong className="text-white">High-Density Shock Wrap:</strong> Every blister card or acrylic showcase is encased in double-layer anti-static bubble wrap.
                  </li>
                  <li>
                    <strong className="text-white">Reinforced Card Edge Protectors:</strong> Custom molded corner protectors prevent bent peg-hangers and creased card borders.
                  </li>
                  <li>
                    <strong className="text-white">Crush-Proof 200lb Test Corrugated Outer Box:</strong> We never use flimsy poly-mailers or unpadded envelopes.
                  </li>
                  <li>
                    <strong className="text-white">Tamper-Proof Hologram Seal:</strong> Guarantees that the parcel was sealed in our vault and has not been handled in transit.
                  </li>
                </ul>
              </div>
            )}

            {/* 3. Returns & Authenticity Tab */}
            {activeTab === 'returns' && (
              <div className="space-y-6 max-w-3xl text-sm leading-relaxed text-neutral-300">
                <h3 className="font-display font-bold text-lg text-white">
                  Authenticity &amp; 30-Day Collector Return Guarantee
                </h3>
                <p>
                  Every model in our inventory is 100% genuine and sourced directly from licensed brand distributors (TSM Model, Inno-Models, Mattel Creations, Spark).
                </p>
                <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <div className="font-bold text-white">Return Eligibility:</div>
                  <p className="text-xs text-neutral-400">
                    Unopened items in their original factory-sealed condition may be returned within 30 days of delivery. Serialized limited-run cars must include all original documentation, acrylic display pedestals, and tamper-proof hologram seals.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">
                      Verified Collector Reviews
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-white">{product.rating.toFixed(1)} out of 5</span>
                      <span className="text-neutral-500 text-xs">({product.reviewCount} total reviews)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Write a Review
                  </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-700 space-y-4 max-w-xl">
                    <h4 className="font-bold text-white text-sm">Post a Collector Review</h4>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="e.g. Jason K."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">Star Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-700 text-white"
                      >
                        <option value={5}>5 Stars - Flawless Casting &amp; Paint</option>
                        <option value={4}>4 Stars - Great Detailing</option>
                        <option value={3}>3 Stars - Decent</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Stunning tampo work and stance"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">Detailed Feedback</label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Comment on wheel quality, paint finish, packaging..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-400 text-xs hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Review Items */}
                <div className="space-y-4">
                  {productReviews.length > 0 ? (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{rev.author}</span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified Collector
                            </span>
                          </div>
                          <span className="text-xs text-neutral-500">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>

                        <h5 className="font-bold text-sm text-neutral-200">{rev.title}</h5>
                        <p className="text-xs text-neutral-400 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-neutral-500 text-xs">
                      No collector reviews yet for this model. Be the first to review!
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16 border-t border-neutral-800/80 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 block mb-1">
                  Complete The Collection
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  Related Collectibles
                </h3>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <span>View More</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Products */}
        {recentProducts.length > 0 && (
          <section className="border-t border-neutral-800/80 pt-12">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Your Browsing Garage
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                Recently Viewed Models
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
