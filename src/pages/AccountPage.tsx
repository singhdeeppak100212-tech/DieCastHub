import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  Truck, 
  Calendar, 
  ExternalLink, 
  Edit3, 
  Check, 
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Lock,
  Plus
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { 
    user, 
    orders, 
    products, 
    wishlist, 
    removeFromWishlist, 
    addToCart, 
    logout, 
    login,
    navigateTo, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('orders');

  // Edit profile states
  const [nameInput, setNameInput] = useState(user?.name || 'Dominic Toretto');
  const [emailInput, setEmailInput] = useState(user?.email || 'collector@speedhub.com');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+1 (555) 019-2834');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Address states
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Primary Display Vault',
      recipient: 'Dominic Toretto',
      street: '1327 East 4th Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90033',
      country: 'United States',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Office Workshop',
      recipient: 'Dominic Toretto',
      street: '404 Carbon Blvd, Suite 8',
      city: 'Torrance',
      state: 'CA',
      zip: '90501',
      country: 'United States',
      isDefault: false
    }
  ]);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      user.name = nameInput;
      user.email = emailInput;
      user.phone = phoneInput;
    }
    setIsEditingProfile(false);
    showToast('Profile information updated successfully.', 'success');
  };

  const handleMoveToCart = (product: typeof products[0]) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast(`${product.name} moved to cart!`, 'success');
  };

  const handleSignOut = () => {
    logout();
    showToast('Signed out of collector session.', 'info');
    navigateTo('home');
  };

  return (
    <div id="account-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profile Summary */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#11141c] border border-neutral-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                alt={user?.name || 'Collector'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-neutral-700"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-rose-600 text-white" title="Collector Level 3">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  {user?.name || 'Dominic Toretto'}
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
                  {user?.role === 'admin' ? 'Vault Administrator' : 'VIP Collector'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{user?.email || 'collector@speedhub.com'}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500 font-mono">
                <span>Total Orders: <strong className="text-white">{orders.length}</strong></span>
                <span>•</span>
                <span>Wishlist: <strong className="text-white">{wishlist.length}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
              >
                Access Admin Desk
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold border border-neutral-800 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'orders'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'wishlist'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Collector Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'profile'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'addresses'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Vault Addresses</span>
          </button>
        </div>

        {/* TAB 1: Order History */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#11141c] border border-neutral-800">
                <Package className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-bold text-white text-base">No collector orders yet</h3>
                <p className="text-xs text-neutral-400 mt-1 mb-4">You haven't placed any die-cast orders.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-[#10131a] border border-neutral-800 hover:border-neutral-700 transition-colors space-y-4 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm">{order.id}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                            order.status === 'delivered'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : order.status === 'shipped'
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 flex items-center gap-2 mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[11px] text-neutral-500 block">Order Total</span>
                          <span className="font-mono font-bold text-base text-white">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => navigateTo('order-tracking')}
                          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-rose-600 hover:text-white text-neutral-300 text-xs font-bold border border-neutral-700 transition-colors flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>

                    {/* Items preview in order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 cursor-pointer hover:border-neutral-700"
                          onClick={() => navigateTo('product', item.product.id)}
                        >
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-12 h-10 rounded-lg object-cover bg-black"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              Qty: {item.quantity} • ${item.product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                      <span>Tracking: <strong className="font-mono text-neutral-300">{order.trackingNumber}</strong></span>
                      <span>Carrier: {order.carrier}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#11141c] border border-neutral-800">
                <Heart className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-bold text-white text-base">Your collector wishlist is empty</h3>
                <p className="text-xs text-neutral-400 mt-1 mb-4">
                  Save your favorite limited runs and grails to watch for restocks.
                </p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                >
                  Browse Models
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="relative group">
                    <ProductCard product={p} />
                    
                    {/* Quick Move-to-cart strip */}
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleMoveToCart(p)}
                        className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(p.id)}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 border border-neutral-800"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Profile Information */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#11141c] border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h2 className="font-display font-bold text-lg text-white">Collector Profile Information</h2>
                <p className="text-xs text-neutral-400">Manage your name, contact email, and phone notification preferences</p>
              </div>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold border border-neutral-700 flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={nameInput}
                  disabled={!isEditingProfile}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white disabled:opacity-60 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  disabled={!isEditingProfile}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white disabled:opacity-60 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Phone Number (SMS Drop Alerts)</label>
                <input
                  type="text"
                  value={phoneInput}
                  disabled={!isEditingProfile}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-neutral-900 border border-neutral-700 text-white disabled:opacity-60 focus:outline-none focus:border-rose-500"
                />
              </div>

              {isEditingProfile && (
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 4: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-white">Saved Vault Addresses</h2>
                <p className="text-xs text-neutral-400">Manage destination addresses for shock-armored dispatches</p>
              </div>
              <button
                onClick={() => showToast('Address creation is pre-configured for your account.', 'info')}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-5 rounded-2xl bg-[#10131a] border border-neutral-800 space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-neutral-400 leading-relaxed">
                    <p className="font-semibold text-neutral-200">{addr.recipient}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} {addr.zip}</p>
                    <p>{addr.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
