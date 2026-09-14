import { Product, Category, Collection, Coupon, Order, Review, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-mainline',
    name: 'Mainline',
    slug: 'mainline',
    description: 'Essential die-cast casting releases and mainline staples for everyday collecting.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    itemCount: 42,
    badge: 'Popular'
  },
  {
    id: 'cat-premium',
    name: 'Premium',
    slug: 'premium',
    description: 'Metal/metal chassis, Real Riders rubber tires, and ultra-detailed precision paintwork.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    itemCount: 36,
    badge: 'High Spec'
  },
  {
    id: 'cat-limited',
    name: 'Limited Edition',
    slug: 'limited-edition',
    description: 'Serialized production runs, acrylic presentation cases, and numbered collector plates.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    itemCount: 18,
    badge: 'Serialized'
  },
  {
    id: 'cat-rare',
    name: 'Rare Finds',
    slug: 'rare-finds',
    description: 'Vault releases, retired manufacturer licenses, chase variants, and RLC member exclusives.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
    itemCount: 12,
    badge: 'Grail Pieces'
  },
  {
    id: 'cat-jdm',
    name: 'JDM Legends',
    slug: 'jdm',
    description: 'Japanese Domestic Market tuning icons: Skylines, Silvias, Supras, and RX-7s.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
    itemCount: 29,
    badge: 'Trending'
  },
  {
    id: 'cat-supercars',
    name: 'Supercars & Hypercars',
    slug: 'supercars',
    description: 'Ferrari, Lamborghini, McLaren, and Koenigsegg precision scaled aerodynamic masterworks.',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop',
    itemCount: 24
  },
  {
    id: 'cat-muscle',
    name: 'Classic Muscle',
    slug: 'muscle-cars',
    description: 'Detroit iron: Chargers, Mustangs, Camaros, and Chevelles with high-output V8 detailing.',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=800&auto=format&fit=crop',
    itemCount: 21
  },
  {
    id: 'cat-european',
    name: 'European Heritage',
    slug: 'european-cars',
    description: 'Porsche, BMW M-Power, Mercedes AMG, and Alfa Romeo track and road legends.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    itemCount: 27
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-kaido-house',
    name: 'Kaido House x Mini GT',
    slug: 'kaido-house',
    description: 'Designed by Jun Imai, featuring opening hoods, exposed alloy engines, and custom Japanese street tuners.',
    bannerImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    featuredCount: 8
  },
  {
    id: 'col-rlc-exclusive',
    name: 'Red Line Club Exclusives',
    slug: 'rlc-exclusives',
    description: 'Spectraflame paint, Neo-Classic wheels, numbered acrylic cases, and collector certificates.',
    bannerImage: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop',
    featuredCount: 6
  },
  {
    id: 'col-inno64-race',
    name: 'Inno64 Motorsport Track Collection',
    slug: 'inno64-motorsport',
    description: 'Extreme livery precision, brake calipers, roll cages, and authentic racing sponsorships.',
    bannerImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
    featuredCount: 11
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'dch-001',
    name: 'Nissan Skyline GT-R (R34) V-Spec II Kaido Works',
    brand: 'Kaido House x Mini GT',
    series: 'Pro Street Series 03',
    category: 'jdm',
    scale: '1:64',
    price: 34.99,
    compareAtPrice: 42.00,
    stock: 14,
    sku: 'KH-MG-R34-01',
    description: 'Designed in Los Angeles by Jun Imai. Features a full diecast metal body and base, opening hood revealing a twin-turbo RB26DETT with painted intake runners, custom bronze split-rim alloy wheels with soft rubber tires, and pristine Bayside Blue metallic finish.',
    specs: {
      scale: '1:64',
      material: 'Die-Cast Zinc Alloy Body & Chassis',
      chassis: 'Full Diecast Metal Chassis with Embossed Stamp',
      tires: 'Soft Compound Real Rubber Treaded Tires',
      openingParts: 'Front Opening Hood with Engine Detail',
      manufacturer: 'TSM Model / Mini GT',
      series: 'Kaido House Garage',
      releaseYear: 2024,
      packaging: 'Collector Box with Magnetic Closure & Blister Tray',
      certificateOfAuthenticity: true,
      productionRun: 'Batch #04 - 3,500 units worldwide'
    },
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNew: true,
    isPremium: true,
    rating: 4.9,
    reviewCount: 48,
    tags: ['JDM', 'Skyline', 'Kaido House', 'Opening Hood', '1:64'],
    createdAt: '2026-08-10'
  },
  {
    id: 'dch-002',
    name: 'Porsche 911 GT3 RS (992) Weissach Package',
    brand: 'Spark Editions',
    series: 'Apex Collector Line',
    category: 'european-cars',
    scale: '1:43',
    price: 89.00,
    compareAtPrice: 105.00,
    stock: 8,
    sku: 'SPK-992RS-02',
    description: 'Stunning 1:43 replica of the 992 GT3 RS in Lizard Green with exposed carbon-fiber aerodynamic elements. Precision photo-etched radiator grilles, brake discs with ceramic yellow calipers, and swan-neck active rear wing.',
    specs: {
      scale: '1:43',
      material: 'High-Density Composite & Diecast Metal',
      chassis: 'Engineered Aerodynamic Underbody Tray',
      tires: 'Ultra-low Profile Michelin Pilot Sport Cup 2 R Stamped Tires',
      openingParts: 'Sealed High-Fidelity Aerodynamic Body',
      manufacturer: 'Spark Model France',
      series: 'Le Mans Heritage',
      releaseYear: 2024,
      packaging: 'Clear Acrylic Showcase Box with Carbon-Texture Base',
      certificateOfAuthenticity: true,
      productionRun: 'Numbered 089/750'
    },
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isPremium: true,
    rating: 5.0,
    reviewCount: 32,
    tags: ['Porsche', 'GT3RS', 'Weissach', '1:43', 'Spark'],
    createdAt: '2026-07-28'
  },
  {
    id: 'dch-003',
    name: '1970 Dodge Charger R/T "Black Ghost" RLC Exclusive',
    brand: 'Hot Wheels RLC',
    series: 'Red Line Club 2024 Selection',
    category: 'rare-finds',
    scale: '1:64',
    price: 135.00,
    compareAtPrice: 160.00,
    stock: 4,
    sku: 'RLC-DODGE-70-BG',
    description: 'Authentic tribute to the legendary Detroit street racer Godfrey Qualls and his 1970 426 HEMI Dodge Charger. Finished in deep Spectraflame Pitch Black with roof alligator grain stamping, white rear tail bumblebee stripe, and opening hood.',
    specs: {
      scale: '1:64',
      material: 'ZAMAC Die-Cast Metal',
      chassis: 'Mirror Chrome Plated Die-Cast Metal Base',
      tires: 'Real Riders 5-Spoke Mag Wheels with White Letter Tires',
      openingParts: 'Counterbalanced Opening Hood with 426 HEMI',
      manufacturer: 'Mattel Creations',
      series: 'Red Line Club Collectors',
      releaseYear: 2024,
      packaging: 'Serialized Acrylic Mirror Display Case',
      certificateOfAuthenticity: true,
      productionRun: 'Limited to 15,000 units worldwide'
    },
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isRare: true,
    isLimited: true,
    limitedNumber: '#0142/5000',
    rating: 4.9,
    reviewCount: 64,
    tags: ['Muscle', 'Dodge', 'RLC', 'Spectraflame', 'Rare'],
    createdAt: '2026-08-01'
  },
  {
    id: 'dch-004',
    name: 'Ferrari F40 LM Competizione Rosso Corsa',
    brand: 'Inno64',
    series: 'Special Edition Race Track',
    category: 'supercars',
    scale: '1:64',
    price: 38.50,
    compareAtPrice: 45.00,
    stock: 19,
    sku: 'INNO-F40-LM-RC',
    description: 'The definitive track evolution of the iconic Ferrari F40. Includes removable rear carbon-textured engine cowl revealing the twin-turbo 2.9L Tipo F120B V8 engine, OZ Racing 5-spoke center-lock wheels, and high-downforce front splitter.',
    specs: {
      scale: '1:64',
      material: 'Diecast Metal with Photo-Etched Metal Wing Supports',
      chassis: 'Diecast Metal Aerodynamic Flat Floor',
      tires: 'Slick Race Rubber Compound',
      openingParts: 'Removable Rear Engine Clamshell Cover',
      manufacturer: 'Inno-Models Macau',
      series: 'Heritage Track Special',
      releaseYear: 2024,
      packaging: 'Custom Acrylic Case with Carbon Fiber Pattern Plaque',
      certificateOfAuthenticity: true,
      productionRun: 'Official Ferrari Licensed Model'
    },
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNew: true,
    isPremium: true,
    rating: 4.8,
    reviewCount: 39,
    tags: ['Ferrari', 'F40', 'Inno64', 'Supercar', 'Rosso Corsa'],
    createdAt: '2026-08-20'
  },
  {
    id: 'dch-005',
    name: '1967 Shelby Cobra 427 S/C Guardsman Blue',
    brand: 'AutoArt Signature',
    series: 'Millennium Grand Scale',
    category: 'muscle-cars',
    scale: '1:18',
    price: 245.00,
    compareAtPrice: 280.00,
    stock: 3,
    sku: 'AA-COBRA-18-05',
    description: 'Museum-grade 1:18 heavyweight diecast replica of Carroll Shelby’s crowning achievement. Functioning steerable front wheels, opening driver and passenger doors, opening trunk with spare tire, and opening latch hood displaying wiring harnesses and Holley four-barrel carburetors.',
    specs: {
      scale: '1:18',
      material: 'Solid Diecast Zinc Alloy with Hand-Polished Lacquer',
      chassis: 'Tubular Steel Frame Replica Underbody',
      tires: 'Goodyear Blue Streak Vintage Racing Rubber',
      openingParts: 'Opening Doors, Hood, Trunk, and Working Steering',
      manufacturer: 'AutoArt Models Germany',
      series: 'Signature Collector Series',
      releaseYear: 2023,
      packaging: 'Styrofoam Shell with Deluxe Color Gift Box',
      certificateOfAuthenticity: true,
      productionRun: 'Hand-assembled Certificate #0412/1200'
    },
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isRare: true,
    isPremium: true,
    limitedNumber: '#0412/1200',
    rating: 5.0,
    reviewCount: 19,
    tags: ['Shelby', 'Cobra', 'AutoArt', '1:18', 'Classic'],
    createdAt: '2026-06-15'
  },
  {
    id: 'dch-006',
    name: 'Mazda RX-7 (FD3S) Spirit R Type-A Titanium Gray',
    brand: 'Kyosho Mini-Car',
    series: 'JDM Master Heritage',
    category: 'jdm',
    scale: '1:64',
    price: 29.99,
    compareAtPrice: 35.00,
    stock: 22,
    sku: 'KYO-RX7-FD-06',
    description: 'The pinnacle of the rotary legacy. Finished in iconic Titanium Gray Metallic with red Recaro bucket seats, BBS forged cross-spoke wheels, and distinctive front oil cooler grilles.',
    specs: {
      scale: '1:64',
      material: 'Precision Diecast Metal',
      chassis: 'Weighted Metal Underfloor',
      tires: 'High Grip Treaded Rubber',
      openingParts: 'Closed Precision Aero Silhouette',
      manufacturer: 'Kyosho Corporation Japan',
      series: '1:64 Diecast Collection 11',
      releaseYear: 2024,
      packaging: 'Clear Sealed Blister with Collector Card',
      certificateOfAuthenticity: false,
      productionRun: 'Global Release Series 11'
    },
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: false,
    isNew: true,
    isPremium: true,
    rating: 4.7,
    reviewCount: 26,
    tags: ['Mazda', 'RX7', 'Kyosho', 'Rotary', '1:64'],
    createdAt: '2026-08-15'
  },
  {
    id: 'dch-007',
    name: 'Lamborghini Countach LPI 800-4 Bianco Siderale',
    brand: 'Mini GT',
    series: 'Exotic Modern Classics',
    category: 'supercars',
    scale: '1:64',
    price: 22.99,
    compareAtPrice: 28.00,
    stock: 31,
    sku: 'MGT-COUNTACH-800',
    description: 'The retro-futuristic reborn Countach celebrating 50 years of scissor-door greatness. Pearlescent Bianco Siderale paint, bronze telephone dial wheels, and glass engine lid viewing ports.',
    specs: {
      scale: '1:64',
      material: 'Die-Cast Metal & ABS Detailing',
      chassis: 'Matte Black Metal Chassis',
      tires: 'Pirelli P-Zero Treaded Rubber Tires',
      openingParts: 'Sealed Bodywork',
      manufacturer: 'TSM Model',
      series: 'Mini GT Hypercar Range',
      releaseYear: 2024,
      packaging: 'Collector Window Box with Hologram Sticker',
      certificateOfAuthenticity: true
    },
    images: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNew: false,
    isPremium: true,
    rating: 4.8,
    reviewCount: 45,
    tags: ['Lamborghini', 'Countach', 'Mini GT', 'Supercar'],
    createdAt: '2026-07-10'
  },
  {
    id: 'dch-008',
    name: 'BMW M3 (E30) Sport Evolution Misano Red',
    brand: 'Solido Heritage',
    series: 'Touring Car Champions',
    category: 'european-cars',
    scale: '1:18',
    price: 64.99,
    compareAtPrice: 75.00,
    stock: 9,
    sku: 'SOL-E30-M3-RED',
    description: 'The homologation hero that defined Group A touring cars. Features opening driver and passenger doors, steerable front axle, iconic box flares, adjustable front splitter, and rear wing gurney flap.',
    specs: {
      scale: '1:18',
      material: 'Heavy Diecast Metal with Plastic Accents',
      chassis: 'Authentic DTM Underfloor Detailing',
      tires: 'BBS Cross-Spoke Wheels with Rubber Tires',
      openingParts: 'Functional Opening Doors and Steerable Wheels',
      manufacturer: 'Solido Models France',
      series: 'Classic Legends 1:18',
      releaseYear: 2024,
      packaging: 'Full Window Presentation Display Packaging',
      certificateOfAuthenticity: true
    },
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: false,
    isPremium: true,
    rating: 4.9,
    reviewCount: 28,
    tags: ['BMW', 'E30 M3', 'Solido', '1:18', 'European'],
    createdAt: '2026-06-20'
  },
  {
    id: 'dch-009',
    name: 'Nissan Silvia S15 Spec-R Vertex Aero Midnight Purple',
    brand: 'Inno64',
    series: 'Drift & Custom Works',
    category: 'jdm',
    scale: '1:64',
    price: 36.00,
    compareAtPrice: 42.00,
    stock: 12,
    sku: 'INNO-S15-MP-09',
    description: 'Full Vertex aero kit with deep Midnight Purple multi-tone color shifting paint. Includes interchangeable custom wheels (Work Meister S1 & Volk TE37) and replacement drift tire set.',
    specs: {
      scale: '1:64',
      material: 'Die-cast Body with Acrylic Headlights',
      chassis: 'Brushed Metal Base Plate',
      tires: 'Cambered Street Low-Profile Rubber Tires',
      openingParts: 'Sealed Custom Body',
      manufacturer: 'Inno Models',
      series: 'Custom Tuner Series',
      releaseYear: 2024,
      packaging: 'Display Base with Transparent Acrylic Showcase',
      certificateOfAuthenticity: true
    },
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNew: true,
    isPremium: true,
    rating: 4.9,
    reviewCount: 53,
    tags: ['Silvia S15', 'Inno64', 'JDM', 'Midnight Purple'],
    createdAt: '2026-08-18'
  },
  {
    id: 'dch-010',
    name: '1969 Ford Mustang Boss 429 Candy Apple Red',
    brand: 'Hot Wheels Premium',
    series: 'Car Culture: American Scene',
    category: 'muscle-cars',
    scale: '1:64',
    price: 18.99,
    compareAtPrice: 22.00,
    stock: 25,
    sku: 'HW-BOSS429-CC',
    description: 'Car Culture premium release featuring all-metal body and base, Real Riders Magnum 500 wheels with Goodyear tires, detailed front grille with galloping pony, and hood scoop.',
    specs: {
      scale: '1:64',
      material: 'Full Diecast Metal/Metal',
      chassis: 'Diecast Base with Detailed Differential',
      tires: 'Real Riders Classic Tires',
      openingParts: 'Sealed Casting with Clear Windows and Interior Gauges',
      manufacturer: 'Mattel Inc.',
      series: 'Car Culture Premium',
      releaseYear: 2024,
      packaging: 'Premium Card with Protective Clamshell Compatibility',
      certificateOfAuthenticity: false
    },
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: false,
    isNew: false,
    isPremium: true,
    rating: 4.7,
    reviewCount: 31,
    tags: ['Mustang', 'Boss 429', 'Hot Wheels', 'Muscle'],
    createdAt: '2026-05-14'
  },
  {
    id: 'dch-011',
    name: 'Aston Martin Valkyrie AMR Pro Track Spec',
    brand: 'Spark Editions',
    series: 'Hypercar Masters',
    category: 'supercars',
    scale: '1:43',
    price: 98.00,
    compareAtPrice: 115.00,
    stock: 6,
    sku: 'SPK-VALK-AMR-43',
    description: 'Extreme LMP1-rivalling aerodynamics engineered by Adrian Newey. Photo-etched front dual elements, shark fin engine stabilization spine, and intricate Cosworth 6.5L V12 exhaust exits.',
    specs: {
      scale: '1:43',
      material: 'Resin & Diecast Precision Mix',
      chassis: 'Full Venturi Tunnel Undertray',
      tires: 'Michelin Competition Slicks on Magnesium Wheels',
      openingParts: 'Sealed Aerodynamic Monocoque',
      manufacturer: 'Spark Models',
      series: 'Modern Track Series',
      releaseYear: 2024,
      packaging: 'Deluxe Engraved Aluminum Plaque Display Case',
      certificateOfAuthenticity: true,
      productionRun: 'Strictly 500 pcs worldwide'
    },
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isLimited: true,
    isRare: true,
    limitedNumber: '#0194/0500',
    rating: 5.0,
    reviewCount: 14,
    tags: ['Aston Martin', 'Valkyrie', '1:43', 'Spark', 'Limited'],
    createdAt: '2026-07-15'
  },
  {
    id: 'dch-012',
    name: 'Honda NSX Type-R (NA1) Championship White',
    brand: 'Inno64',
    series: 'Legend of Type-R',
    category: 'jdm',
    scale: '1:64',
    price: 35.00,
    compareAtPrice: 40.00,
    stock: 16,
    sku: 'INNO-NSX-NA1-CW',
    description: 'The purest analog mid-engine supercar fine-tuned by Ayrton Senna at Suzuka. Features white Enkei alloy wheels, red Honda front and rear badges, exposed titanium shift knob in the cockpit, and black roof canopy.',
    specs: {
      scale: '1:64',
      material: 'Die-Cast Metal Body',
      chassis: 'Cast Metal Underbody with Aerodynamic Strakes',
      tires: 'Yokohama Advan Neova Scale Rubber',
      openingParts: 'Sealed Body with Pop-Up Lights in Raised Position',
      manufacturer: 'Inno Models',
      series: 'Heritage Collection',
      releaseYear: 2024,
      packaging: 'Acrylic Showcase with Screwed Pedestal Base',
      certificateOfAuthenticity: true
    },
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNew: false,
    isPremium: true,
    rating: 4.9,
    reviewCount: 42,
    tags: ['Honda', 'NSX', 'Type-R', 'JDM', 'Inno64'],
    createdAt: '2026-06-30'
  },
  {
    id: 'dch-013',
    name: 'Mercedes-Benz 190E 2.5-16 Evolution II DTM #7',
    brand: 'Tarmac Works',
    series: 'Hobby64 Golden Era',
    category: 'european-cars',
    scale: '1:64',
    price: 33.00,
    compareAtPrice: 38.00,
    stock: 11,
    sku: 'TW-190E-EVO2-07',
    description: 'Klaus Ludwig’s iconic championship winning DTM monster. Features the legendary massive rear wing, flared arches, BBS gold mesh center-lock wheels, and authentic Berlin 2000 livery tampo printing.',
    specs: {
      scale: '1:64',
      material: 'Diecast Metal Body',
      chassis: 'Diecast Base with Exhaust Detail',
      tires: 'Soft Compound Racing Slicks',
      openingParts: 'Sealed Model',
      manufacturer: 'Tarmac Works',
      series: 'Hobby64 Collection',
      releaseYear: 2024,
      packaging: 'Collector Oil Can Display Container with Acrylic Case',
      certificateOfAuthenticity: true,
      productionRun: 'Limited 1,488 pcs worldwide'
    },
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: false,
    isNew: true,
    isPremium: true,
    rating: 4.8,
    reviewCount: 22,
    tags: ['Mercedes', '190E', 'Evo II', 'DTM', 'Tarmac Works'],
    createdAt: '2026-08-08'
  },
  {
    id: 'dch-014',
    name: 'Toyota GR Supra A90 Pandem Rocket Bunny Advan Livery',
    brand: 'Kaido House x Mini GT',
    series: 'Kaido GT Special',
    category: 'jdm',
    scale: '1:64',
    price: 36.99,
    compareAtPrice: 44.00,
    stock: 18,
    sku: 'KH-MG-SUPRA-ADVAN',
    description: 'Aggressive widebody Pandem conversion on the fifth-gen GR Supra. Features an opening hood with BMW B58 3.0L turbo inline-6 details, red and black classic Advan racing livery, and deep-dish wheels.',
    specs: {
      scale: '1:64',
      material: 'Die-cast Body and Metal Base',
      chassis: 'Stamped Metal Base with Jun Imai Signature',
      tires: 'Stretched Sidewall Rubber Tires',
      openingParts: 'Opening Forward Hood',
      manufacturer: 'TSM Model / Mini GT',
      series: 'Kaido House Street Series',
      releaseYear: 2024,
      packaging: 'Deluxe Magnetic Flap Presentation Box',
      certificateOfAuthenticity: true
    },
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNew: true,
    isPremium: true,
    rating: 4.9,
    reviewCount: 37,
    tags: ['Supra', 'Kaido House', 'Advan', 'JDM', 'Pandem'],
    createdAt: '2026-08-22'
  },
  {
    id: 'dch-015',
    name: 'Chevrolet Corvette C8.R GTLM Le Mans Yellow #63',
    brand: 'Mini GT',
    series: 'IMSA Champion Series',
    category: 'muscle-cars',
    scale: '1:64',
    price: 19.99,
    compareAtPrice: 24.00,
    stock: 27,
    sku: 'MGT-C8R-GTLM-63',
    description: 'Mid-engine Corvette racing prowess. Features the signature Accelerate Yellow and silver livery, carbon rear diffuser, high-mounted rear wing, and Michelin yellow tire letterings.',
    specs: {
      scale: '1:64',
      material: 'Die-cast Body and Metal Base',
      chassis: 'Aerodynamic Underbody',
      tires: 'Competition Rubber Slicks',
      openingParts: 'Sealed Body',
      manufacturer: 'TSM Model',
      series: 'Mini GT IMSA',
      releaseYear: 2024,
      packaging: 'Cardboard Window Box with Blister',
      certificateOfAuthenticity: true
    },
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: false,
    isNew: false,
    isPremium: true,
    rating: 4.7,
    reviewCount: 19,
    tags: ['Corvette', 'C8.R', 'Mini GT', 'IMSA'],
    createdAt: '2026-04-12'
  },
  {
    id: 'dch-016',
    name: 'Audi Sport Quattro S1 E2 Group B Rally Monte Carlo',
    brand: 'Tarmac Works',
    series: 'Group B Monsters',
    category: 'rare-finds',
    scale: '1:43',
    price: 74.00,
    compareAtPrice: 85.00,
    stock: 5,
    sku: 'TW-AUDI-S1E2-43',
    description: 'The winged icon of rally’s wildest era driven by Walter Röhrl. Features authentic night auxiliary rally light pod on the bonnet, massive snow-plow front wings, and weathered snow tire treads.',
    specs: {
      scale: '1:43',
      material: 'Diecast Metal with Etched Photo Parts',
      chassis: 'Underbody Gravel Guards',
      tires: 'Studded Winter Rally Rubber Tires',
      openingParts: 'Sealed Rally Model',
      manufacturer: 'Tarmac Works',
      series: 'Rally Heritage 1:43',
      releaseYear: 2024,
      packaging: 'Collector Tin Box with Foam Insert & Numbered Plate',
      certificateOfAuthenticity: true,
      productionRun: 'Limited to 999 units'
    },
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1000&auto=format&fit=crop'
    ],
    isFeatured: true,
    isRare: true,
    isLimited: true,
    limitedNumber: '#0382/0999',
    rating: 5.0,
    reviewCount: 29,
    tags: ['Audi', 'Quattro', 'Group B', 'Tarmac Works', 'Rally'],
    createdAt: '2026-07-19'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp-01',
    code: 'COLLECTOR10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 40,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usedCount: 142,
    isActive: true
  },
  {
    id: 'cp-02',
    code: 'FIRST50',
    discountType: 'fixed',
    value: 50,
    minOrderValue: 200,
    expiryDate: '2026-12-31',
    usageLimit: 100,
    usedCount: 38,
    isActive: true
  },
  {
    id: 'cp-03',
    code: 'RLCVIP',
    discountType: 'percentage',
    value: 15,
    minOrderValue: 100,
    expiryDate: '2026-12-31',
    usageLimit: 200,
    usedCount: 77,
    isActive: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    productId: 'dch-001',
    author: 'Marcus Vance',
    rating: 5,
    date: '2026-08-28',
    title: 'The paint and engine detail on this R34 are mind-blowing',
    comment: 'I collect 1:64 high-end models (Inno64, Kyosho, TSM) and this Kaido House R34 is easily the crown jewel in my display case. The opening hood mechanism is sturdy, the RB26 has real intake pipes and painted rocker cover, and the stance is perfect.',
    verified: true,
    helpfulCount: 24,
    scalePurchased: '1:64'
  },
  {
    id: 'rev-002',
    productId: 'dch-003',
    author: 'Ethan Gallagher',
    rating: 5,
    date: '2026-08-20',
    title: 'Flawless packaging and pristine Spectraflame finish',
    comment: 'DieCastHub ships these like Fort Knox. The acrylic case was wrapped in double bubble wrap inside a reinforced collector box. No corner bends or card creases. True collector store experience!',
    verified: true,
    helpfulCount: 31,
    scalePurchased: '1:64'
  },
  {
    id: 'rev-003',
    productId: 'dch-002',
    author: 'Stefan Lindqvist',
    rating: 5,
    date: '2026-08-14',
    title: '1:43 Weissach perfection from Spark',
    comment: 'The carbon fiber weave pattern on the swan-neck wing and roof is reproduced with razor sharpness. Brake calipers actually have the Porsche scripts. Outstanding curation by DieCastHub.',
    verified: true,
    helpfulCount: 19,
    scalePurchased: '1:43'
  },
  {
    id: 'rev-004',
    productId: 'dch-004',
    author: 'David Romero',
    rating: 5,
    date: '2026-08-22',
    title: 'Removable clamshell is pure art',
    comment: 'Being able to lift the rear cover to inspect the twin intercoolers and exhaust manifold in 1:64 scale is insane engineering. Inno64 really knocked this Ferrari F40 LM out of the park.',
    verified: true,
    helpfulCount: 15,
    scalePurchased: '1:64'
  }
];

