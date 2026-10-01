import React from 'react';

// Beach clean-up illustration
export const BeachCleanupIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-40' }) => (
  <svg viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E9F2EE" />
        <stop offset="100%" stopColor="#F9F6F0" />
      </linearGradient>
      <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4A8B7C" />
        <stop offset="100%" stopColor="#68A89A" />
      </linearGradient>
      <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EBDCB9" />
        <stop offset="100%" stopColor="#D9C79E" />
      </linearGradient>
    </defs>
    <rect width="340" height="160" rx="16" fill="url(#skyGrad)" />
    
    {/* Sun */}
    <circle cx="280" cy="40" r="22" fill="#F4CF65" fillOpacity="0.85" />
    <circle cx="280" cy="40" r="30" fill="#F4CF65" fillOpacity="0.2" />

    {/* Distant palm trees silhouette */}
    <path d="M40 75 Q45 55 52 50 Q56 60 52 75 Z" fill="#254B2A" fillOpacity="0.5" />
    <path d="M48 50 Q60 50 68 55 Q56 60 48 50 Z" fill="#254B2A" fillOpacity="0.5" />
    <path d="M48 50 Q38 46 28 52 Q38 58 48 50 Z" fill="#254B2A" fillOpacity="0.5" />
    <path d="M48 50 L46 85" stroke="#254B2A" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" />

    {/* Ocean waves */}
    <path d="M0 80 C60 76 120 84 180 78 C240 72 300 82 340 77 L340 100 L0 100 Z" fill="url(#oceanGrad)" />
    <path d="M0 90 C70 88 150 94 220 90 C290 86 320 92 340 89 L340 160 L0 160 Z" fill="url(#sandGrad)" />

    {/* Surf foam line */}
    <path d="M0 90 C70 88 150 94 220 90 C290 86 320 92 340 89" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" fill="none" strokeDasharray="6 4" />

    {/* Waste collection bags (Green & Jute sacks) */}
    <path d="M110 115 C110 105 125 105 128 115 C130 125 108 128 110 115 Z" fill="#254B2A" />
    <path d="M124 118 C124 110 138 110 140 118 C142 128 122 130 124 118 Z" fill="#CE6B42" />
    <path d="M102 122 C102 116 114 116 116 122 C118 129 100 130 102 122 Z" fill="#507855" />

    {/* Two Youth Volunteers Silhouette */}
    <g transform="translate(180, 72)">
      {/* Person 1 (holding picker stick) */}
      <circle cx="16" cy="12" r="5" fill="#254B2A" />
      <path d="M12 18 C12 18 16 17 20 18 L22 36 L17 48 L13 48 L17 34 L12 28 Z" fill="#254B2A" />
      {/* Arm with reach stick */}
      <path d="M19 22 L32 30 L40 45" stroke="#254B2A" strokeWidth="2" strokeLinecap="round" />
      
      {/* Person 2 (holding bucket) */}
      <circle cx="52" cy="16" r="4.5" fill="#3D5A43" />
      <path d="M48 22 C48 22 53 21 57 22 L58 38 L54 50 L51 50 L53 36 L47 30 Z" fill="#3D5A43" />
      <path d="M47 24 L42 34 L38 34" stroke="#3D5A43" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M37 32 L40 42 L35 42 L33 32 Z" fill="#9EE08E" />
    </g>

    {/* Marine debris items collected */}
    <circle cx="148" cy="132" r="3" fill="#3B82F6" fillOpacity="0.8" />
    <rect x="156" y="130" width="8" height="4" rx="1.5" fill="#EF4444" fillOpacity="0.8" />
  </svg>
);

