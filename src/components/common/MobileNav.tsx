import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Compass, Search, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    setIsSearchOpen, 
    setIsCartOpen, 
    cartCount, 
    wishlist 
  } = useStore();

  return (
    <nav 
      id="mobile-bottom-nav" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e14]/95 backdrop-blur-xl border-t border-neutral-800/90 px-3 py-2 shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
            activePage === 'home' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
            activePage === 'shop' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigateTo('account')}
          className={`relative flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
            activePage === 'account' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-600 text-[9px] font-bold text-white flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-neutral-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-600 text-[9px] font-bold text-white flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>
      </div>
    </nav>
  );
};