export const INITIAL_USER: User = {
  id: 'usr-collector-01',
  name: 'Alex Mercer',
  email: 'alex.mercer@collector.com',
  role: 'customer',
  phone: '+1 (555) 234-8910',
  tier: 'Gold',
  addresses: [
    {
      id: 'addr-01',
      name: 'Alex Mercer',
      street: '450 Motorsport Way, Suite 8',
      apartment: 'Apt 4B',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'United States',
      phone: '+1 (555) 234-8910',
      isDefault: true
    },
    {
      id: 'addr-02',
      name: 'Alex Mercer (Studio)',
      street: '120 Speedway Blvd',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'United States',
      phone: '+1 (555) 234-8910',
      isDefault: false
    }
  ],
  memberSince: '2024-03-15',
  totalOrders: 6
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'DCH-88219',
    createdAt: '2026-09-08T14:30:00Z',
    customer: {
      id: 'usr-collector-01',
      name: 'Alex Mercer',
      email: 'alex.mercer@collector.com',
      phone: '+1 (555) 234-8910'
    },
    shippingAddress: {
      id: 'addr-01',
      name: 'Alex Mercer',
      street: '450 Motorsport Way, Suite 8',
      apartment: 'Apt 4B',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'United States',
      phone: '+1 (555) 234-8910',
      isDefault: true
    },
    deliveryMethod: {
      id: 'express',
      name: 'Collector Vault Priority (Insured)',
      price: 12.00,
      estimatedDays: '2-3 Business Days'
    },
    paymentMethod: {
      type: 'credit_card',
      lastFour: '4242'
    },
    items: [
      {
        productId: 'dch-001',
        name: 'Nissan Skyline GT-R (R34) V-Spec II Kaido Works',
        brand: 'Kaido House x Mini GT',
        scale: '1:64',
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop',
        price: 34.99,
        quantity: 1,
        sku: 'KH-MG-R34-01'
      },
      {
        productId: 'dch-004',
        name: 'Ferrari F40 LM Competizione Rosso Corsa',
        brand: 'Inno64',
        scale: '1:64',
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=600&auto=format&fit=crop',
        price: 38.50,
        quantity: 1,
        sku: 'INNO-F40-LM-RC'
      }
    ],
    subtotal: 73.49,
    discount: 7.35,
    shippingCost: 12.00,
    tax: 5.88,
    total: 84.02,
    status: 'shipped',
    trackingNumber: 'DCH-TRK-99482104US',
    carrier: 'FedEx Collector Priority',
    estimatedDeliveryDate: '2026-09-15',
    timeline: [
      {
        status: 'confirmed',
        label: 'Order Confirmed',
        timestamp: '2026-09-08 14:30',
        completed: true,
        notes: 'Payment verified and items allocated from climate-controlled warehouse.'
      },
      {
        status: 'packed',
        label: 'Packed in Collector Armor',
        timestamp: '2026-09-09 09:15',
        completed: true,
        notes: 'Double-bubble cushioned with corner protectors and tamper-evident seal.'
      },
      {
        status: 'shipped',
        label: 'Handed to Courier',
        timestamp: '2026-09-10 11:40',
        completed: true,
        notes: 'En route via FedEx Collector Priority, Austin Hub.'
      },
      {
        status: 'out_for_delivery',
        label: 'Out for Delivery',
        completed: false,
        notes: 'Courier will deliver to confirmed recipient signature.'
      },
      {
        status: 'delivered',
        label: 'Delivered',
        completed: false,
        notes: 'Safe delivery confirmed.'
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'DCH-90432',
    createdAt: '2026-09-12T18:20:00Z',
    customer: {
      id: 'usr-collector-01',
      name: 'Alex Mercer',
      email: 'alex.mercer@collector.com',
      phone: '+1 (555) 234-8910'
    },
    shippingAddress: {
      id: 'addr-01',
      name: 'Alex Mercer',
      street: '450 Motorsport Way, Suite 8',
      apartment: 'Apt 4B',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'United States',
      phone: '+1 (555) 234-8910',
      isDefault: true
    },
    deliveryMethod: {
      id: 'standard',
      name: 'Standard Insured Collector Shipping',
      price: 6.95,
      estimatedDays: '3-5 Business Days'
    },
    paymentMethod: {
      type: 'apple_pay'
    },
    items: [
      {
        productId: 'dch-003',
        name: '1970 Dodge Charger R/T "Black Ghost" RLC Exclusive',
        brand: 'Hot Wheels RLC',
        scale: '1:64',
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=600&auto=format&fit=crop',
        price: 135.00,
        quantity: 1,
        sku: 'RLC-DODGE-70-BG'
      }
    ],
    subtotal: 135.00,
    discount: 13.50,
    shippingCost: 0.00,
    tax: 9.72,
    total: 131.22,
    status: 'packed',
    trackingNumber: 'DCH-TRK-77129031US',
    carrier: 'UPS Air Insured',
    estimatedDeliveryDate: '2026-09-17',
    timeline: [
      {
        status: 'confirmed',
        label: 'Order Confirmed',
        timestamp: '2026-09-12 18:20',
        completed: true,
        notes: 'Serial verification completed: Serial piece #0142 authenticated.'
      },
      {
        status: 'packed',
        label: 'Packed in Collector Armor',
        timestamp: '2026-09-13 10:00',
        completed: true,
        notes: 'Sealed inside rigid collector casing.'
      },
      {
        status: 'shipped',
        label: 'Handed to Courier',
        completed: false
      },
      {
        status: 'out_for_delivery',
        label: 'Out for Delivery',
        completed: false
      },
      {
        status: 'delivered',
        label: 'Delivered',
        completed: false
      }
    ]
  }
];
