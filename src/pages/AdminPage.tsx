import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, Coupon, Scale, CategorySlug } from '../types';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Tag, 
  Truck, 
  Sparkles, 
  Search,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    toggleCouponStatus,
    categories,
    user,
    showToast,
    navigateTo
  } = useStore();

  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'coupons'>('stats');
  
  // Product Search in admin
  const [adminSearch, setAdminSearch] = useState('');

  // New / Edit Product Modal state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Coupon Form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponType, setNewCouponType] = useState<'percent' | 'fixed'>('percent');

  // Stats Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 4);

  // Filtered products for table
  const displayedProducts = products.filter((p) => 
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const handleOpenAddProduct = () => {
    setEditingProduct({
      name: '',
      brand: 'Mini GT',
      series: 'Collector Edition',
      category: 'jdm',
      price: 19.99,
      compareAtPrice: 24.99,
      stock: 12,
      sku: `DCH-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      isFeatured: true,
      isLimited: false,
      isRare: false,
      images: [
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop'
      ],
      description: 'Hand-crafted precision diecast metal casting with Real Riders rubber tires.',
      specs: {
        scale: '1:64',
        material: 'Die-cast metal body & base',
        chassis: 'Full metal chassis',
        tires: 'Real rubber treads',
        openingParts: 'Opening hood / rear hatch',
        packaging: 'Sealed acrylic display pedestal',
        manufacturer: 'TSM Model Inc.',
        series: 'Collector Exclusives',
        releaseYear: 2026
      }
    });
    setIsModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct({ ...prod });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    if (editingProduct.id) {
      updateProduct(editingProduct as Product);
      showToast('Product updated successfully!', 'success');
    } else {
      const newProd: Product = {
        ...editingProduct,
        id: `prod-${Date.now()}`
      } as Product;
      addProduct(newProd);
      showToast('New collectible model added to vault!', 'success');
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const coupon: Omit<Coupon, 'id' | 'usedCount'> = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType === 'percent' ? 'percentage' : 'fixed',
      value: newCouponDiscount,
      minOrderValue: 50,
      expiryDate: '2026-12-31',
      usageLimit: 100,
      isActive: true,
    };

    addCoupon(coupon);
    setNewCouponCode('');
    showToast(`Coupon ${coupon.code} created!`, 'success');
  };

  return (
    <div id="admin-dashboard-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Admin Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
                DieCastHub Vault Management Console
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Store Owner Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-800 transition-colors"
            >
              Exit to Storefront
            </button>
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-rose-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Model</span>
            </button>
          </div>
        </div>

        {/* Low Stock Warning Alert Banner if any */}
        {lowStockProducts.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between mb-8 text-xs">
            <div className="flex items-center gap-3 text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="font-bold block text-white">Low Stock Warning:</strong>
                <span>{lowStockProducts.length} collectible models have 4 or fewer units remaining in the vault.</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
            >
              Inspect Stock
            </button>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-neutral-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'stats'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Sales &amp; Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'products'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products &amp; Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'orders'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders &amp; Shipments ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'coupons'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Discount Coupons ({coupons.length})</span>
          </button>
        </div>

        {/* TAB 1: Sales Statistics */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            
            {/* 4 Hero Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#11141c] border border-neutral-800 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase">
                  <span>Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white font-mono">
                  ${totalRevenue.toFixed(2)}
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  +18.4% vs last calendar cycle
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#11141c] border border-neutral-800 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase">
                  <span>Total Orders</span>
                  <ShoppingBag className="w-4 h-4 text-rose-500" />
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white font-mono">
                  {totalOrders}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  100% Vault Armor compliance
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#11141c] border border-neutral-800 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase">
                  <span>Live Catalog Products</span>
                  <Package className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white font-mono">
                  {totalProducts}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  Across 8 curated categories
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#11141c] border border-neutral-800 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold uppercase">
                  <span>Registered Collectors</span>
                  <Users className="w-4 h-4 text-sky-400" />
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white font-mono">
                  1,482
                </div>
                <div className="text-[11px] text-sky-400 font-medium">
                  +42 joining Collector Club weekly
                </div>
              </div>

            </div>

            {/* Recent Orders Overview */}
            <div className="p-6 rounded-3xl bg-[#11141c] border border-neutral-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-white">
                  Recent Inbound Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-rose-400 hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/60 text-neutral-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {orders.slice(0, 3).map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-900/40">
                        <td className="p-3 font-mono font-bold text-white">{o.id}</td>
                        <td className="p-3 text-neutral-300">{o.shippingAddress.fullName}</td>
                        <td className="p-3 text-neutral-400">{o.items.length} models</td>
                        <td className="p-3 font-mono font-bold text-white">${o.total.toFixed(2)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-neutral-900 text-rose-400 border border-neutral-700">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Product Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Filter by name, brand, SKU..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="rounded-3xl bg-[#11141c] border border-neutral-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Model</th>
                      <th className="p-3.5">Brand &amp; Scale</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Badges</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {displayedProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-900/30 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt=""
                              className="w-12 h-10 rounded-lg object-cover bg-black shrink-0"
                            />
                            <div>
                              <span className="font-bold text-white block max-w-xs truncate">{p.name}</span>
                              <span className="text-[10px] text-neutral-500 font-mono">SKU: {p.sku}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="text-neutral-300 font-semibold">{p.brand}</div>
                          <span className="text-[10px] font-mono text-neutral-500">{p.specs.scale}</span>
                        </td>

                        <td className="p-3.5 font-mono font-bold text-white">
                          ${p.price.toFixed(2)}
                        </td>

                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => {
                                updateProduct({ ...p, stock: Math.max(0, parseInt(e.target.value) || 0) });
                              }}
                              className={`w-16 px-2 py-1 rounded-lg border text-center font-mono text-xs ${
                                p.stock <= 4
                                  ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                                  : 'bg-neutral-900 border-neutral-700 text-white'
                              }`}
                            />
                            {p.stock <= 4 && (
                              <span className="text-[10px] text-rose-400 font-bold">LOW</span>
                            )}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => updateProduct({ ...p, isNew: !p.isNew })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                p.isNew ? 'bg-rose-600 text-white' : 'bg-neutral-900 text-neutral-500'
                              }`}
                              title="Toggle New badge"
                            >
                              NEW
                            </button>
                            <button
                              onClick={() => updateProduct({ ...p, isFeatured: !p.isFeatured })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                p.isFeatured ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-neutral-500'
                              }`}
                              title="Toggle Featured badge"
                            >
                              FEAT
                            </button>
                            <button
                              onClick={() => updateProduct({ ...p, isRare: !p.isRare })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                p.isRare ? 'bg-amber-500 text-black' : 'bg-neutral-900 text-neutral-500'
                              }`}
                              title="Toggle Rare badge"
                            >
                              RARE
                            </button>
                          </div>
                        </td>

                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                              title="Edit model"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove ${p.name} from vault catalog?`)) {
                                  deleteProduct(p.id);
                                  showToast('Model removed from catalog.', 'info');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-600 text-neutral-500 hover:text-white transition-colors"
                              title="Delete model"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Order Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#11141c] border border-neutral-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Order ID &amp; Date</th>
                      <th className="p-3.5">Recipient &amp; Destination</th>
                      <th className="p-3.5">Fulfillment Status</th>
                      <th className="p-3.5">Tracking Number</th>
                      <th className="p-3.5">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-900/30">
                        <td className="p-3.5">
                          <div className="font-mono font-bold text-white text-sm">{o.id}</div>
                          <div className="text-[10px] text-neutral-500">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-semibold text-neutral-200">{o.shippingAddress.fullName}</div>
                          <div className="text-[10px] text-neutral-500">
                            {o.shippingAddress.city}, {o.shippingAddress.state}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <select
                            value={o.status}
                            onChange={(e) => {
                              updateOrderStatus(o.id, e.target.value as any);
                              showToast(`Order ${o.id} marked as ${e.target.value}`, 'success');
                            }}
                            className="px-2.5 py-1 text-xs rounded-lg bg-neutral-900 border border-neutral-700 text-white font-semibold focus:outline-none"
                          >
                            <option value="processing">Processing (Inspection)</option>
                            <option value="shipped">Shipped (In Transit)</option>
                            <option value="out-for-delivery">Out for Delivery</option>
                            <option value="delivered">Delivered (Safe in Garage)</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="p-3.5">
                          <span className="font-mono text-xs text-rose-400">{o.trackingNumber}</span>
                          <div className="text-[10px] text-neutral-500">{o.carrier}</div>
                        </td>

                        <td className="p-3.5 font-mono font-bold text-white text-sm">
                          ${o.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Coupon Management */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Create Coupon Form */}
            <div className="p-6 rounded-3xl bg-[#11141c] border border-neutral-800 space-y-4 shadow-xl">
              <h3 className="font-display font-bold text-base text-white">
                Create Collector Promotion
              </h3>

              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-400 font-semibold block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="e.g. VIP20 or DRIFT15"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white uppercase focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-semibold block mb-1">Discount Amount</label>
                    <input
                      type="number"
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                      min={1}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 font-semibold block mb-1">Type</label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                    >
                      <option value="percent">Percentage (%)</option>
                      <option value="fixed">Fixed Dollars ($)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-colors"
                >
                  Publish Coupon
                </button>
              </form>
            </div>

            {/* Coupons List */}
            <div className="md:col-span-2 rounded-3xl bg-[#11141c] border border-neutral-800 p-6 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Active &amp; Expired Coupons
              </h3>

              <div className="space-y-3">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-white">{c.code}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                        }`}>
                          {c.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {c.discountType === 'percentage' ? `${c.value}% Off` : `$${c.value} Off`} • Min Order ${c.minOrderValue}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCouponStatus(c.code)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
                      >
                        {c.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteCoupon(c.code)}
                        className="p-1.5 rounded-xl bg-neutral-800 hover:bg-rose-600 text-neutral-400 hover:text-white"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Edit / Add Product Modal */}
      {isModalOpen && editingProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-[#12151e] border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="font-display font-bold text-lg text-white">
                {editingProduct.id ? 'Edit Collector Model' : 'Add New Die-Cast Model'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Model Name</label>
                <input
                  type="text"
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Nissan Skyline GT-R (R34) Nismo Z-Tune"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 font-semibold block mb-1">Brand</label>
                  <input
                    type="text"
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-neutral-400 font-semibold block mb-1">Category</label>
                  <select
                    value={editingProduct.category || 'jdm'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as CategorySlug })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-neutral-400 font-semibold block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-neutral-400 font-semibold block mb-1">Vault Stock Units</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-neutral-400 font-semibold block mb-1">Scale</label>
                  <select
                    value={editingProduct.specs?.scale || '1:64'}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      specs: { ...editingProduct.specs!, scale: e.target.value as Scale } 
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono"
                  >
                    <option value="1:64">1:64</option>
                    <option value="1:43">1:43</option>
                    <option value="1:24">1:24</option>
                    <option value="1:18">1:18</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Primary Image URL</label>
                <input
                  type="url"
                  value={editingProduct.images?.[0] || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono text-[11px]"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Collector Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                />
              </div>

              <div className="flex gap-4 pt-2 border-t border-neutral-800">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg"
                >
                  Save Model to Vault
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-neutral-900 text-neutral-400 text-xs hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
