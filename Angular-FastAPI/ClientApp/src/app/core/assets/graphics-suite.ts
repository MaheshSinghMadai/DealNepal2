// Graphics Suite & Image Asset Mappings for DealNepal Luxury Auction Platform

export interface GraphicAsset {
  id: string;
  title: string;
  category: string;
  url: string;
  hdResolutionUrl: string;
  description: string;
  accentColor: string;
  svgBadge?: string;
}

export const DEALNEPAL_BRAND_GRAPHICS = {
  logoSvg: `
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="dealnepal-brand-logo-svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="50%" stop-color="#FBBF24" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
        <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366F1" />
          <stop offset="100%" stop-color="#4F46E5" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Mountain Peak Lotus Foundation -->
      <path d="M30 6L48 44H12L30 6Z" fill="url(#indigoGrad)" opacity="0.4" />
      <path d="M30 14L44 44H16L30 14Z" fill="url(#goldGrad)" />
      <!-- Stylized Gavel Emblem -->
      <circle cx="30" cy="22" r="6" fill="#0F172A" />
      <rect x="23" y="32" width="14" height="4" rx="2" fill="#FFFFFF" />
      <rect x="28" y="24" width="4" height="14" rx="2" fill="url(#goldGrad)" filter="url(#glow)" />
    </svg>
  `,
  escrowBadgeSvg: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-emerald-400">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `,
  livePulseSvg: `
    <svg viewBox="0 0 24 24" class="w-4 h-4 text-emerald-400 animate-spin">
      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
    </svg>
  `
};

export const CATEGORY_GRAPHICS_COLLECTION: GraphicAsset[] = [
  {
    id: 'art-cat',
    title: 'Sacred Art & Thangkas',
    category: 'Art',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    hdResolutionUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=90',
    description: 'Gold-leaf illuminated mandalas, ancient Newari paubha scrolls, and Tibetan Buddhist Thangka paintings.',
    accentColor: '#f59e0b'
  },
  {
    id: 'coins-cat',
    title: 'Royal Numismatics & Coins',
    category: 'Coins',
    url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
    hdResolutionUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1600&q=90',
    description: 'Historic silver Malla dynasty Mohar coins, Shah era gold mohars, and rare Himalayan currency artifacts.',
    accentColor: '#10b981'
  },
  {
    id: 'jewellery-cat',
    title: 'Royal Heritage Jewellery',
    category: 'Jewellery',
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    hdResolutionUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90',
    description: 'Traditional 22K gold Tilhari, Nau-gedi, gemstone bridal crowns, and filigree emerald ornaments.',
    accentColor: '#ec4899'
  },
  {
    id: 'furniture-cat',
    title: 'Master Woodcraft & Antiques',
    category: 'Furniture',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    hdResolutionUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=90',
    description: 'Hand-carved Newari Mayur Jhyal (Peacock Windows), teakwood royal thrones, and temple architectural relief.',
    accentColor: '#8b5cf6'
  }
];

export const HERO_SLIDES_GRAPHICS = [
  {
    title: 'Sacred Gold Thangka Art',
    category: 'Art',
    tagline: '18th Century Nepal Sacred Mandala',
    desc: 'Intricate gold-leaf illumination on hand-spun silk scroll depicting Kalachakra mandala.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1400&q=85',
    currentBid: 'NPR 185,000',
    bidCount: 24,
    badgeText: 'FEATURED MASTERPIECE'
  },
  {
    title: 'Ancient Malla Dynasty Silver Mohar',
    category: 'Coins',
    tagline: 'Minted Circa 1640 AD in Bhaktapur',
    desc: 'Uncirculated silver coinage featuring sacred trident and Newari scripts.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1400&q=85',
    currentBid: 'NPR 45,500',
    bidCount: 38,
    badgeText: 'HISTORICAL NUMISMATIC'
  },
  {
    title: 'Royal 22K Emerald Tilhari Necklace',
    category: 'Jewellery',
    tagline: 'Traditional Nepalese Bridal Royalty',
    desc: 'Handcrafted filigree gold set with natural ruby beads and untreated Zambian emeralds.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85',
    currentBid: 'NPR 320,000',
    bidCount: 52,
    badgeText: 'LUXURY JEWELRY'
  },
  {
    title: 'Hand-Carved Teak Peacock Window',
    category: 'Furniture',
    tagline: 'Authentic Bhaktapur Craftsmanship',
    desc: 'Intricate Newari Mayur Jhyal carved from single vintage teakwood block.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=85',
    currentBid: 'NPR 120,000',
    bidCount: 19,
    badgeText: 'CARVED WOODCRAFT'
  }
];
