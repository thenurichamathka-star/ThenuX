import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Eye, Smartphone, Layers, Leaf } from 'lucide-react';
import { ScreenType, UserProfile, HabitStep, FeedPost, MarketplaceItem, ColomboProject } from '../../types';
import { DashboardScreen } from '../dashboard/DashboardScreen';
import { CommunityFeedScreen } from '../feed/CommunityFeedScreen';
import { MarketplaceScreen } from '../marketplace/MarketplaceScreen';
import { ColomboMapScreen } from '../map/ColomboMapScreen';

interface DribbbleBoardProps {
  profile: UserProfile;
  habits: HabitStep[];
  posts: FeedPost[];
  marketplaceItems: MarketplaceItem[];
  colomboProjects: ColomboProject[];
  onSelectScreenForInteractive: (screen: ScreenType) => void;
  onToggleHabit: (id: string) => void;
  onToggleLike: (id: string) => void;
  onToggleRsvp: (id: string) => void;
  onOpenLogModal: () => void;
  onOpenScanModal: () => void;
  onOpenShareModal: () => void;
  onSelectItem: (item: MarketplaceItem) => void;
  onOpenCommentDrawer: (post: FeedPost) => void;
  onRedeemDiscount: () => void;
}

export const DribbbleBoard: React.FC<DribbbleBoardProps> = ({
  profile,
  habits,
  posts,
  marketplaceItems,
  colomboProjects,
  onSelectScreenForInteractive,
  onToggleHabit,
  onToggleLike,
  onToggleRsvp,
  onOpenLogModal,
  onOpenScanModal,
  onOpenShareModal,
  onSelectItem,
  onOpenCommentDrawer,
  onRedeemDiscount,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#EDE7DC] text-[#1E3024] p-6 lg:p-12 relative overflow-hidden">
      {/* Organic radial ambient glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#9EE08E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[700px] h-[700px] bg-[#CE6B42]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#507855]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Showcase Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#DDD5C5] text-xs font-semibold text-[#254B2A] mb-3 shadow-xs">
          <Leaf size={14} className="text-[#254B2A]" />
          <span>Mobile UI Case Study & Interactive Prototype</span>
          <span className="text-[#8B9B8E]">·</span>
          <span className="text-[#CE6B42]">Dribbble Editorial Edition</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E3024] max-w-3xl mx-auto">
          Root & Bloom <span className="font-light italic text-[#507855]">· Eco Tracking</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#526456] max-w-2xl mx-auto leading-relaxed">
          Clean, earthy, Gen-Z mobile experience empowering Sri Lankan youth to turn climate anxiety into verifiable circular community action.
        </p>

        {/* Quick highlight pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs font-medium text-[#465949]">
          <span className="bg-white/80 px-3 py-1 rounded-full border border-[#DDD5C5]">Concentric Leaf Rings</span>
          <span className="bg-white/80 px-3 py-1 rounded-full border border-[#DDD5C5]">Habit Loops</span>
          <span className="bg-white/80 px-3 py-1 rounded-full border border-[#DDD5C5]">Youth Clean-ups</span>
          <span className="bg-white/80 px-3 py-1 rounded-full border border-[#DDD5C5]">Circular Bazaar</span>
          <span className="bg-white/80 px-3 py-1 rounded-full border border-[#DDD5C5]">Colombo Geo-Pulse</span>
        </div>
      </div>

      {/* 4-Screen Dribbble Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10">
        
        {/* Screen 1: Impact Dashboard */}
        <div className="flex flex-col items-center group">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#CE6B42] uppercase tracking-wider">Screen 01</span>
              <h3 className="font-display font-bold text-sm text-[#1E3024]">Impact Dashboard</h3>
            </div>
            <button
              onClick={() => onSelectScreenForInteractive('dashboard')}
              className="text-[11px] font-semibold text-[#254B2A] hover:underline flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-[#DDD5C5]"
            >
              <Smartphone size={12} />
              <span>Test Live</span>
            </button>
          </div>

          {/* iPhone Mockup Shell */}
          <div className="relative w-[310px] h-[650px] bg-[#1E2520] rounded-[44px] p-[8px] iphone-frame overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="w-full h-full bg-[#F4EFE6] rounded-[36px] overflow-hidden flex flex-col scale-[0.94] origin-top-left w-[330px] h-[690px]">
              {/* Scaled Dashboard Content */}
              <div className="h-full overflow-y-auto no-scrollbar pointer-events-auto">
                <DashboardScreen
                  profile={profile}
                  habits={habits}
                  onToggleHabit={onToggleHabit}
                  onOpenLogModal={onOpenLogModal}
                  onOpenScanModal={onOpenScanModal}
                  onNavigateToMap={() => onSelectScreenForInteractive('map')}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#617464] text-center max-w-[280px]">
            Concentric leaf-inspired rings for Trees, Waste & CO2e with 4-stage circular habit loops.
          </p>
        </div>

        {/* Screen 2: Community Feed */}
        <div className="flex flex-col items-center group">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#254B2A] uppercase tracking-wider">Screen 02</span>
              <h3 className="font-display font-bold text-sm text-[#1E3024]">Community Feed</h3>
            </div>
            <button
              onClick={() => onSelectScreenForInteractive('feed')}
              className="text-[11px] font-semibold text-[#254B2A] hover:underline flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-[#DDD5C5]"
            >
              <Smartphone size={12} />
              <span>Test Live</span>
            </button>
          </div>

          <div className="relative w-[310px] h-[650px] bg-[#1E2520] rounded-[44px] p-[8px] iphone-frame overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="w-full h-full bg-[#F4EFE6] rounded-[36px] overflow-hidden flex flex-col scale-[0.94] origin-top-left w-[330px] h-[690px]">
              <div className="h-full overflow-y-auto no-scrollbar pointer-events-auto">
                <CommunityFeedScreen
                  posts={posts}
                  onToggleLike={onToggleLike}
                  onOpenShareModal={onOpenShareModal}
                  onOpenCommentDrawer={onOpenCommentDrawer}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#617464] text-center max-w-[280px]">
            Youth clean-up audits and denim upcycling breakdowns with before/after graphics and high-sprouts.
          </p>
        </div>

        {/* Screen 3: Eco Marketplace */}
        <div className="flex flex-col items-center group">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#507855] uppercase tracking-wider">Screen 03</span>
              <h3 className="font-display font-bold text-sm text-[#1E3024]">Eco Marketplace</h3>
            </div>
            <button
              onClick={() => onSelectScreenForInteractive('marketplace')}
              className="text-[11px] font-semibold text-[#254B2A] hover:underline flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-[#DDD5C5]"
            >
              <Smartphone size={12} />
              <span>Test Live</span>
            </button>
          </div>

          <div className="relative w-[310px] h-[650px] bg-[#1E2520] rounded-[44px] p-[8px] iphone-frame overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="w-full h-full bg-[#F4EFE6] rounded-[36px] overflow-hidden flex flex-col scale-[0.94] origin-top-left w-[330px] h-[690px]">
              <div className="h-full overflow-y-auto no-scrollbar pointer-events-auto">
                <MarketplaceScreen
                  items={marketplaceItems}
                  seedBalance={profile.seedBalance}
                  onSelectItem={onSelectItem}
                  onRedeemDiscount={onRedeemDiscount}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#617464] text-center max-w-[280px]">
            Circular goods (totes, coconut shells, cuttings) redeemable with earned Seed tokens.
          </p>
        </div>

        {/* Screen 4: Colombo Pulse Map */}
        <div className="flex flex-col items-center group">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#CE6B42] uppercase tracking-wider">Screen 04</span>
              <h3 className="font-display font-bold text-sm text-[#1E3024]">Colombo Map</h3>
            </div>
            <button
              onClick={() => onSelectScreenForInteractive('map')}
              className="text-[11px] font-semibold text-[#254B2A] hover:underline flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-[#DDD5C5]"
            >
              <Smartphone size={12} />
              <span>Test Live</span>
            </button>
          </div>

          <div className="relative w-[310px] h-[650px] bg-[#1E2520] rounded-[44px] p-[8px] iphone-frame overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="w-full h-full bg-[#F4EFE6] rounded-[36px] overflow-hidden flex flex-col scale-[0.94] origin-top-left w-[330px] h-[690px]">
              <div className="h-full overflow-y-auto no-scrollbar pointer-events-auto">
                <ColomboMapScreen
                  projects={colomboProjects}
                  onToggleRsvp={onToggleRsvp}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#617464] text-center max-w-[280px]">
            Live geo-pulse across Galle Face, Beira Lake & Viharamahadevi Park with one-tap RSVP.
          </p>
        </div>

      </div>

      {/* Floating CTA Banner */}
      <div className="max-w-xl mx-auto mt-14 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-[#DDD5C5] shadow-lg text-center">
        <h4 className="font-display font-bold text-base text-[#1E3024]">
          Ready to experience the interactive device prototype?
        </h4>
        <p className="text-xs text-[#6B7D6F] mt-1 mb-3">
          Switch to Single Phone mode to tap buttons, toggle habit loops, log clean-up actions, and inspect Colombo map pins.
        </p>
        <button
          onClick={() => onSelectScreenForInteractive('dashboard')}
          className="inline-flex items-center gap-2 bg-[#254B2A] hover:bg-[#1E3E22] text-white px-5 py-2.5 rounded-2xl font-display font-semibold text-xs shadow-md transition-colors"
        >
          <Smartphone size={16} className="text-[#9EE08E]" />
          <span>Launch Interactive Phone Frame</span>
        </button>
      </div>
    </div>
  );
};
