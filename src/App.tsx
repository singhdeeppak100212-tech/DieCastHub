/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { ProductQuickView } from './components/product/ProductQuickView';
import { CartDrawer } from './components/cart/CartDrawer';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] flex flex-col selection:bg-rose-600 selection:text-white pb-16 md:pb-0 font-sans">
      {/* Top Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Floating Overlays & Modals */}
      <MobileNav />
      <SearchModal />
      <ProductQuickView />
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