// Upcycled denim before/after graphic
export const UpcycleDenimIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-40' }) => (
  <svg viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="denimGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3B5F7F" />
        <stop offset="100%" stopColor="#253E57" />
      </linearGradient>
      <linearGradient id="umbrellaGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E2724D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    
    <rect width="340" height="160" rx="16" fill="#F4EFE6" />

    {/* Left side: Torn Jeans */}
    <g transform="translate(25, 20)">
      <rect x="0" y="0" width="130" height="120" rx="12" fill="#E8E1D5" />
      <text x="65" y="20" fill="#716A5E" fontSize="10" fontWeight="600" textAnchor="middle">BEFORE (WASTE)</text>
      
      {/* Jeans visual */}
      <path d="M45 35 L85 35 L82 55 L75 105 L67 105 L65 65 L63 65 L61 105 L53 105 L46 55 Z" fill="url(#denimGrad)" />
      {/* Tears & distressing */}
      <line x1="52" y1="70" x2="58" y2="70" stroke="#FAF7F2" strokeWidth="1.5" strokeDasharray="1 1" />
      <line x1="51" y1="74" x2="59" y2="74" stroke="#FAF7F2" strokeWidth="1.5" strokeDasharray="1 1" />
      <line x1="68" y1="82" x2="74" y2="82" stroke="#FAF7F2" strokeWidth="1.5" strokeDasharray="1 1" />
      {/* Badge */}
      <rect x="25" y="98" width="80" height="16" rx="8" fill="#CE6B42" fillOpacity="0.15" />
      <text x="65" y="109" fill="#B24F25" fontSize="8.5" fontWeight="700" textAnchor="middle">2x Discarded Jeans</text>
    </g>

    {/* Center Transformation Circular Flow Arrow */}
    <g transform="translate(156, 68)">
      <circle cx="14" cy="14" r="15" fill="#254B2A" />
      <path d="M10 14 L16 10 L16 13 L21 13 L21 15 L16 15 L16 18 Z" fill="#9EE08E" />
    </g>

    {/* Right side: Upcycled Tote */}
    <g transform="translate(185, 20)">
      <rect x="0" y="0" width="130" height="120" rx="12" fill="#E3EDE4" />
      <text x="65" y="20" fill="#254B2A" fontSize="10" fontWeight="700" textAnchor="middle">AFTER (CIRCULAR)</text>

      {/* Crossbody Tote Bag */}
      {/* Strap */}
      <path d="M42 35 C42 22 88 22 88 35" stroke="#CE6B42" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Bag Body */}
      <rect x="40" y="38" width="50" height="48" rx="6" fill="url(#denimGrad)" />
      {/* Contrast Stitching & Pocket */}
      <rect x="48" y="48" width="34" height="24" rx="4" fill="#1E3247" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 1.5" />
      {/* Umbrella Lining Peeking */}
      <path d="M43 40 L87 40 L85 45 L45 45 Z" fill="url(#umbrellaGrad)" />
      {/* Brass rivet */}
      <circle cx="50" cy="52" r="1.5" fill="#F4CF65" />
      <circle cx="80" cy="52" r="1.5" fill="#F4CF65" />

      {/* Badge */}
      <rect x="20" y="98" width="90" height="16" rx="8" fill="#254B2A" fillOpacity="0.15" />
      <text x="65" y="109" fill="#254B2A" fontSize="8.5" fontWeight="700" textAnchor="middle">Weatherproof Carry</text>
    </g>
  </svg>
);

// Terrace Seedling illustration
export const TerraceSeedlingIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-40' }) => (
  <svg viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="bgSeed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EFF6F1" />
        <stop offset="100%" stopColor="#E2ECE5" />
      </linearGradient>
    </defs>
    <rect width="340" height="160" rx="16" fill="url(#bgSeed)" />
    
    {/* Balcony Railing */}
    <line x1="20" y1="120" x2="320" y2="120" stroke="#7A8E80" strokeWidth="2.5" />
    <line x1="60" y1="120" x2="60" y2="160" stroke="#7A8E80" strokeWidth="2" />
    <line x1="120" y1="120" x2="120" y2="160" stroke="#7A8E80" strokeWidth="2" />
    <line x1="180" y1="120" x2="180" y2="160" stroke="#7A8E80" strokeWidth="2" />
    <line x1="240" y1="120" x2="240" y2="160" stroke="#7A8E80" strokeWidth="2" />
    <line x1="300" y1="120" x2="300" y2="160" stroke="#7A8E80" strokeWidth="2" />

    {/* Planter Pots in a row with sprouting saplings */}
    {/* Pot 1 */}
    <g transform="translate(45, 75)">
      <path d="M12 25 L38 25 L34 50 L16 50 Z" fill="#CE6B42" />
      <ellipse cx="25" cy="25" rx="13" ry="3" fill="#A8522E" />
      {/* Sprout */}
      <path d="M25 24 Q24 10 18 5 Q24 7 25 15 Q26 7 32 5 Q26 10 25 24" fill="#507855" />
      <path d="M25 18 Q33 14 36 8 Q29 11 25 16" fill="#9EE08E" />
    </g>

    {/* Pot 2 (Larger Kumbuk sapling) */}
    <g transform="translate(105, 55)">
      <path d="M10 40 L45 40 L40 70 L15 70 Z" fill="#966042" />
      <ellipse cx="27" cy="40" rx="17" ry="4" fill="#78482D" />
      {/* Tree Sapling */}
      <path d="M27 40 L27 15" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
      <circle cx="27" cy="12" r="14" fill="#254B2A" />
      <circle cx="21" cy="8" r="8" fill="#507855" />
      <circle cx="33" cy="9" r="8" fill="#7CA982" />
      <circle cx="27" cy="6" r="6" fill="#9EE08E" />
    </g>

    {/* Pot 3 */}
    <g transform="translate(180, 70)">
      <path d="M12 30 L40 30 L36 55 L16 55 Z" fill="#D4815F" />
      <ellipse cx="26" cy="30" rx="14" ry="3.5" fill="#B36545" />
      {/* Sprout */}
      <path d="M26 30 Q27 12 34 8 Q29 12 26 20 Q24 14 18 10 Q23 16 26 30" fill="#254B2A" />
    </g>

    {/* Pot 4 (Balcony coir tray) */}
    <g transform="translate(245, 80)">
      <rect x="5" y="25" width="55" height="20" rx="4" fill="#4A3B32" />
      <circle cx="18" cy="22" r="4" fill="#9EE08E" />
      <circle cx="28" cy="20" r="5" fill="#507855" />
      <circle cx="38" cy="21" r="4.5" fill="#9EE08E" />
      <circle cx="48" cy="23" r="4" fill="#507855" />
    </g>

    {/* Sun and butterflies */}
    <circle cx="40" cy="30" r="14" fill="#F4CF65" fillOpacity="0.7" />
    <path d="M160 30 Q163 26 166 30 Q169 26 172 30 Q166 34 160 30" fill="#CE6B42" />
  </svg>
);

