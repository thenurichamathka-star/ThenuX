import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Plus, Sparkles, MapPin, Award, Check } from 'lucide-react';
import { FeedPost } from '../../types';
import { BeachCleanupIllustration, UpcycleDenimIllustration, TerraceSeedlingIllustration } from '../illustrations/EcoIllustrations';

interface CommunityFeedScreenProps {
  posts: FeedPost[];
  onToggleLike: (postId: string) => void;
  onOpenShareModal: () => void;
  onOpenCommentDrawer: (post: FeedPost) => void;
}

export const CommunityFeedScreen: React.FC<CommunityFeedScreenProps> = ({
  posts,
  onToggleLike,
  onOpenShareModal,
  onOpenCommentDrawer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cleanup' | 'upcycle' | 'trees' | 'diy'>('all');

  const filteredPosts = posts.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  return (
    <div className="flex flex-col min-h-full pb-24 text-[#1E3024]">
      {/* Top Feed App Bar */}
      <div className="pt-3 px-5 pb-3 sticky top-0 z-20 bg-[#F4EFE6]/90 backdrop-blur-md border-b border-[#EAE3D4]/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#647868]">
              Eco Circle
            </span>
            <h1 className="font-display font-bold text-lg text-[#1E3024] tracking-tight">
              Community Pulse
            </h1>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 bg-[#254B2A] text-white px-3 py-1.5 rounded-full font-display font-semibold text-xs shadow-xs hover:bg-[#1E3E22] transition-colors"
          >
            <Plus size={14} className="text-[#9EE08E]" />
            <span>Share Action</span>
          </motion.button>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white/80 text-[#617464] border border-[#DDD5C5] hover:text-[#1E3024]'
            }`}
          >
            All Action 🌟
          </button>
          <button
            onClick={() => setSelectedFilter('cleanup')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedFilter === 'cleanup'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white/80 text-[#617464] border border-[#DDD5C5] hover:text-[#1E3024]'
            }`}
          >
            Clean-ups 🌊
          </button>
          <button
            onClick={() => setSelectedFilter('upcycle')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedFilter === 'upcycle'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white/80 text-[#617464] border border-[#DDD5C5] hover:text-[#1E3024]'
            }`}
          >
            Upcycling ✂️
          </button>
          <button
            onClick={() => setSelectedFilter('trees')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedFilter === 'trees'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white/80 text-[#617464] border border-[#DDD5C5] hover:text-[#1E3024]'
            }`}
          >
            Trees & Plants 🌲
          </button>
        </div>
      </div>

      {/* Feed Stream */}
      <div className="px-5 pt-4 space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-4 border border-[#E3DDD1] shadow-xs space-y-3"
          >
            {/* Author bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E5ECE5] text-[#254B2A] font-bold text-xs flex items-center justify-center font-display border border-[#C5D5C6]">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-semibold text-xs text-[#1E3024]">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-[#718274] font-mono">{post.handle}</span>
                  </div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#718274]">
                    <span className="truncate max-w-[150px]">{post.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              {/* Action category tag */}
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  post.badgeType === 'forest'
                    ? 'bg-[#E3EDE4] text-[#254B2A]'
                    : post.badgeType === 'terracotta'
                    ? 'bg-[#FBEBE5] text-[#B35832]'
                    : 'bg-[#EFF3EF] text-[#4A6E50]'
                }`}
              >
                {post.badge}
              </span>
            </div>

            {/* Post Title & Caption */}
            <div>
              <h3 className="font-display font-bold text-sm text-[#1E3024] leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-[#526456] leading-relaxed mt-1">
                {post.caption}
              </p>
            </div>

            {/* Visual illustration slot */}
            <div className="rounded-2xl overflow-hidden border border-[#EBE4D5] bg-[#F7F4EE]">
              {post.visualType === 'cleanup_beach' && <BeachCleanupIllustration className="w-full h-36" />}
              {post.visualType === 'upcycle_denim' && <UpcycleDenimIllustration className="w-full h-36" />}
              {post.visualType === 'seedling_terrace' && <TerraceSeedlingIllustration className="w-full h-36" />}
              {post.visualType === 'custom' && <BeachCleanupIllustration className="w-full h-36" />}
            </div>

            {/* Quantitative impact proof row */}
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#FAF7F2] rounded-xl border border-[#ECE5D8] text-center">
              {post.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[10px] text-[#7A8A7D] flex items-center justify-center gap-1">
                    <span>{stat.icon}</span>
                    <span>{stat.label}</span>
                  </div>
                  <div className="font-display font-bold text-xs text-[#1E3024] tabular-nums">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Engagement Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-[#F0EAE0] text-xs text-[#6B7D6F]">
              <div className="flex items-center gap-4">
                {/* High-sprouts (Like) */}
                <button
                  onClick={() => onToggleLike(post.id)}
                  className={`flex items-center gap-1.5 font-medium transition-colors ${
                    post.userLiked ? 'text-[#254B2A]' : 'hover:text-[#1E3024]'
                  }`}
                >
                  <motion.div whileTap={{ scale: 1.3 }}>
                    <Heart
                      size={16}
                      className={post.userLiked ? 'fill-[#254B2A] text-[#254B2A]' : 'text-[#718274]'}
                    />
                  </motion.div>
                  <span className="font-mono tabular-nums text-xs">{post.highSprouts}</span>
                </button>

                {/* Comments */}
                <button
                  onClick={() => onOpenCommentDrawer(post)}
                  className="flex items-center gap-1.5 font-medium hover:text-[#1E3024] transition-colors"
                >
                  <MessageCircle size={16} className="text-[#718274]" />
                  <span className="font-mono tabular-nums text-xs">{post.commentsCount}</span>
                </button>
              </div>

              {/* Seed Reward indicator */}
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#254B2A] bg-[#E3EDE4] px-2 py-0.5 rounded-full font-semibold">
                <span>🌱</span>
                <span>+{post.seedReward} Seeds</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
