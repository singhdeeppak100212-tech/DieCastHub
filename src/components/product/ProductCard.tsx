import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    openQuickView 
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-[#11141c] border border-neutral-800/80 hover:border-neutral-700/90 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-black/70"
    >
      {/* Visual Header / Image Box */}
      <div 
        className="relative w-full aspect-[4/3] bg-[#0c0d12] overflow-hidden cursor-pointer"
        onClick={() => navigateTo('product', product.id)}
      >
        {/* Main Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Metallic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-black/20 opacity-60 pointer-events-none" />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isRare && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-black shadow-lg">
              <Sparkles className="w-3 h-3 fill-black" />
              Rare Vault
            </span>
          )}
          {product.isLimited && product.limitedNumber && (
            <span className="text-[10px] font-mono font-bold tracking-tight px-2 py-0.5 rounded-md bg-neutral-900/90 text-amber-300 border border-amber-500/40 backdrop-blur-sm">
              {product.limitedNumber}
            </span>
          )}
          {product.isNew && !product.isRare && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-lg">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-lg">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Scale Tag & Wishlist (Top Right) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-900/90 text-neutral-200 border border-neutral-700 backdrop-blur-md">
            {product.specs.scale}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isLiked 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                : 'bg-black/40 text-neutral-400 hover:text-white hover:bg-black/70 border border-white/10'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Quick View Floating Action on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-neutral-900/95 hover:bg-neutral-800 text-xs font-semibold text-white border border-neutral-700/80 backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            Quick Inspect
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Series line */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="font-semibold text-rose-400/90 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span className="text-neutral-500 text-[11px] truncate max-w-[130px]">
              {product.series}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateTo('product', product.id)}
            className="font-bold text-white hover:text-rose-400 transition-colors cursor-pointer text-sm sm:text-base line-clamp-2 leading-snug mb-2"
          >
            {product.name}
          </h3>

          {/* Ratings & Authenticity note */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-neutral-500 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-neutral-600 text-xs">•</span>
            <span className="text-[11px] text-neutral-400 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Authentic
            </span>
          </div>
        </div>

        {/* Price & Quick Add */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-white font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-neutral-500 line-through font-mono">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-[10px] text-amber-400 font-medium block">
                Vault Stock: Only {product.stock} left
              </span>
            )}
            {product.stock <= 0 && (
              <span className="text-[10px] text-rose-400 font-semibold block">
                Sold Out
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-rose-600 disabled:bg-neutral-900 disabled:text-neutral-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 group/btn border border-neutral-700/80 hover:border-rose-500"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
