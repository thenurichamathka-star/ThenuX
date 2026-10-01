import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send } from 'lucide-react';
import { FeedPost } from '../../types';

interface CommentsDrawerProps {
  post: FeedPost | null;
  onClose: () => void;
  onAddComment: (postId: string, text: string) => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ post, onClose, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-sm border border-[#E3DDD1] shadow-2xl relative max-h-[85vh] flex flex-col"
      >
        {/* Grab handle for mobile */}
        <div className="w-10 h-1 bg-[#D8CFBF] rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D4]">
          <div>
            <h3 className="font-display font-bold text-sm text-[#1E3024]">
              Community Discussion
            </h3>
            <p className="text-[11px] text-[#718274]">
              {post.commentsCount} Comments · {post.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD5C5] flex items-center justify-center text-[#6B7D6F] hover:text-[#1E3024]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 no-scrollbar min-h-[160px]">
          {post.comments.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#8C9C8F]">
              Be the first youth to leave encouraging feedback! 🌿
            </div>
          ) : (
            post.comments.map((c) => (
              <div key={c.id} className="bg-white p-3 rounded-2xl border border-[#E8E1D3] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-xs text-[#1E3024]">
                      {c.author}
                    </span>
                    <span className="text-[10px] text-[#718274] font-mono">{c.handle}</span>
                  </div>
                  <span className="text-[10px] text-[#8E9E90]">{c.timeAgo}</span>
                </div>
                <p className="text-xs text-[#4A5D4E] leading-relaxed">{c.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="pt-2 border-t border-[#EAE3D4] flex gap-2">
          <input
            type="text"
            placeholder="Share support or tip seeds..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#DDD5C5] text-xs placeholder:text-[#8E9E92] focus:outline-none focus:ring-1 focus:ring-[#254B2A]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#254B2A] text-white rounded-xl text-xs font-semibold hover:bg-[#1E3E22] transition-colors flex items-center justify-center"
          >
            <Send size={14} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
