/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Layers, Palette, Plus, Leaf, Sparkles, Flame } from 'lucide-react';
import { ScreenType, PresentationMode, UserProfile, HabitStep, FeedPost, MarketplaceItem, ColomboProject } from './types';
import { 
  initialProfile, 
  initialHabits, 
  initialFeedPosts, 
  initialMarketplaceItems, 
  initialColomboProjects 
} from './data/mockData';
import { PhoneFrame } from './components/device/PhoneFrame';
import { DashboardScreen } from './components/dashboard/DashboardScreen';
import { CommunityFeedScreen } from './components/feed/CommunityFeedScreen';
import { MarketplaceScreen } from './components/marketplace/MarketplaceScreen';
import { ColomboMapScreen } from './components/map/ColomboMapScreen';
import { DribbbleBoard } from './components/showcase/DribbbleBoard';
import { DesignSystemView } from './components/showcase/DesignSystemView';
import { LogActionModal } from './components/modals/LogActionModal';
import { ScanModal } from './components/modals/ScanModal';
import { SharePostModal } from './components/modals/SharePostModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { CommentsDrawer } from './components/modals/CommentsDrawer';
import confetti from 'canvas-confetti';

export default function App() {
  const [presentationMode, setPresentationMode] = useState<PresentationMode>('phone');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  
  // App state
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [habits, setHabits] = useState<HabitStep[]>(initialHabits);
  const [posts, setPosts] = useState<FeedPost[]>(initialFeedPosts);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(initialMarketplaceItems);
  const [colomboProjects, setColomboProjects] = useState<ColomboProject[]>(initialColomboProjects);
  
  // Modals & Drawers
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceItem | null>(null);
  const [selectedCommentPost, setSelectedCommentPost] = useState<FeedPost | null>(null);
  const [dynamicIslandMsg, setDynamicIslandMsg] = useState<string | null>('🔥 19 Day Streak');

  // Trigger dynamic island alert
  const triggerIslandAlert = (msg: string) => {
    setDynamicIslandMsg(msg);
  };

  // Toggle habit step
  const handleToggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextState = !h.completed;
          if (nextState) {
            setProfile((p) => ({
              ...p,
              seedBalance: p.seedBalance + h.seeds,
              xp: p.xp + 25,
            }));
            triggerIslandAlert(`+${h.seeds} Seeds 🌱 · ${h.key.toUpperCase()} Loop`);
            confetti({
              particleCount: 25,
              spread: 50,
              origin: { y: 0.8 },
              colors: ['#254B2A', '#9EE08E'],
            });
          }
          return { ...h, completed: nextState };
        }
        return h;
      })
    );
  };

  // Toggle post like
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.userLiked;
          if (isLiked) {
            triggerIslandAlert(`💚 High-Sprout Sent to ${p.author.split(' ')[0]}`);
          }
          return {
            ...p,
            userLiked: isLiked,
            highSprouts: isLiked ? p.highSprouts + 1 : p.highSprouts - 1,
          };
        }
        return p;
      })
    );
  };

  // Toggle Colombo event RSVP
  const handleToggleRsvp = (projectId: string) => {
    setColomboProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const nextRsvp = !proj.userRsvpd;
          if (nextRsvp) {
            setProfile((p) => ({
              ...p,
              seedBalance: p.seedBalance + proj.seedReward,
              xp: p.xp + 50,
            }));
            triggerIslandAlert(`RSVP Confirmed! +${proj.seedReward} Seeds 🌱`);
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#254B2A', '#CE6B42', '#9EE08E'],
            });
          }
          return {
            ...proj,
            userRsvpd: nextRsvp,
            attendeesCount: nextRsvp ? proj.attendeesCount + 1 : proj.attendeesCount - 1,
          };
        }
        return proj;
      })
    );
  };

  // Log action callback
  const handleConfirmLog = (action: {
    type: 'tree' | 'waste' | 'upcycle' | 'cleanup';
    amount: number;
    seeds: number;
    note: string;
  }) => {
    setProfile((prev) => {
      let trees = prev.treesPlanted;
      let waste = prev.wasteDivertedKg;
      let co2 = prev.co2SavedKg;

      if (action.type === 'tree') {
        trees += action.amount;
        co2 += action.amount * 12;
      } else if (action.type === 'waste') {
        waste = Number((waste + action.amount).toFixed(1));
        co2 = Number((co2 + action.amount * 1.5).toFixed(1));
      } else if (action.type === 'upcycle') {
        waste = Number((waste + action.amount * 1.2).toFixed(1));
        co2 = Number((co2 + action.amount * 3.5).toFixed(1));
      } else if (action.type === 'cleanup') {
        waste = Number((waste + action.amount * 4.5).toFixed(1));
        co2 = Number((co2 + action.amount * 6.0).toFixed(1));
      }

      return {
        ...prev,
        treesPlanted: trees,
        wasteDivertedKg: waste,
        co2SavedKg: co2,
        seedBalance: prev.seedBalance + action.seeds,
        xp: prev.xp + 40,
      };
    });

    triggerIslandAlert(`Impact Logged! +${action.seeds} Seeds 🌱`);
  };

  // Redeem discount in marketplace
  const handleRedeemDiscount = () => {
    if (profile.seedBalance >= 200) {
      setProfile((p) => ({ ...p, seedBalance: p.seedBalance - 200 }));
      triggerIslandAlert('Redeemed -25% Voucher! 🎟️');
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.5 },
      });
      alert('Voucher RB25-COLOMBO successfully added to your circular wallet!');
    } else {
      alert('You need at least 200 Seeds to redeem this circular discount voucher.');
    }
  };

  // Buy with seeds
  const handleBuyWithSeeds = (item: MarketplaceItem) => {
    if (profile.seedBalance >= item.seedPrice) {
      setProfile((p) => ({ ...p, seedBalance: p.seedBalance - item.seedPrice }));
      triggerIslandAlert(`Claimed ${item.title.split(' ')[0]} with Seeds!`);
      confetti({
        particleCount: 40,
        spread: 60,
      });
      setSelectedProduct(null);
      alert(`Success! You redeemed "${item.title}" for ${item.seedPrice} Seeds. ${item.maker} will prepare your package in plastic-free recycled packaging.`);
    } else {
      alert(`You need ${item.seedPrice} Seeds, but currently have ${profile.seedBalance} Seeds.`);
    }
  };

  // Publish new community feed post
  const handleAddPost = (newPostData: any) => {
    const newPost: FeedPost = {
      ...newPostData,
      id: `p-${Date.now()}`,
      timeAgo: 'Just now',
      highSprouts: 1,
      userLiked: true,
      commentsCount: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setProfile((p) => ({ ...p, seedBalance: p.seedBalance + 50, xp: p.xp + 45 }));
    triggerIslandAlert('+50 Seeds! Post Published 🌱');
    confetti({
      particleCount: 35,
      spread: 60,
    });
  };

  // Add comment
  const handleAddComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: profile.name,
            handle: profile.handle,
            text,
            timeAgo: 'Just now',
          };
          const updated = {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [newComment, ...p.comments],
          };
          if (selectedCommentPost?.id === postId) {
            setSelectedCommentPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1E3024] flex flex-col font-sans selection:bg-[#9EE08E] selection:text-[#19321D]">
      {/* Universal Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (Action) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E3DDD1] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#254B2A] text-white flex items-center justify-center font-display font-bold text-sm shadow-xs">
            🌱
          </span>
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[#1E3024]">
            Root & Bloom
          </span>
        </div>

        {/* Zone 2: Navigation / Presentation Switcher */}
        <nav className="flex items-center gap-1 sm:gap-2 p-1 bg-[#EAE3D4] rounded-2xl text-xs font-medium">
          <button
            onClick={() => setPresentationMode('phone')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              presentationMode === 'phone'
                ? 'bg-white text-[#1E3024] shadow-xs font-semibold'
                : 'text-[#617464] hover:text-[#1E3024]'
            }`}
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Interactive Phone</span>
            <span className="sm:hidden">App</span>
          </button>

          <button
            onClick={() => setPresentationMode('dribbble')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              presentationMode === 'dribbble'
                ? 'bg-white text-[#1E3024] shadow-xs font-semibold'
                : 'text-[#617464] hover:text-[#1E3024]'
            }`}
          >
            <Layers size={14} />
            <span className="hidden sm:inline">4-Screen Showcase</span>
            <span className="sm:hidden">Showcase</span>
          </button>

          <button
            onClick={() => setPresentationMode('design-system')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              presentationMode === 'design-system'
                ? 'bg-white text-[#1E3024] shadow-xs font-semibold'
                : 'text-[#617464] hover:text-[#1E3024]'
            }`}
          >
            <Palette size={14} />
            <span className="hidden sm:inline">Design System</span>
            <span className="sm:hidden">Tokens</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Seed Wallet */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 bg-[#E3EDE4] border border-[#CCE0CD] rounded-full px-3 py-1 text-xs font-semibold text-[#254B2A]">
            <span>🌱</span>
            <span className="font-mono tabular-nums">{profile.seedBalance} Seeds</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLogModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#254B2A] text-white px-3.5 py-1.5 rounded-xl font-display font-semibold text-xs shadow-xs hover:bg-[#1E3E22] transition-colors"
          >
            <Plus size={14} className="text-[#9EE08E]" />
            <span className="whitespace-nowrap">Log Action</span>
          </motion.button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col">
        {/* MODE 1: Interactive Phone Frame */}
        {presentationMode === 'phone' && (
          <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10 relative">
            {/* Context bar with quick screen switcher pills */}
            <div className="mb-4 flex items-center gap-2 text-xs">
              <span className="text-[11px] font-medium text-[#718274]">Active Screen:</span>
              <div className="flex items-center gap-1 bg-[#EAE3D4] p-1 rounded-xl">
                {(
                  [
                    { id: 'dashboard', label: '1. Dashboard' },
                    { id: 'feed', label: '2. Feed' },
                    { id: 'marketplace', label: '3. Market' },
                    { id: 'map', label: '4. Colombo Map' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentScreen(tab.id)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      currentScreen === tab.id
                        ? 'bg-white text-[#254B2A] font-bold shadow-xs'
                        : 'text-[#647868] hover:text-[#1E3024]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* iPhone 16 Pro Frame with active screen */}
            <PhoneFrame
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
              dynamicIslandMessage={dynamicIslandMsg}
              onDynamicIslandClick={() => triggerIslandAlert('Level 4: Canopy Guardian 🌿')}
            >
              <AnimatePresence mode="wait">
                {currentScreen === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DashboardScreen
                      profile={profile}
                      habits={habits}
                      onToggleHabit={handleToggleHabit}
                      onOpenLogModal={() => setIsLogModalOpen(true)}
                      onOpenScanModal={() => setIsScanModalOpen(true)}
                      onNavigateToMap={() => setCurrentScreen('map')}
                    />
                  </motion.div>
                )}

                {currentScreen === 'feed' && (
                  <motion.div
                    key="feed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CommunityFeedScreen
                      posts={posts}
                      onToggleLike={handleToggleLike}
                      onOpenShareModal={() => setIsShareModalOpen(true)}
                      onOpenCommentDrawer={(post) => setSelectedCommentPost(post)}
                    />
                  </motion.div>
                )}

                {currentScreen === 'marketplace' && (
                  <motion.div
                    key="marketplace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MarketplaceScreen
                      items={marketplaceItems}
                      seedBalance={profile.seedBalance}
                      onSelectItem={(item) => setSelectedProduct(item)}
                      onRedeemDiscount={handleRedeemDiscount}
                    />
                  </motion.div>
                )}

                {currentScreen === 'map' && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <ColomboMapScreen
                      projects={colomboProjects}
                      onToggleRsvp={handleToggleRsvp}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneFrame>

            <div className="mt-5 text-center text-xs text-[#718274] max-w-sm">
              <span className="font-semibold text-[#254B2A]">Interactive Prototype:</span> Tap bottom tab bar, check habit loops, like youth posts, inspect Colombo map pins, or log eco actions.
            </div>
          </div>
        )}

        {/* MODE 2: Dribbble 4-Screen Showcase Board */}
        {presentationMode === 'dribbble' && (
          <DribbbleBoard
            profile={profile}
            habits={habits}
            posts={posts}
            marketplaceItems={marketplaceItems}
            colomboProjects={colomboProjects}
            onSelectScreenForInteractive={(screen) => {
              setCurrentScreen(screen);
              setPresentationMode('phone');
            }}
            onToggleHabit={handleToggleHabit}
            onToggleLike={handleToggleLike}
            onToggleRsvp={handleToggleRsvp}
            onOpenLogModal={() => setIsLogModalOpen(true)}
            onOpenScanModal={() => setIsScanModalOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onSelectItem={(item) => setSelectedProduct(item)}
            onOpenCommentDrawer={(post) => setSelectedCommentPost(post)}
            onRedeemDiscount={handleRedeemDiscount}
          />
        )}

        {/* MODE 3: Design System Tokens & Guidelines */}
        {presentationMode === 'design-system' && <DesignSystemView />}
      </main>

      {/* Interactive Global Modals */}
      <LogActionModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onConfirmLog={handleConfirmLog}
      />

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onReward={(seeds) => {
          setProfile((p) => ({ ...p, seedBalance: p.seedBalance + seeds }));
          triggerIslandAlert(`+${seeds} Seeds Scanned! 🧴`);
        }}
      />

      <SharePostModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmitPost={handleAddPost}
      />

      <ProductDetailModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyWithSeeds={handleBuyWithSeeds}
        seedBalance={profile.seedBalance}
      />

      <CommentsDrawer
        post={selectedCommentPost}
        onClose={() => setSelectedCommentPost(null)}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
