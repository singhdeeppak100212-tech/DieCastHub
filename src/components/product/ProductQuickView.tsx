import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductQuickView: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo 
  } = useStore();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateTo('product', product.id);
  };

  return (
    <AnimatePresence>
      <div 
        id="quick-view-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={closeQuickView}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-[#12151c] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-[#0c0d12] flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800/80">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/50 border border-neutral-800 mb-4">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isRare && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-black font-extrabold text-xs px-2.5 py-0.5 rounded shadow">
                    RARE COLLECTIBLE
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-neutral-900/90 text-white font-mono text-xs px-2 py-0.5 rounded border border-neutral-700">
                  Scale: {product.specs.scale}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImgIdx === idx ? 'border-rose-500' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800/70 text-xs text-neutral-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  Genuine Die-Cast Metal
                </span>
                <span className="font-mono text-neutral-500">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="text-neutral-600 text-xs">•</span>
                  <span className="text-xs text-neutral-400">{product.series}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-neutral-500 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                  <span className="text-neutral-600">•</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Sold Out'}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-neutral-500 line-through font-mono">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-neutral-300 line-clamp-3 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Quick Specs Highlight */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                  <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Material</span>
                    <span className="text-neutral-200 font-medium truncate block">{product.specs.material}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Opening Parts</span>
                    <span className="text-neutral-200 font-medium truncate block">{product.specs.openingParts}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Tires</span>
                    <span className="text-neutral-200 font-medium truncate block">{product.specs.tires}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Packaging</span>
                    <span className="text-neutral-200 font-medium truncate block">{product.specs.packaging}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-neutral-800/80">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold font-mono text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-950/40"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart • ${(product.price * quantity).toFixed(2)}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isLiked 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' 
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-700'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleViewFullDetails}
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  View Full Specifications & Collector Gallery
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
