import React from 'react';
import { motion } from 'motion/react';
import { X, Check, ShieldCheck, Heart, Sparkles, ShoppingBag, ArrowLeftRight } from 'lucide-react';
import { MarketplaceItem } from '../../types';
import { ProductVisual } from '../illustrations/EcoIllustrations';

interface ProductDetailModalProps {
  item: MarketplaceItem | null;
  onClose: () => void;
  onBuyWithSeeds: (item: MarketplaceItem) => void;
  seedBalance: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onBuyWithSeeds,
  seedBalance,
}) => {
  if (!item) return null;

  const canAffordSeeds = seedBalance >= item.seedPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#FAF7F2] rounded-3xl p-5 w-full max-w-sm border border-[#E3DDD1] shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#DDD5C5] flex items-center justify-center text-[#6B7D6F] hover:text-[#1E3024]"
        >
          <X size={16} />
        </button>

        {/* Visual Header */}
        <div className="rounded-2xl overflow-hidden mb-3 border border-[#DDD5C5] bg-white">
          <ProductVisual type={item.visualType} className="w-full h-44" />
        </div>

        {/* Maker & Title */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#718274] font-medium">
            <span>{item.maker}</span>
            <span className="font-mono text-[10px] text-[#A29787]">{item.makerHandle}</span>
            <span>·</span>
            <span>{item.location}</span>
          </div>

          <h2 className="font-display font-bold text-base text-[#1E3024] leading-snug mt-1">
            {item.title}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-display font-bold text-[#254B2A] bg-[#E3EDE4] px-2.5 py-0.5 rounded-full">
              {item.condition}
            </span>
            <span className="text-xs text-[#CE6B42] font-semibold">
              🌿 {item.impactSummary}
            </span>
          </div>
        </div>

        {/* Story & Description */}
        <div className="mt-3 pt-3 border-t border-[#EAE3D4] space-y-2">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#647868]">
              Circular Provenance & Maker Story
            </h4>
            <p className="text-xs text-[#526456] leading-relaxed mt-0.5">
              {item.makerStory}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#647868]">
              Material Specifications
            </h4>
            <p className="text-xs text-[#526456] leading-relaxed mt-0.5">
              {item.description}
            </p>
          </div>
        </div>

        {/* Verified Circular Impact Stats */}
        <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E3DDD1] text-xs">
          <div>
            <span className="text-[10px] text-[#7A8A7D]">Lifecycle Carbon</span>
            <div className="font-display font-bold text-[#254B2A] text-sm tabular-nums">
              -{item.co2SavedKg} kg CO2e
            </div>
          </div>
          <div>
            <span className="text-[10px] text-[#7A8A7D]">Landfill Saved</span>
            <div className="font-display font-bold text-[#254B2A] text-sm tabular-nums">
              -{item.wasteSavedKg} kg waste
            </div>
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="pt-2 border-t border-[#EAE3D4] space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display font-extrabold text-lg text-[#1E3024] tabular-nums">
                LKR {item.priceLkr.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#718274]">
                Direct maker payment via LankaPay
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm text-[#254B2A] bg-[#E3EDE4] px-2 py-0.5 rounded-full">
                {item.seedPrice} Seeds
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                alert(`Direct buy request sent to ${item.maker} via Root & Bloom circular escrow.`);
                onClose();
              }}
              className="py-2.5 bg-[#1E3024] text-white rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-black transition-colors"
            >
              <ShoppingBag size={14} />
              <span>Buy (LKR)</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={!canAffordSeeds}
              onClick={() => onBuyWithSeeds(item)}
              className={`py-2.5 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                canAffordSeeds
                  ? 'bg-[#254B2A] text-[#9EE08E] hover:bg-[#1E3E22]'
                  : 'bg-[#EAE3D4] text-[#8C988E] cursor-not-allowed'
              }`}
            >
              <span>Redeem with Seeds</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
