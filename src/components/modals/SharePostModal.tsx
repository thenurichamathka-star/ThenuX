import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send, Sparkles, MapPin, Tag } from 'lucide-react';
import { FeedPost } from '../../types';

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (post: Omit<FeedPost, 'id' | 'timeAgo' | 'highSprouts' | 'userLiked' | 'commentsCount' | 'comments'>) => void;
}

export const SharePostModal: React.FC<SharePostModalProps> = ({ isOpen, onClose, onSubmitPost }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<'cleanup' | 'upcycle' | 'trees' | 'diy'>('cleanup');
  const [location, setLocation] = useState('Colombo, Sri Lanka');
  const [stat1Val, setStat1Val] = useState('12.5 kg');
  const [stat2Val, setStat2Val] = useState('6 Peers');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmitPost({
      author: 'Hiruni Perera',
      handle: '@hiruni_sprouts',
      location,
      category,
      title,
      caption: caption || 'Joined local youth to reduce urban waste footprint and nurture community ecology! 🌱',
      badge: category === 'cleanup' ? 'Clean-up Action' : category === 'upcycle' ? 'Upcycle Project' : 'Tree Care',
      badgeType: category === 'cleanup' ? 'forest' : category === 'upcycle' ? 'terracotta' : 'sage',
      visualType: category === 'cleanup' ? 'cleanup_beach' : category === 'upcycle' ? 'upcycle_denim' : 'seedling_terrace',
      stats: [
        { label: 'Impact Logged', value: stat1Val, icon: '♻️' },
        { label: 'Youth Involved', value: stat2Val, icon: '👥' },
        { label: 'Verified LK', value: 'Root Certified', icon: '✨' },
      ],
      seedReward: 50,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#FAF7F2] rounded-3xl p-5 w-full max-w-sm border border-[#E3DDD1] shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#DDD5C5] flex items-center justify-center text-[#6B7D6F] hover:text-[#1E3024]"
        >
          <X size={16} />
        </button>

        <span className="text-[10px] font-bold text-[#647868] uppercase tracking-wider block mb-1">
          Eco Circle Drop
        </span>
        <h2 className="font-display font-bold text-lg text-[#1E3024]">
          Share Your Eco Action
        </h2>
        <p className="text-xs text-[#718274] mt-0.5">
          Inspire fellow youth with your clean-up haul or upcycling creation.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Category */}
          <div className="flex gap-2">
            {(['cleanup', 'upcycle', 'trees'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
                  category === cat
                    ? 'bg-[#254B2A] text-white border-[#254B2A]'
                    : 'bg-white text-[#526456] border-[#DDD5C5]'
                }`}
              >
                {cat === 'cleanup' ? 'Clean-up 🌊' : cat === 'upcycle' ? 'Upcycle ✂️' : 'Trees 🌲'}
              </button>
            ))}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#647868] block mb-1">
              Project Title:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Crow Island driftwood & marine plastic clean-up"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDD5C5] text-xs placeholder:text-[#9AABA0] focus:outline-none focus:ring-1 focus:ring-[#254B2A]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#647868] block mb-1">
              Story / Description:
            </label>
            <textarea
              rows={2}
              placeholder="What did you collect or build? Where are the materials headed?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDD5C5] text-xs placeholder:text-[#9AABA0] focus:outline-none focus:ring-1 focus:ring-[#254B2A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-[#647868] block mb-1">
                Waste / Impact:
              </label>
              <input
                type="text"
                value={stat1Val}
                onChange={(e) => setStat1Val(e.target.value)}
                className="w-full px-3 py-1.5 bg-white rounded-xl border border-[#DDD5C5] text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-[#647868] block mb-1">
                Volunteers:
              </label>
              <input
                type="text"
                value={stat2Val}
                onChange={(e) => setStat2Val(e.target.value)}
                className="w-full px-3 py-1.5 bg-white rounded-xl border border-[#DDD5C5] text-xs"
              />
            </div>
          </div>

          <div className="p-2.5 bg-[#E3EDE4] rounded-xl flex items-center justify-between text-xs">
            <span className="text-[#254B2A] font-semibold">Community Poster Reward:</span>
            <span className="font-mono font-bold text-[#254B2A]">+50 Seeds 🌱</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-3 bg-[#254B2A] text-white rounded-2xl font-display font-semibold text-xs shadow-md hover:bg-[#1E3E22] transition-colors flex items-center justify-center gap-2"
          >
            <Send size={15} />
            <span>Publish to Community Feed</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
