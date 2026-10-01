import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, RefreshCw, ShoppingBag, ArrowLeftRight, Check, Tag } from 'lucide-react';
import { MarketplaceItem } from '../../types';
import { ProductVisual } from '../illustrations/EcoIllustrations';

interface MarketplaceScreenProps {
  items: MarketplaceItem[];
  seedBalance: number;
  onSelectItem: (item: MarketplaceItem) => void;
  onRedeemDiscount: () => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  items,
  seedBalance,
  onSelectItem,
  onRedeemDiscount,
}) => {
  const [activeMode, setActiveMode] = useState<'buy' | 'swap' | 'freecycle'>('buy');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'fashion' | 'home' | 'plants' | 'beauty'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.maker.toLowerCase().includes(q) ||
        item.condition.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-full pb-24 text-[#1E3024]">
      {/* Top App Bar */}
      <div className="pt-3 px-5 pb-3 sticky top-0 z-20 bg-[#F4EFE6]/90 backdrop-blur-md border-b border-[#EAE3D4]/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#647868]">
              Circular Bazaar
            </span>
            <h1 className="font-display font-bold text-lg text-[#1E3024] tracking-tight">
              Eco Marketplace
            </h1>
          </div>

          <div className="flex items-center gap-1.5 bg-[#E3EDE4] border border-[#CCE0CD] rounded-full px-3 py-1 text-xs font-semibold text-[#254B2A]">
            <span>🌱</span>
            <span className="font-mono tabular-nums">{seedBalance} Seeds</span>
          </div>
        </div>

        {/* Circular Mode Switcher */}
        <div className="flex items-center p-1 bg-[#EAE3D4] rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveMode('buy')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeMode === 'buy'
                ? 'bg-white text-[#1E3024] shadow-xs font-semibold'
                : 'text-[#647868] hover:text-[#1E3024]'
            }`}
          >
            Buy & Support
          </button>
          <button
            onClick={() => setActiveMode('swap')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeMode === 'swap'
                ? 'bg-white text-[#1E3024] shadow-xs font-semibold'
                : 'text-[#647868] hover:text-[#1E3024]'
            }`}
          >
            <ArrowLeftRight size={12} />
            <span>Peer Swap</span>
          </button>
          <button
            onClick={() => setActiveMode('freecycle')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeMode === 'freecycle'
                ? 'bg-white text-[#1E3024] shadow-xs font-semibold'
                : 'text-[#647868] hover:text-[#1E3024]'
            }`}
          >
            Freecycle 🎁
          </button>
        </div>
      </div>

      <div className="px-5 pt-3 space-y-4">
        {/* Seed Balance Reward Card */}
        <div className="bg-gradient-to-r from-[#254B2A] to-[#396540] rounded-2xl p-4 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold text-[#9EE08E] uppercase tracking-wider">
                Youth Eco Currency
              </span>
              <span className="text-xs font-mono font-bold text-[#9EE08E] bg-white/10 px-2 py-0.5 rounded-full">
                {seedBalance} Seeds
              </span>
            </div>
            <h3 className="font-display font-bold text-sm tracking-tight">
              Turn your clean-up actions into circular perks
            </h3>
            <p className="text-[11px] text-[#E0EBDC] mt-0.5">
              Redeem up to 50% discount on artisan upcycled goods with verified seeds.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onRedeemDiscount}
                className="bg-[#9EE08E] text-[#19321D] px-3 py-1.5 rounded-xl font-display font-bold text-xs hover:bg-[#8CD87B] transition-colors"
              >
                Redeem for -25% Off
              </motion.button>
              <span className="text-[10px] text-[#D0E2D2]">Costs 200 Seeds</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-[#7A8E7F]" />
          <input
            type="text"
            placeholder="Search circular items, makers, materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-[#DDD5C5] text-xs placeholder:text-[#8E9E92] focus:outline-none focus:ring-1 focus:ring-[#254B2A] transition-all"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              categoryFilter === 'all'
                ? 'bg-[#254B2A] text-white font-medium'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            All Drops
          </button>
          <button
            onClick={() => setCategoryFilter('fashion')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              categoryFilter === 'fashion'
                ? 'bg-[#254B2A] text-white font-medium'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Upcycled Fashion 👖
          </button>
          <button
            onClick={() => setCategoryFilter('home')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              categoryFilter === 'home'
                ? 'bg-[#254B2A] text-white font-medium'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Zero Waste Home 🥥
          </button>
          <button
            onClick={() => setCategoryFilter('plants')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              categoryFilter === 'plants'
                ? 'bg-[#254B2A] text-white font-medium'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Plant Cuttings 🌿
          </button>
          <button
            onClick={() => setCategoryFilter('beauty')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              categoryFilter === 'beauty'
                ? 'bg-[#254B2A] text-white font-medium'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Plastic-Free Care 🧴
          </button>
        </div>

        {/* Curated Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-2xl p-2.5 border border-[#E3DDD1] hover:border-[#254B2A]/50 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Visual card */}
                <div className="rounded-xl overflow-hidden mb-2 relative">
                  <ProductVisual type={item.visualType} className="w-full h-28" />
                  <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#254B2A]/90 text-[#FAF7F2] backdrop-blur-xs">
                    {item.condition}
                  </span>
                </div>

                {/* Maker & Location (Clean unboxed text) */}
                <div className="text-[10px] text-[#718274] truncate">
                  <span>{item.maker}</span>
                  <span className="mx-1">·</span>
                  <span>{item.location}</span>
                </div>

                {/* Title */}
                <h4 className="font-display font-semibold text-xs text-[#1E3024] line-clamp-2 mt-0.5 leading-snug group-hover:text-[#254B2A] transition-colors">
                  {item.title}
                </h4>

                {/* Impact Stat */}
                <div className="text-[10px] text-[#254B2A] font-medium mt-1 line-clamp-1">
                  🌿 {item.impactSummary}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-2.5 pt-2 border-t border-[#F0EAE0] flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-xs text-[#1E3024] tabular-nums">
                    LKR {item.priceLkr.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-mono text-[#718274] tabular-nums">
                    or {item.seedPrice} Seeds
                  </div>
                </div>

                <button className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#DDD5C5] group-hover:bg-[#254B2A] group-hover:text-white flex items-center justify-center transition-colors">
                  <ShoppingBag size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Guarantee Notice */}
        <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D3] text-center">
          <p className="text-xs font-semibold text-[#1E3024]">
            100% Verified Circular Economy
          </p>
          <p className="text-[11px] text-[#6B7D6F] mt-0.5 leading-relaxed">
            Every product avoids virgin industrial production. Zero single-use plastic packaging guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
};
