import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, ShieldCheck, Flame, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    navigateTo, 
    setFilters, 
    setSearchQuery: setGlobalSearch 
  } = useStore();

  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setInputVal('');
    }
  }, [isSearchOpen]);

  const matchingProducts = inputVal.trim()
    ? products.filter((p) => {
        const q = inputVal.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.scale.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    setGlobalSearch(inputVal);
    setIsSearchOpen(false);
    navigateTo('shop');
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo('product', productId);
  };

  const popularSearches = ['Kaido House', 'Porsche GT3 RS', 'RLC Exclusive', '1:64 Scale', 'Inno64 Ferrari', 'JDM Skyline'];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="search-modal-backdrop"
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/80 backdrop-blur-md"
        onClick={() => setIsSearchOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-[#11141b] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input Header */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-neutral-800 px-5 py-4">
            <Search className="w-6 h-6 text-neutral-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search by car name, brand, scale, SKU (e.g., Skyline, Kaido, 1:64)..."
              className="w-full bg-transparent text-white placeholder-neutral-500 text-lg font-medium outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                className="p-1 text-neutral-400 hover:text-white mr-2"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-700/80 rounded-lg"
            >
              ESC
            </button>
          </form>

          {/* Quick Suggestions when empty */}
          {!inputVal.trim() && (
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                <Flame className="w-4 h-4 text-rose-500" />
                Popular Collector Searches
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setInputVal(term);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-sm text-neutral-300 hover:text-white border border-neutral-800 transition-colors flex items-center gap-1.5"
                  >
                    <Tag className="w-3.5 h-3.5 text-neutral-400" />
                    {term}
                  </button>
                ))}
              </div>

              <div className="rounded-xl p-4 bg-neutral-900/40 border border-neutral-800/60 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0" />
                <p className="text-xs text-neutral-400">
                  Every die-cast model car in our marketplace is genuine, factory-authenticated, and inspected before cataloguing.
                </p>
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {inputVal.trim() && (
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {matchingProducts.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider px-2 mb-2">
                    Matching Models ({matchingProducts.length})
                  </div>
                  {matchingProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800/60 border border-transparent hover:border-neutral-700/70 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-neutral-950 overflow-hidden shrink-0 border border-neutral-800">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                              {product.specs.scale}
                            </span>
                            <span className="text-xs text-rose-400 font-medium">{product.brand}</span>
                            <span className="text-xs text-neutral-500">SKU: {product.sku}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">${product.price.toFixed(2)}</div>
                          {product.stock <= 5 && (
                            <span className="text-[10px] text-amber-400 font-medium">Only {product.stock} left</span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleSearchSubmit()}
                    className="w-full mt-3 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View all matching results for &ldquo;{inputVal}&rdquo;</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-neutral-400 font-medium">No die-cast models found matching &ldquo;{inputVal}&rdquo;</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Try searching by brand (Kaido House, Spark, Inno64), scale (1:64, 1:43), or car series.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
