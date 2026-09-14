import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Truck, 
  Search, 
  Package, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, showToast, navigateTo } = useStore();

  const [searchCode, setSearchCode] = useState(orders[0]?.trackingNumber || 'DCH-TRK-74921');
  const [activeOrder, setActiveOrder] = useState<typeof orders[0] | null>(orders[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();

    if (!clean) {
      showToast('Please enter an Order ID or Tracking Number.', 'warning');
      return;
    }

    const match = orders.find(
      (o) => o.id.toUpperCase() === clean || o.trackingNumber.toUpperCase() === clean
    );

    if (match) {
      setActiveOrder(match);
      showToast(`Order found: ${match.id}`, 'success');
    } else {
      // Simulate demo fallback order for external arbitrary code
      setActiveOrder({
        id: `DCH-${Math.floor(100000 + Math.random() * 900000)}`,
        items: orders[0]?.items || [],
        total: 189.95,
        subtotal: 175.00,
        shipping: 14.95,
        discount: 0,
        status: 'shipped',
        shippingAddress: {
          fullName: 'Marcus Sterling',
          address: '88 Speedwell Way',
          city: 'Austin',
          state: 'TX',
          zip: '78701',
          country: 'United States'
        },
        paymentMethod: 'card',
        trackingNumber: clean,
        carrier: 'FedEx Collector Priority Air',
        estimatedDelivery: 'Sep 18, 2026',
        createdAt: new Date().toISOString()
      });
      showToast(`Tracking record retrieved from carrier network.`, 'info');
    }
  };

  // Tracking milestones
  const steps = [
    { title: 'Order Confirmed', desc: 'Payment authorized & catalog allocation verified', icon: CheckCircle2 },
    { title: 'Packed with Care', desc: 'Studio inspection & double-bubble shock wrap applied', icon: Package },
    { title: 'Handed to Carrier', desc: 'Transferred to climate-controlled freight transport', icon: Truck },
    { title: 'Out for Delivery', desc: 'Assigned to courier van with safe-handling flag', icon: MapPin },
    { title: 'Delivered', desc: 'Securely signed and added to your showcase garage', icon: ShieldCheck },
  ];

  // Helper to determine step completion index based on order status
  const getStepProgressIndex = (status: string) => {
    switch (status) {
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'out-for-delivery': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = activeOrder ? getStepProgressIndex(activeOrder.status) : 2;

  return (
    <div id="order-tracking-page" className="min-h-screen bg-[#0B0D12] text-[#E5E7EB] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            Vault Logistics Live Tracker
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Track Collector Shipment
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Real-time status updates and shock-packaging telemetry for your diecast models.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-10 max-w-xl mx-auto">
          <div className="flex gap-2 p-1.5 rounded-2xl bg-[#11141c] border border-neutral-800 shadow-xl focus-within:border-rose-500 transition-colors">
            <div className="flex-1 relative flex items-center pl-3">
              <Search className="w-4 h-4 text-neutral-500 shrink-0 mr-2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Order ID (e.g. DCH-882103) or Tracking..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-950/40 shrink-0"
            >
              Track Parcel
            </button>
          </div>
        </form>

        {activeOrder && (
          <div className="space-y-6">
            
            {/* Live Progress Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#11141d] border border-neutral-800 shadow-2xl space-y-8">
              
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lg text-white">{activeOrder.id}</span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {activeOrder.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Courier: <strong className="text-white">{activeOrder.carrier}</strong> • Tracking: <span className="font-mono text-rose-400">{activeOrder.trackingNumber}</span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-neutral-400 block">Estimated Arrival</span>
                  <span className="font-display font-extrabold text-base text-white text-emerald-400">
                    {activeOrder.estimatedDelivery || 'In 3 Business Days'}
                  </span>
                </div>
              </div>

              {/* Progress Milestones Bar */}
              <div className="relative py-4">
                {/* Horizontal Progress Line on Desktop */}
                <div className="hidden md:block absolute top-10 left-8 right-8 h-1 bg-neutral-800 z-0">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-600 to-emerald-400 transition-all duration-500"
                    style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const Icon = step.icon;

                    return (
                      <div key={idx} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3">
                        <div 
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all ${
                            isCompleted
                              ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-950/60'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div>
                          <h4 className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-neutral-500'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Package Details Section */}
              <div className="pt-6 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Destination */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Destination Garage</span>
                  </div>
                  <div className="text-neutral-300 leading-relaxed pl-6">
                    <p className="font-semibold text-white">{activeOrder.shippingAddress.fullName}</p>
                    <p>{activeOrder.shippingAddress.address}</p>
                    <p>{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.zip}</p>
                    <p>{activeOrder.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Packaging Standard */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Vault Armor Status</span>
                  </div>
                  <div className="text-neutral-300 leading-relaxed pl-6">
                    <p className="text-emerald-400 font-semibold">Active Transit Shock Protection</p>
                    <p>Tamper-evident holographic tape verified.</p>
                    <p>Double-bubble shock dampening &amp; card corner shields confirmed.</p>
                  </div>
                </div>

              </div>

              {/* Items in this parcel */}
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-3">
                  Parcel Manifest ({activeOrder.items.length} Models)
                </h4>
                <div className="divide-y divide-neutral-800/80 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 overflow-hidden">
                  {activeOrder.items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/80 transition-colors"
                      onClick={() => navigateTo('product', item.product.id)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-14 h-11 rounded-lg object-cover bg-black"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-white hover:text-rose-400 transition-colors">
                            {item.product.name}
                          </h5>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {item.product.brand} • Scale {item.product.specs.scale} • SKU: {item.product.sku}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white">Qty: {item.quantity}</span>
                        <div className="text-[10px] text-neutral-400 font-mono">${item.product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Need Help Assistance Banner */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-neutral-500" />
                <span>Notice a damaged delivery or missing piece? Our collector concierge offers immediate 1-to-1 replacements.</span>
              </div>
              <a 
                href="mailto:concierge@diecasthub.com" 
                className="text-rose-400 hover:text-rose-300 font-bold underline shrink-0 ml-4"
              >
                Contact Concierge
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
