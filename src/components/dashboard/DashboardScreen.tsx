import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TreePine, 
  Trash2, 
  CloudSun, 
  Sparkles, 
  Flame, 
  Plus, 
  ScanLine, 
  Award,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { UserProfile, HabitStep } from '../../types';
import { ConcentricRings } from './ConcentricRings';
import { HabitLoop } from './HabitLoop';

interface DashboardScreenProps {
  profile: UserProfile;
  habits: HabitStep[];
  onToggleHabit: (habitId: string) => void;
  onOpenLogModal: () => void;
  onOpenScanModal: () => void;
  onNavigateToMap: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  profile,
  habits,
  onToggleHabit,
  onOpenLogModal,
  onOpenScanModal,
  onNavigateToMap,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'trees' | 'waste' | 'co2' | null>(null);

  const xpProgressPct = Math.round((profile.xp / profile.nextLevelXp) * 100);

  return (
    <div className="flex flex-col min-h-full pb-24 text-[#1E3024]">
      {/* Top Header / Profile Bar */}
      <div className="pt-3 px-5 pb-4 bg-gradient-to-b from-[#EDE6D8]/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#254B2A] text-[#FAF7F2] font-display font-bold text-sm flex items-center justify-center ring-2 ring-[#9EE08E]/60 shadow-sm">
                {profile.avatarInitials}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#9EE08E] border-2 border-[#FAF7F2] flex items-center justify-center text-[9px]">
                🌿
              </span>
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#6B7D6F] flex items-center gap-1">
                <span>Ayubowan</span>
                <span className="text-[#CE6B42]">✨</span>
              </div>
              <h1 className="font-display font-bold text-base leading-tight tracking-tight text-[#1E3024]">
                {profile.name}
              </h1>
            </div>
          </div>

          {/* Streak & Seed wallet indicators */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#F5ECE0] border border-[#E8DCC9] rounded-full px-2.5 py-1 text-xs font-semibold text-[#B35832]">
              <Flame size={14} className="text-[#CE6B42] fill-[#CE6B42]" />
              <span className="font-mono tabular-nums">{profile.activeStreak}d</span>
            </div>
            <div className="flex items-center gap-1 bg-[#E3EDE4] border border-[#CCE0CD] rounded-full px-2.5 py-1 text-xs font-semibold text-[#254B2A]">
              <span>🌱</span>
              <span className="font-mono tabular-nums">{profile.seedBalance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 space-y-4">
        {/* Hero Card: "Your Impact This Month" */}
        <div className="bg-white rounded-3xl p-5 border border-[#E3DDD1] shadow-sm relative overflow-hidden">
          {/* Subtle background biophilic glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#9EE08E]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#CE6B42]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#647868]">
                October 2026 Audit
              </span>
              <h2 className="font-display font-bold text-lg text-[#1E3024] tracking-tight">
                Your Impact This Month
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-medium text-[#254B2A] bg-[#EAF3EB] px-2 py-0.5 rounded-full">
                Top 5% Youth in LK
              </span>
            </div>
          </div>

          <p className="text-xs text-[#6B7D6F] leading-relaxed mb-3">
            Real tangible metric tracking verified across Colombo campus hubs and beach drives.
          </p>

          {/* Concentric Leaf-Inspired Progress Rings */}
          <ConcentricRings
            trees={profile.treesPlanted}
            treesGoal={profile.treesGoal}
            wasteKg={profile.wasteDivertedKg}
            wasteGoal={profile.wasteGoal}
            co2Kg={profile.co2SavedKg}
            co2Goal={profile.co2Goal}
            onSelectMetric={setSelectedMetric}
          />
        </div>

        {/* 3 Impact Metric Cards Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Trees Card */}
          <div
            onClick={() => setSelectedMetric(selectedMetric === 'trees' ? null : 'trees')}
            className={`bg-[#FAF7F2] rounded-2xl p-3 border transition-all cursor-pointer ${
              selectedMetric === 'trees'
                ? 'border-[#254B2A] ring-1 ring-[#254B2A] bg-[#EFF6F0]'
                : 'border-[#EAE3D4] hover:border-[#254B2A]/40'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-[#254B2A] text-white flex items-center justify-center mb-2 shadow-xs">
              <TreePine size={17} />
            </div>
            <div className="font-display font-extrabold text-xl text-[#1E3024] tabular-nums tracking-tight">
              {profile.treesPlanted}
            </div>
            <div className="text-[11px] font-semibold text-[#254B2A] leading-tight mt-0.5">
              Trees Planted
            </div>
            <div className="text-[9px] text-[#718274] mt-1 leading-tight">
              Mahogany & Kumbuk
            </div>
          </div>

          {/* Waste Diverted Card */}
          <div
            onClick={() => setSelectedMetric(selectedMetric === 'waste' ? null : 'waste')}
            className={`bg-[#FAF7F2] rounded-2xl p-3 border transition-all cursor-pointer ${
              selectedMetric === 'waste'
                ? 'border-[#507855] ring-1 ring-[#507855] bg-[#EFF5F0]'
                : 'border-[#EAE3D4] hover:border-[#507855]/40'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-[#507855] text-white flex items-center justify-center mb-2 shadow-xs">
              <Trash2 size={17} />
            </div>
            <div className="font-display font-extrabold text-xl text-[#1E3024] tabular-nums tracking-tight">
              {profile.wasteDivertedKg}
              <span className="text-xs font-semibold ml-0.5 text-[#5B6E5F]">kg</span>
            </div>
            <div className="text-[11px] font-semibold text-[#507855] leading-tight mt-0.5">
              Waste Diverted
            </div>
            <div className="text-[9px] text-[#718274] mt-1 leading-tight">
              PET & Textiles
            </div>
          </div>

          {/* CO2 Saved Card */}
          <div
            onClick={() => setSelectedMetric(selectedMetric === 'co2' ? null : 'co2')}
            className={`bg-[#FAF7F2] rounded-2xl p-3 border transition-all cursor-pointer ${
              selectedMetric === 'co2'
                ? 'border-[#CE6B42] ring-1 ring-[#CE6B42] bg-[#FDF4EF]'
                : 'border-[#EAE3D4] hover:border-[#CE6B42]/40'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-[#CE6B42] text-white flex items-center justify-center mb-2 shadow-xs">
              <CloudSun size={17} />
            </div>
            <div className="font-display font-extrabold text-xl text-[#1E3024] tabular-nums tracking-tight">
              {profile.co2SavedKg}
              <span className="text-xs font-semibold ml-0.5 text-[#885A48]">kg</span>
            </div>
            <div className="text-[11px] font-semibold text-[#CE6B42] leading-tight mt-0.5">
              CO2e Saved
            </div>
            <div className="text-[9px] text-[#718274] mt-1 leading-tight">
              ~520km e-scooter
            </div>
          </div>
        </div>

        {/* Gamified Growth Tier Card */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8E1D3]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E3EDE4] text-[#254B2A] flex items-center justify-center">
                <Award size={16} />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#718274] uppercase tracking-wider block">
                  Youth Growth Rank
                </span>
                <span className="font-display font-bold text-sm text-[#1E3024]">
                  Level {profile.level} · {profile.tier}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold tabular-nums text-[#254B2A]">
                {profile.xp} / {profile.nextLevelXp} XP
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full h-2.5 bg-[#E6DFD2] rounded-full overflow-hidden p-0.5 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgressPct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#254B2A] via-[#507855] to-[#9EE08E] rounded-full"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B7D6F]">
            <span>Next: Urban Forest Leader</span>
            <span className="font-semibold text-[#254B2A]">+{profile.nextLevelXp - profile.xp} XP to unlock</span>
          </div>
        </div>

        {/* Circular Economy Habit Loop */}
        <HabitLoop habits={habits} onToggleHabit={onToggleHabit} />

        {/* Quick Action Floating / Inline Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onOpenLogModal}
            className="flex items-center justify-center gap-2 bg-[#254B2A] hover:bg-[#1E3E22] text-[#FAF7F2] py-3.5 px-4 rounded-2xl font-display font-semibold text-xs shadow-md transition-colors"
          >
            <Plus size={16} className="text-[#9EE08E]" />
            <span>Log Eco Action</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onOpenScanModal}
            className="flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#1E3024] border border-[#DDD5C5] py-3.5 px-4 rounded-2xl font-display font-semibold text-xs shadow-xs transition-colors"
          >
            <ScanLine size={16} className="text-[#507855]" />
            <span>Scan Recyclable</span>
          </motion.button>
        </div>

        {/* Hyperlocal Colombo Event Highlight Banner */}
        <div
          onClick={onNavigateToMap}
          className="bg-gradient-to-r from-[#254B2A] to-[#36613C] rounded-2xl p-4 text-white cursor-pointer relative overflow-hidden group shadow-sm"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold text-[#9EE08E] uppercase tracking-wider block">
                Happening This Saturday
              </span>
              <h4 className="font-display font-bold text-sm tracking-tight">
                Galle Face Sunset Beach Cleanup
              </h4>
              <p className="text-[11px] text-[#E0EBDC] flex items-center gap-1">
                <span>📍 Galle Face Green Promenade</span>
                <span>· 34 Joined</span>
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
