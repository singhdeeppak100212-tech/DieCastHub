export type Scale = '1:64' | '1:43' | '1:24' | '1:18';

export type CategorySlug = 
  | 'mainline'
  | 'premium'
  | 'limited-edition'
  | 'rare-finds'
  | 'jdm'
  | 'supercars'
  | 'muscle-cars'
  | 'european-cars';

export interface ProductSpecs {
  scale: Scale;
  material: string;
  chassis: string;
  tires: string;
  openingParts: string;
  manufacturer: string;
  series: string;
  releaseYear: number;
  packaging: string;
  certificateOfAuthenticity: boolean;
  productionRun?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  series: string;
  category: CategorySlug;
  scale: Scale;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  description: string;
  specs: ProductSpecs;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  isLimited?: boolean;
  isRare?: boolean;
  limitedNumber?: string; // e.g. "042/500"
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  itemCount: number;
  badge?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  featuredCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export type OrderStatus = 
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  scale: Scale;
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface OrderStatusStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    id?: string;
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  deliveryMethod: {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'apple_pay' | 'paypal';
    lastFour?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDeliveryDate: string;
  timeline: OrderStatusStep[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  tier: 'Collector' | 'Silver' | 'Gold' | 'Black Card VIP';
  addresses: Address[];
  memberSince: string;
  totalOrders: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  scalePurchased?: Scale;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15% or 50 for $50
  minOrderValue: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface InventoryLog {
  id: string;
  productId: string;
  sku: string;
  change: number;
  newStock: number;
  reason: string;
  timestamp: string;
}
