import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Filter, 
  X, 
  Search, 
  RotateCcw, 
  ChevronDown, 
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { CategorySlug, Scale } from '../types';

export const ShopPage: React.FC = () => {
  const { 
    filteredProducts, 
    filters, 
    setFilters, 
    resetFilters, 
    products, 
    categories, 
    collections,
    searchQuery,
    setSearchQuery 
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Extract unique brands and series from products
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  const seriesList = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.series))).sort();
  }, [products]);

  const scales: Scale[] = ['1:64', '1:43', '1:24', '1:18'];

  const visibleProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  const activeFilterCount = [
    filters.category !== 'all',
    filters.brand !== 'all',
    filters.series !== 'all',
    filters.scale !== 'all',
    filters.availability !== 'all',
    filters.maxPrice < 300,
    searchQuery.trim().length > 0,
  ].filter(Boolean).length;

  return (
    <div id="shop-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Header Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-white font-medium">Shop Catalog</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Die-Cast Marketplace
              </h1>
              <p className="text-sm text-neutral-400 mt-1">
                Showing {visibleProducts.length} of {filteredProducts.length} authentic collector models
              </p>
            </div>

            {/* Mobile Filter & Search Bar Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as any }))}
                className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Selling</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout with Sidebar Filters and Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="p-5 rounded-2xl bg-[#10131b] border border-neutral-800 space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-[10px] text-white flex items-center justify-center font-mono">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      resetFilters();
                      setSearchQuery('');
                    }}
                    className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Inline Search in sidebar */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  Search Model / SKU
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Skyline, Mini GT, RLC..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Scale Filter */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  Scale
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFilters((p) => ({ ...p, scale: 'all' }))}
                    className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all border ${
                      filters.scale === 'all'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    All Scales
                  </button>
                  {scales.map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setFilters((p) => ({ ...p, scale: sc }))}
                      className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all border ${
                        filters.scale === sc
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  Category
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setFilters((p) => ({ ...p, category: 'all' }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      filters.category === 'all'
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="font-mono text-[10px] text-neutral-500">{products.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters((p) => ({ ...p, category: cat.slug }))}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        filters.category === cat.slug
                          ? 'bg-neutral-800 text-rose-400 font-bold'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="font-mono text-[10px] text-neutral-500">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  Brand / Manufacturer
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters((p) => ({ ...p, brand: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white font-medium focus:outline-none focus:border-rose-500"
                >
                  <option value="all">All Brands ({brands.length})</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Series Filter */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  Series
                </label>
                <select
                  value={filters.series}
                  onChange={(e) => setFilters((p) => ({ ...p, series: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white font-medium focus:outline-none focus:border-rose-500"
                >
                  <option value="all">All Series ({seriesList.length})</option>
                  {seriesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-neutral-300 uppercase tracking-wider">Max Price</span>
                  <span className="font-mono font-bold text-rose-400">${filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={300}
                  step={5}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-rose-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                  <span>$15</span>
                  <span>$300+</span>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                  Availability
                </label>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                    <input
                      type="radio"
                      name="avail"
                      checked={filters.availability === 'all'}
                      onChange={() => setFilters((p) => ({ ...p, availability: 'all' }))}
                      className="accent-rose-500"
                    />
                    <span>All Items</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                    <input
                      type="radio"
                      name="avail"
                      checked={filters.availability === 'in-stock'}
                      onChange={() => setFilters((p) => ({ ...p, availability: 'in-stock' }))}
                      className="accent-rose-500"
                    />
                    <span>Ready in Vault (In Stock)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                    <input
                      type="radio"
                      name="avail"
                      checked={filters.availability === 'limited'}
                      onChange={() => setFilters((p) => ({ ...p, availability: 'limited' }))}
                      className="accent-rose-500"
                    />
                    <span>Limited &amp; Serialized Only</span>
                  </label>
                </div>
              </div>

            </div>
          </aside>

          {/* Main Product Grid Column */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Desktop Toolbar: Active tags & Sort selector */}
            <div className="hidden md:flex items-center justify-between p-4 rounded-2xl bg-[#10131b] border border-neutral-800">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-neutral-500 font-medium">Active:</span>
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-white">
                    Category: {filters.category}
                    <button onClick={() => setFilters((p) => ({ ...p, category: 'all' }))}>
                      <X className="w-3 h-3 text-neutral-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {filters.scale !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono">
                    Scale: {filters.scale}
                    <button onClick={() => setFilters((p) => ({ ...p, scale: 'all' }))}>
                      <X className="w-3 h-3 text-neutral-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {filters.brand !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-white">
                    Brand: {filters.brand}
                    <button onClick={() => setFilters((p) => ({ ...p, brand: 'all' }))}>
                      <X className="w-3 h-3 text-neutral-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-white">
                    Keyword: &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3 text-neutral-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {activeFilterCount === 0 && (
                  <span className="text-neutral-500">All available models</span>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400 font-medium">Sort By:</span>
                </div>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as any }))}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold focus:outline-none focus:border-rose-500"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Collector Rating / Best Selling</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center rounded-2xl bg-[#11141c] border border-neutral-800 p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  No matching models found
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
                  Try adjusting your filter criteria or clearing the search query to view more models.
                </p>
                <button
                  onClick={() => {
                    resetFilters();
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="pt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm border border-neutral-700 transition-colors shadow-lg hover:border-neutral-600"
                >
                  Load More Models ({filteredProducts.length - visibleProducts.length} remaining)
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className="absolute inset-y-0 right-0 max-w-xs w-full bg-[#10131a] p-6 overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <h3 className="font-bold text-white text-base">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Content */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    Scale
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFilters((p) => ({ ...p, scale: 'all' }))}
                      className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold border ${
                        filters.scale === 'all'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      All
                    </button>
                    {scales.map((sc) => (
                      <button
                        key={sc}
                        onClick={() => setFilters((p) => ({ ...p, scale: sc }))}
                        className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold border ${
                          filters.scale === sc
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                        }`}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters((p) => ({ ...p, brand: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  >
                    <option value="all">All Brands</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-neutral-400 uppercase">Max Price</span>
                    <span className="font-mono text-rose-400">${filters.maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={300}
                    step={5}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold text-sm shadow-lg"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setSearchQuery('');
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-900 text-neutral-400 text-xs font-semibold"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
