import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trees, Recycle, CloudRain } from 'lucide-react';

interface ConcentricRingsProps {
  trees: number;
  treesGoal: number;
  wasteKg: number;
  wasteGoal: number;
  co2Kg: number;
  co2Goal: number;
  onSelectMetric?: (metric: 'trees' | 'waste' | 'co2' | null) => void;
}

export const ConcentricRings: React.FC<ConcentricRingsProps> = ({
  trees,
  treesGoal,
  wasteKg,
  wasteGoal,
  co2Kg,
  co2Goal,
  onSelectMetric,
}) => {
  const [activeHover, setActiveHover] = useState<'trees' | 'waste' | 'co2' | null>(null);

  const treesPct = Math.min(100, Math.round((trees / treesGoal) * 100));
  const wastePct = Math.min(100, Math.round((wasteKg / wasteGoal) * 100));
  const co2Pct = Math.min(100, Math.round((co2Kg / co2Goal) * 100));
  const overallPct = Math.round((treesPct + wastePct + co2Pct) / 3);

  // SVG parameters
  const size = 220;
  const strokeWidth = 11;
  const center = size / 2;

  // Outer ring (Trees)
  const rOuter = 88;
  const cOuter = 2 * Math.PI * rOuter;
  const offsetOuter = cOuter - (treesPct / 100) * cOuter;

  // Middle ring (Waste)
  const rMiddle = 68;
  const cMiddle = 2 * Math.PI * rMiddle;
  const offsetMiddle = cMiddle - (wastePct / 100) * cMiddle;

  // Inner ring (CO2)
  const rInner = 48;
  const cInner = 2 * Math.PI * rInner;
  const offsetInner = cInner - (co2Pct / 100) * cInner;

  const handleSelect = (key: 'trees' | 'waste' | 'co2' | null) => {
    setActiveHover(key);
    onSelectMetric?.(key);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Interactive concentric rings SVG */}
      <div className="relative w-[220px] h-[220px] flex items-center justify-center cursor-pointer">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          <defs>
            <linearGradient id="treesGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E3E22" />
              <stop offset="100%" stopColor="#2E6334" />
            </linearGradient>
            <linearGradient id="wasteGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#507855" />
              <stop offset="100%" stopColor="#9EE08E" />
            </linearGradient>
            <linearGradient id="co2Grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#CE6B42" />
              <stop offset="100%" stopColor="#E28965" />
            </linearGradient>
          </defs>

          {/* Background Track 1: Outer (Trees) */}
          <circle
            cx={center}
            cy={center}
            r={rOuter}
            fill="none"
            stroke="#E3DDD1"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress Track 1: Outer (Trees) */}
          <motion.circle
            cx={center}
            cy={center}
            r={rOuter}
            fill="none"
            stroke="url(#treesGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={cOuter}
            initial={{ strokeDashoffset: cOuter }}
            animate={{ strokeDashoffset: offsetOuter }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            opacity={activeHover && activeHover !== 'trees' ? 0.35 : 1}
            className="transition-opacity duration-300"
            onMouseEnter={() => handleSelect('trees')}
            onMouseLeave={() => handleSelect(null)}
          />

          {/* Background Track 2: Middle (Waste) */}
          <circle
            cx={center}
            cy={center}
            r={rMiddle}
            fill="none"
            stroke="#E3DDD1"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress Track 2: Middle (Waste) */}
          <motion.circle
            cx={center}
            cy={center}
            r={rMiddle}
            fill="none"
            stroke="url(#wasteGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={cMiddle}
            initial={{ strokeDashoffset: cMiddle }}
            animate={{ strokeDashoffset: offsetMiddle }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            strokeLinecap="round"
            opacity={activeHover && activeHover !== 'waste' ? 0.35 : 1}
            className="transition-opacity duration-300"
            onMouseEnter={() => handleSelect('waste')}
            onMouseLeave={() => handleSelect(null)}
          />

          {/* Background Track 3: Inner (CO2) */}
          <circle
            cx={center}
            cy={center}
            r={rInner}
            fill="none"
            stroke="#E3DDD1"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress Track 3: Inner (CO2) */}
          <motion.circle
            cx={center}
            cy={center}
            r={rInner}
            fill="none"
            stroke="url(#co2Grad)"
            strokeWidth={strokeWidth}
            strokeDasharray={cInner}
            initial={{ strokeDashoffset: cInner }}
            animate={{ strokeDashoffset: offsetInner }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            strokeLinecap="round"
            opacity={activeHover && activeHover !== 'co2' ? 0.35 : 1}
            className="transition-opacity duration-300"
            onMouseEnter={() => handleSelect('co2')}
            onMouseLeave={() => handleSelect(null)}
          />
        </svg>

        {/* Center content gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl mb-0.5"
          >
            {activeHover === 'trees' ? '🌲' : activeHover === 'waste' ? '♻️' : activeHover === 'co2' ? '☁️' : '🌱'}
          </motion.span>
          <span className="font-display font-bold text-2xl tracking-tight text-[#1E3024] tabular-nums">
            {activeHover === 'trees'
              ? `${treesPct}%`
              : activeHover === 'waste'
              ? `${wastePct}%`
              : activeHover === 'co2'
              ? `${co2Pct}%`
              : `${overallPct}%`}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7E6F]">
            {activeHover === 'trees'
              ? 'Forest Goal'
              : activeHover === 'waste'
              ? 'Waste Divert'
              : activeHover === 'co2'
              ? 'CO2 Offset'
              : 'Oct Target'}
          </span>
        </div>
      </div>

      {/* Ring Legend & Quick Select Bar */}
      <div className="flex items-center justify-between w-full max-w-[320px] mt-4 pt-3 border-t border-[#EAE3D4]/80 text-xs text-[#526456]">
        {/* Trees */}
        <button
          onClick={() => handleSelect(activeHover === 'trees' ? null : 'trees')}
          className={`flex items-center gap-1.5 transition-all text-left group p-1 rounded-md ${
            activeHover === 'trees' ? 'bg-[#254B2A]/10 text-[#254B2A] font-semibold' : 'hover:text-[#1E3024]'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#254B2A] shrink-0" />
          <div>
            <div className="text-[11px] leading-tight font-medium">Trees</div>
            <div className="text-[10px] tabular-nums text-[#7A8E7F]">{trees}/{treesGoal}</div>
          </div>
        </button>

        {/* Waste */}
        <button
          onClick={() => handleSelect(activeHover === 'waste' ? null : 'waste')}
          className={`flex items-center gap-1.5 transition-all text-left group p-1 rounded-md ${
            activeHover === 'waste' ? 'bg-[#507855]/10 text-[#507855] font-semibold' : 'hover:text-[#1E3024]'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#7CA982] shrink-0" />
          <div>
            <div className="text-[11px] leading-tight font-medium">Waste</div>
            <div className="text-[10px] tabular-nums text-[#7A8E7F]">{wasteKg} kg</div>
          </div>
        </button>

        {/* CO2 */}
        <button
          onClick={() => handleSelect(activeHover === 'co2' ? null : 'co2')}
          className={`flex items-center gap-1.5 transition-all text-left group p-1 rounded-md ${
            activeHover === 'co2' ? 'bg-[#CE6B42]/10 text-[#CE6B42] font-semibold' : 'hover:text-[#1E3024]'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#CE6B42] shrink-0" />
          <div>
            <div className="text-[11px] leading-tight font-medium">CO2e</div>
            <div className="text-[10px] tabular-nums text-[#7A8E7F]">{co2Kg} kg</div>
          </div>
        </button>
      </div>
    </div>
  );
};
