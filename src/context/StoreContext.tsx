import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  Category, 
  Collection, 
  CartItem, 
  Order, 
  User, 
  Review, 
  Coupon, 
  OrderStatus,
  Address
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_COLLECTIONS, 
  INITIAL_COUPONS, 
  INITIAL_REVIEWS, 
  INITIAL_USER, 
  INITIAL_ORDERS 
} from '../data/seedData';

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'account'
  | 'admin';

export interface FilterState {
  category: string;
  brand: string;
  series: string;
  scale: string;
  minPrice: number;
  maxPrice: number;
  availability: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  // Navigation & Route
  activePage: PageRoute;
  selectedProductId: string | null;
  trackingOrderId: string | null;
  navigateTo: (page: PageRoute, productId?: string, orderId?: string) => void;

  // Data
  products: Product[];
  categories: Category[];
  collections: Collection[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currentUser: User | null;
  user: User | null;
  coupons: Coupon[];
  reviews: Review[];
  recentlyViewed: string[];
  activeCoupon: Coupon | null;
  shippingProtection: boolean;
  setShippingProtection: (enabled: boolean) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Quick View & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Orders
  createOrder: (orderData: Partial<Order>) => Order;
  cancelOrder: (orderId: string) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Auth / User
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  updateStock: (productId: string, newStock: number, reason?: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  toggleCouponActive: (couponId: string) => void;
  toggleCouponStatus: (couponIdOrCode: string) => void;
  deleteCoupon: (couponIdOrCode: string) => void;
  resetToDemoData: () => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'dch_products_v1',
  CART: 'dch_cart_v1',
  WISHLIST: 'dch_wishlist_v1',
  ORDERS: 'dch_orders_v1',
  USER: 'dch_user_v1',
  COUPONS: 'dch_coupons_v1',
  REVIEWS: 'dch_reviews_v1',
  RECENT: 'dch_recent_v1',
};

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  brand: 'all',
  series: 'all',
  scale: 'all',
  minPrice: 0,
  maxPrice: 300,
  availability: 'all',
  sortBy: 'featured',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Core Data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[3].id];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[2].id];
  });

  // UI States
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [shippingProtection, setShippingProtection] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (page: PageRoute, productId?: string, orderId?: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (productId) {
      setSelectedProductId(productId);
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((id) => id !== productId);
        return [productId, ...filtered].slice(0, 8);
      });
    }

    if (orderId) {
      setTrackingOrderId(orderId);
    }

    setIsMobileMenuOpen(false);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      showToast('This rare model is currently out of stock.', 'warning');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });

    showToast(`Added "${product.name}" to cart.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    const maxQty = product ? product.stock : 99;
    const finalQty = Math.min(quantity, maxQty);

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: finalQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Calculated totals
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const cartDiscount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (cartSubtotal < activeCoupon.minOrderValue) return 0;

    if (activeCoupon.discountType === 'percentage') {
      return Number(((cartSubtotal * activeCoupon.value) / 100).toFixed(2));
    }
    return Math.min(activeCoupon.value, cartSubtotal);
  }, [cartSubtotal, activeCoupon]);

  // Free shipping on orders over $75
  const cartShipping = useMemo(() => {
    if (cart.length === 0) return 0;
    const baseShipping = cartSubtotal >= 75 ? 0 : 7.95;
    const protection = shippingProtection ? 2.95 : 0;
    return baseShipping + protection;
  }, [cartSubtotal, cart.length, shippingProtection]);

  const cartTotal = useMemo(() => {
    const taxed = (cartSubtotal - cartDiscount) * 0.07; // 7% tax
    return Math.max(0, cartSubtotal - cartDiscount + cartShipping + taxed);
  }, [cartSubtotal, cartDiscount, cartShipping]);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your collection wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your collection wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value of $${found.minOrderValue} required for this code.`,
      };
    }

    if (found.usedCount >= found.usageLimit) {
      return { success: false, message: 'Coupon usage limit reached.' };
    }

    setActiveCoupon(found);
    return {
      success: true,
      message: `Coupon "${found.code}" applied: ${
        found.discountType === 'percentage' ? `${found.value}% OFF` : `$${found.value} OFF`
      }!`,
    };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Filtered Products Calculation
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchSeries = p.series.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchBrand && !matchSeries && !matchSku && !matchCategory && !matchTags) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand !== 'all' && p.brand !== filters.brand) {
        return false;
      }

      // Series filter
      if (filters.series !== 'all' && p.series !== filters.series) {
        return false;
      }

      // Scale filter
      if (filters.scale !== 'all' && p.scale !== filters.scale) {
        return false;
      }

      // Price filter
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Availability
      if (filters.availability === 'in-stock' && p.stock <= 0) return false;
      if (filters.availability === 'limited' && !p.isLimited && !p.isRare) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, searchQuery, filters]);

  // Order operations
  const createOrder = (orderData: Partial<Order>): Order => {
    const orderNumber = `DCH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: orderData.customer || {
        name: currentUser?.name || 'Collector Customer',
        email: currentUser?.email || 'collector@example.com',
        phone: currentUser?.phone || '+1 (555) 000-0000',
      },
      shippingAddress: orderData.shippingAddress || (currentUser?.addresses[0] as Address),
      deliveryMethod: orderData.deliveryMethod || {
        id: 'standard',
        name: 'Collector Vault Insured Shipping',
        price: 7.95,
        estimatedDays: '3-5 Business Days',
      },
      paymentMethod: orderData.paymentMethod || {
        type: 'credit_card',
        lastFour: '4242',
      },
      items: orderData.items || cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        scale: item.product.scale,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        sku: item.product.sku,
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingCost: cartShipping,
      tax: Number(((cartSubtotal - cartDiscount) * 0.07).toFixed(2)),
      total: Number(cartTotal.toFixed(2)),
      status: 'confirmed',
      trackingNumber: `DCH-TRK-${Math.floor(10000000 + Math.random() * 90000000)}US`,
      carrier: 'FedEx Collector Priority',
      estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeline: [
        {
          status: 'confirmed',
          label: 'Order Confirmed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          completed: true,
          notes: 'Authenticity certificate generated and allocated from vault inventory.',
        },
        {
          status: 'packed',
          label: 'Packed in Collector Armor',
          completed: false,
          notes: 'Double-cushioned shock packaging.',
        },
        {
          status: 'shipped',
          label: 'Handed to Courier',
          completed: false,
        },
        {
          status: 'out_for_delivery',
          label: 'Out for Delivery',
          completed: false,
        },
        {
          status: 'delivered',
          label: 'Delivered',
          completed: false,
        },
      ],
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const item = newOrder.items.find((i) => i.productId === p.id);
        if (item) {
          return { ...p, stock: Math.max(0, p.stock - item.quantity) };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Update coupon usage if used
    if (activeCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === activeCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c))
      );
    }

    // Clear cart and coupon
    clearCart();

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'cancelled',
            timeline: [
              ...ord.timeline,
              {
                status: 'cancelled',
                label: 'Order Cancelled & Refunded',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                completed: true,
                notes: 'Order was cancelled by collector request. Full refund initiated.',
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast('Order was successfully cancelled and refunded.', 'info');
  };

  // Review
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    setReviews((prev) => [newReview, ...prev]);

    // Update product rating and review count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const newCount = p.reviewCount + 1;
          const newRating = Number(((p.rating * p.reviewCount + reviewData.rating) / newCount).toFixed(1));
          return { ...p, rating: newRating, reviewCount: newCount };
        }
        return p;
      })
    );
    showToast('Thank you! Your collector review has been verified and posted.', 'success');
  };

  // Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    if (role === 'admin' || email.toLowerCase().includes('admin')) {
      setCurrentUser({
        id: 'usr-admin-01',
        name: 'Alexander Sterling',
        email: 'admin@diecasthub.com',
        role: 'admin',
        phone: '+1 (555) 999-0011',
        tier: 'Black Card VIP',
        addresses: INITIAL_USER.addresses,
        memberSince: '2023-01-01',
        totalOrders: 28,
      });
      showToast('Welcome Administrator Alexander. Admin controls unlocked.', 'success');
    } else {
      setCurrentUser({
        ...INITIAL_USER,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      });
      showToast(`Welcome back, collector!`, 'success');
    }
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      phone: '+1 (555) 123-4567',
      tier: 'Collector',
      addresses: [],
      memberSince: new Date().toISOString().split('T')[0],
      totalOrders: 0,
    };
    setCurrentUser(newUser);
    showToast(`Welcome to DieCastHub Collector Club, ${name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updates });
    showToast('Profile settings saved.', 'success');
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    const updated = [...currentUser.addresses, newAddress];
    if (addressData.isDefault) {
      updated.forEach((a) => {
        if (a.id !== newAddress.id) a.isDefault = false;
      });
    }
    setCurrentUser({ ...currentUser, addresses: updated });
    showToast('Shipping address added.', 'success');
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== id),
    });
    showToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    });
    showToast('Default shipping address updated.', 'success');
  };

  // Admin Actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `dch-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created.`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated.`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted from catalog.', 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline.map((step) => {
            if (step.status === status) {
              return {
                ...step,
                completed: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              };
            }
            return step;
          });

          return {
            ...ord,
            status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            timeline: updatedTimeline,
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to "${status.toUpperCase()}".`, 'success');
  };

  const updateStock = (productId: string, newStock: number, reason = 'Admin inventory adjustment') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    showToast(`Inventory updated: ${newStock} units available (${reason}).`, 'info');
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `cp-${Date.now()}`,
      usedCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon "${newCoupon.code}" created!`, 'success');
  };

  const toggleCouponActive = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const toggleCouponStatus = (couponIdOrCode: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === couponIdOrCode || c.code.toUpperCase() === couponIdOrCode.toUpperCase()
          ? { ...c, isActive: !c.isActive }
          : c
      )
    );
  };

  const deleteCoupon = (couponIdOrCode: string) => {
    setCoupons((prev) =>
      prev.filter(
        (c) => c.id !== couponIdOrCode && c.code.toUpperCase() !== couponIdOrCode.toUpperCase()
      )
    );
    showToast('Coupon removed.', 'info');
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCurrentUser(INITIAL_USER);
    setCoupons(INITIAL_COUPONS);
    setReviews(INITIAL_REVIEWS);
    setCart([{ product: INITIAL_PRODUCTS[0], quantity: 1 }]);
    setWishlist([INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[3].id]);
    showToast('Catalog and demo orders reset to factory seed data.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        selectedProductId,
        trackingOrderId,
        navigateTo,
        products,
        categories,
        collections,
        cart,
        wishlist,
        orders,
        currentUser,
        user: currentUser,
        coupons,
        reviews,
        recentlyViewed,
        activeCoupon,
        shippingProtection,
        setShippingProtection,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        createOrder,
        cancelOrder,
        addReview,
        login,
        logout,
        register,
        updateUserProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        updateStock,
        addCoupon,
        toggleCouponActive,
        toggleCouponStatus,
        deleteCoupon,
        resetToDemoData,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
