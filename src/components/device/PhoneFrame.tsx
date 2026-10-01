import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Compass, ShoppingBag, MapPin, Wifi, Battery } from 'lucide-react';
import { ScreenType } from '../../types';

interface PhoneFrameProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
  children: React.ReactNode;
  dynamicIslandMessage?: string | null;
  onDynamicIslandClick?: () => void;
  scale?: number;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  currentScreen,
  onScreenChange,
  children,
  dynamicIslandMessage,
  onDynamicIslandClick,
  scale = 1,
}) => {
  const [islandExpanded, setIslandExpanded] = useState(false);

  useEffect(() => {
    if (dynamicIslandMessage) {
      setIslandExpanded(true);
      const timer = setTimeout(() => {
        setIslandExpanded(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [dynamicIslandMessage]);

  return (
    <div
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
      className="relative mx-auto transition-transform origin-top"
    >
      {/* Outer iPhone 16 Pro Chassis */}
      <div className="relative w-[385px] h-[812px] bg-[#1E2520] rounded-[52px] p-[11px] iphone-frame select-none overflow-hidden">
        {/* Inner Phone Screen Canvas */}
        <div className="relative w-full h-full bg-[#F4EFE6] rounded-[42px] overflow-hidden flex flex-col justify-between">
          
          {/* Top iOS Status Bar & Dynamic Island */}
          <div className="relative z-30 pt-3 px-7 flex items-center justify-between text-[#1E3024] select-none">
            {/* Time */}
            <span className="font-display font-bold text-xs tracking-tight">9:41</span>

            {/* Dynamic Island */}
            <motion.div
              layout
              onClick={() => {
                setIslandExpanded(!islandExpanded);
                onDynamicIslandClick?.();
              }}
              animate={{
                width: islandExpanded ? 210 : 100,
                height: islandExpanded ? 34 : 26,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-black text-white rounded-full flex items-center justify-between px-3 cursor-pointer shadow-md overflow-hidden"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-medium truncate">
                <span className="w-2 h-2 rounded-full bg-[#9EE08E] shrink-0 animate-pulse" />
                <span className="truncate">
                  {islandExpanded && dynamicIslandMessage ? dynamicIslandMessage : 'Root & Bloom'}
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2B352E] shrink-0 border border-white/10" />
            </motion.div>

            {/* Icons: Cellular, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-mono font-bold">5G</span>
              <Wifi size={13} strokeWidth={2.4} />
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 rounded-[4px] border border-[#1E3024] p-[1.5px] flex items-center">
                  <div className="h-full w-full bg-[#1E3024] rounded-[1.5px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Screen Content Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative">
            {children}
          </div>

          {/* Floating Glassmorphic Bottom Navigation Dock */}
          <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
            <div className="px-4 pb-2 pt-2">
              <nav className="pointer-events-auto bg-white/92 backdrop-blur-xl rounded-3xl p-1.5 border border-[#E3DDD1]/90 shadow-[0_12px_30px_-5px_rgba(20,40,25,0.18)] flex items-center justify-around">
                {/* 1. Dashboard */}
                <button
                  onClick={() => onScreenChange('dashboard')}
                  className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                    currentScreen === 'dashboard'
                      ? 'text-[#254B2A] font-bold'
                      : 'text-[#7A8A7D] hover:text-[#1E3024]'
                  }`}
                >
                  <motion.div whileTap={{ scale: 0.85 }}>
                    <LayoutDashboard
                      size={20}
                      strokeWidth={currentScreen === 'dashboard' ? 2.5 : 2}
                      className={currentScreen === 'dashboard' ? 'text-[#254B2A]' : ''}
                    />
                  </motion.div>
                  <span className="text-[10px] tracking-tight mt-0.5">Impact</span>
                  {currentScreen === 'dashboard' && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="w-1 h-1 rounded-full bg-[#254B2A] mt-0.5"
                    />
                  )}
                </button>

                {/* 2. Feed */}
                <button
                  onClick={() => onScreenChange('feed')}
                  className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                    currentScreen === 'feed'
                      ? 'text-[#254B2A] font-bold'
                      : 'text-[#7A8A7D] hover:text-[#1E3024]'
                  }`}
                >
                  <motion.div whileTap={{ scale: 0.85 }}>
                    <Compass
                      size={20}
                      strokeWidth={currentScreen === 'feed' ? 2.5 : 2}
                      className={currentScreen === 'feed' ? 'text-[#254B2A]' : ''}
                    />
                  </motion.div>
                  <span className="text-[10px] tracking-tight mt-0.5">Circle</span>
                  {currentScreen === 'feed' && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="w-1 h-1 rounded-full bg-[#254B2A] mt-0.5"
                    />
                  )}
                </button>

                {/* 3. Marketplace */}
                <button
                  onClick={() => onScreenChange('marketplace')}
                  className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                    currentScreen === 'marketplace'
                      ? 'text-[#254B2A] font-bold'
                      : 'text-[#7A8A7D] hover:text-[#1E3024]'
                  }`}
                >
                  <motion.div whileTap={{ scale: 0.85 }}>
                    <ShoppingBag
                      size={20}
                      strokeWidth={currentScreen === 'marketplace' ? 2.5 : 2}
                      className={currentScreen === 'marketplace' ? 'text-[#254B2A]' : ''}
                    />
                  </motion.div>
                  <span className="text-[10px] tracking-tight mt-0.5">Market</span>
                  {currentScreen === 'marketplace' && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="w-1 h-1 rounded-full bg-[#254B2A] mt-0.5"
                    />
                  )}
                </button>

                {/* 4. Map */}
                <button
                  onClick={() => onScreenChange('map')}
                  className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                    currentScreen === 'map'
                      ? 'text-[#254B2A] font-bold'
                      : 'text-[#7A8A7D] hover:text-[#1E3024]'
                  }`}
                >
                  <motion.div whileTap={{ scale: 0.85 }}>
                    <MapPin
                      size={20}
                      strokeWidth={currentScreen === 'map' ? 2.5 : 2}
                      className={currentScreen === 'map' ? 'text-[#254B2A]' : ''}
                    />
                  </motion.div>
                  <span className="text-[10px] tracking-tight mt-0.5">Colombo</span>
                  {currentScreen === 'map' && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="w-1 h-1 rounded-full bg-[#254B2A] mt-0.5"
                    />
                  )}
                </button>
              </nav>

              {/* iOS Home Indicator Bar */}
              <div className="w-32 h-1 bg-[#1E2520]/80 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