// Product Visuals
export const ProductVisual: React.FC<{ type: string; className?: string }> = ({ type, className = 'w-full h-32' }) => {
  switch (type) {
    case 'denim_tote':
      return (
        <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="160" height="140" rx="12" fill="#E8EDF2" />
          {/* Strap */}
          <path d="M50 32 C50 14 110 14 110 32" stroke="#CE6B42" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Tote Body */}
          <rect x="42" y="34" width="76" height="78" rx="8" fill="#2B4C6F" />
          {/* Outer pocket */}
          <rect x="54" y="52" width="52" height="38" rx="5" fill="#1C334D" stroke="#E5A84B" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Tag */}
          <rect x="94" y="58" width="6" height="10" rx="1" fill="#CE6B42" />
          {/* Repurposed umbrella inner trim */}
          <path d="M46 36 L114 36 L110 42 L50 42 Z" fill="#F59E0B" />
        </svg>
      );
    case 'coconut_bowl':
      return (
        <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="160" height="140" rx="12" fill="#F5EFE6" />
          {/* Shadow */}
          <ellipse cx="80" cy="108" rx="42" ry="10" fill="#E2D4BE" />
          {/* Coconut Half Shell */}
          <path d="M40 70 C40 102 120 102 120 70 Z" fill="#5A3A28" />
          <ellipse cx="80" cy="70" rx="40" ry="14" fill="#3D2517" />
          <ellipse cx="80" cy="70" rx="35" ry="11" fill="#6B4530" />
          {/* Wooden spoon */}
          <path d="M60 48 Q80 75 105 85 L108 82 Q84 72 63 46 Z" fill="#C29A6F" />
          <circle cx="60" cy="46" r="6" fill="#C29A6F" />
        </svg>
      );
    case 'monstera_node':
      return (
        <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="160" height="140" rx="12" fill="#EDF4EE" />
          {/* Terracotta pot */}
          <path d="M56 82 L104 82 L98 116 L62 116 Z" fill="#CE6B42" />
          <rect x="52" y="76" width="56" height="8" rx="2" fill="#B35832" />
          <ellipse cx="80" cy="82" rx="22" ry="3.5" fill="#4A3427" />
          {/* Stem & Node */}
          <path d="M80 82 Q80 50 68 35" stroke="#3D5A43" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Monstera leaf with fenestrations */}
          <path d="M68 35 C50 20 40 45 55 58 C68 70 75 52 68 35 Z" fill="#254B2A" />
          {/* Fenestration holes */}
          <ellipse cx="56" cy="38" rx="2" ry="5" transform="rotate(-30 56 38)" fill="#EDF4EE" />
          <ellipse cx="64" cy="46" rx="2" ry="4" transform="rotate(-15 64 46)" fill="#EDF4EE" />
        </svg>
      );
    case 'shampoo_bar':
      return (
        <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="160" height="140" rx="12" fill="#F0F4EC" />
          {/* Herbal Bar with textured herbs */}
          <rect x="45" y="48" width="70" height="54" rx="8" fill="#507855" />
          <rect x="42" y="45" width="70" height="54" rx="8" fill="#7CA982" />
          {/* Botanical leaf impression */}
          <path d="M77 60 Q70 72 77 84 Q84 72 77 60 Z" fill="#254B2A" />
          <line x1="77" y1="60" x2="77" y2="84" stroke="#9EE08E" strokeWidth="1" />
          {/* Coconut/herb specks */}
          <circle cx="56" cy="58" r="1.5" fill="#FAF7F2" />
          <circle cx="94" cy="64" r="1.5" fill="#FAF7F2" />
          <circle cx="62" cy="82" r="1.5" fill="#FAF7F2" />
          <circle cx="90" cy="86" r="1.5" fill="#FAF7F2" />
        </svg>
      );
    case 'tube_wallet':
    default:
      return (
        <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="160" height="140" rx="12" fill="#EAE8E3" />
          {/* Upcycled Rubber Wallet */}
          <rect x="42" y="46" width="76" height="54" rx="6" fill="#1C1F1D" />
          {/* Flap & Orange Linen Stitching */}
          <line x1="44" y1="52" x2="116" y2="52" stroke="#CE6B42" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="44" y1="94" x2="116" y2="94" stroke="#CE6B42" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Tire tread pattern embossing */}
          <path d="M60 62 L70 72 L60 82" stroke="#333A35" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M75 62 L85 72 L75 82" stroke="#333A35" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M90 62 L100 72 L90 82" stroke="#333A35" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
};
