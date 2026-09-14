import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ShieldAlert, 
  PackageCheck,
  Compass,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentUser,
    setFilters,
    logout,
    login
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryNav = (categorySlug?: string, sort?: 'featured' | 'newest') => {
    setFilters((prev) => ({
      ...prev,
      category: categorySlug || 'all',
      sortBy: sort || 'featured',
    }));
    navigateTo('shop');
  };

  const navItems = [
    { label: 'Home', action: () => navigateTo('home'), active: activePage === 'home' },
    { label: 'Shop', action: () => { setFilters((p) => ({ ...p, category: 'all' })); navigateTo('shop'); }, active: activePage === 'shop' },
    { 
      label: 'New Arrivals', 
      action: () => { setFilters((p) => ({ ...p, category: 'all', sortBy: 'newest' })); navigateTo('shop'); }, 
      badge: 'NEW' 
    },
    { 
      label: 'Premium', 
      action: () => { setFilters((p) => ({ ...p, category: 'premium' })); navigateTo('shop'); },
      accent: true
    },
    { 
      label: 'Collections', 
      action: () => { setFilters((p) => ({ ...p, category: 'limited-edition' })); navigateTo('shop'); } 
    },
    { 
      label: 'Best Sellers', 
      action: () => { setFilters((p) => ({ ...p, category: 'all', sortBy: 'rating' })); navigateTo('shop'); } 
    },
  ];

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B0D12]/95 backdrop-blur-md border-b border-neutral-800/90 shadow-2xl shadow-black/60 py-3.5' 
          : 'bg-[#0B0D12]/80 backdrop-blur-sm border-b border-neutral-800/50 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group"
              aria-label="DieCastHub Home"
            >
              {/* Metallic Logo Badge */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/80 flex items-center justify-center shadow-lg group-hover:border-rose-500/80 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-display font-black text-lg text-white tracking-tighter">
                  D<span className="text-rose-500">C</span>H
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
                    DieCast<span className="text-rose-500">Hub</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono uppercase tracking-wider border border-neutral-700">
                    Est. 2024
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-medium tracking-wide -mt-0.5 hidden sm:block">
                  Build Your Collection.
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`relative px-3.5 py-2 text-sm font-semibold transition-all rounded-lg ${
                  item.active
                    ? 'text-white bg-neutral-800/80 border border-neutral-700/60'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-600 text-white font-mono leading-tight">
                      {item.badge}
                    </span>
                  )}
                  {item.accent && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </span>
              </button>
            ))}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors flex items-center gap-2 group"
              aria-label="Search models"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline-block text-xs text-neutral-400 font-medium bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                Search ⌘K
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('account')}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors relative"
              aria-label={`Wishlist with ${wishlist.length} items`}
            >
              <Heart className="w-5 h-5 hover:text-rose-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center font-mono ring-2 ring-[#0B0D12]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800/90 text-white transition-all group"
              aria-label={`Cart with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-bold font-mono text-neutral-200">
                Cart
              </span>
            </button>

            {/* User Account / Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                  currentUser?.role === 'admin'
                    ? 'bg-amber-500/10 border border-amber-500/40 text-amber-300'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
                }`}
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
                {currentUser && (
                  <span className="hidden md:inline-block text-xs font-semibold max-w-[90px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#12151d] border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-neutral-800/70 mb-1">
                    <div className="text-xs text-neutral-400">Signed in as</div>
                    <div className="text-sm font-bold text-white truncate">
                      {currentUser?.name || 'Collector Guest'}
                    </div>
                    {currentUser && (
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 border border-amber-500/30">
                        {currentUser.role === 'admin' ? '🛡️ Super Administrator' : `⭐ ${currentUser.tier} Tier`}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => navigateTo('account')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-neutral-400" />
                    Collector Profile
                  </button>

                  <button
                    onClick={() => navigateTo('order-tracking')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors text-left"
                  >
                    <PackageCheck className="w-4 h-4 text-neutral-400" />
                    Track an Order
                  </button>

                  {/* Admin Portal Toggle */}
                  <div className="border-t border-neutral-800/70 my-1 pt-1">
                    <button
                      onClick={() => {
                        if (currentUser?.role !== 'admin') {
                          login('admin@diecasthub.com', 'admin');
                        }
                        navigateTo('admin');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Admin Dashboard
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold uppercase">
                        Portal
                      </span>
                    </button>
                  </div>

                  {currentUser && (
                    <div className="border-t border-neutral-800/70 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-neutral-800 pb-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800/60 transition-colors text-left"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-600 text-white font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-2 border-t border-neutral-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigateTo('order-tracking');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:bg-neutral-800/60"
              >
                <PackageCheck className="w-4 h-4 text-neutral-400" />
                Track Order
              </button>
              <button
                onClick={() => {
                  if (currentUser?.role !== 'admin') {
                    login('admin@diecasthub.com', 'admin');
                  }
                  navigateTo('admin');
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30"
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Admin Management
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-black">
                  Protected
                </span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
