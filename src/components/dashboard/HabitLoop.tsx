import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { HabitStep } from '../../types';

interface HabitLoopProps {
  habits: HabitStep[];
  onToggleHabit: (habitId: string) => void;
}

export const HabitLoop: React.FC<HabitLoopProps> = ({ habits, onToggleHabit }) => {
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8E1D3]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-sm text-[#1E3024] flex items-center gap-1.5">
            <span>Circular Economy Daily Loop</span>
            <span className="text-xs font-normal text-[#6B7E6F]">· 4 Stages</span>
          </h3>
          <p className="text-[11px] text-[#718274] mt-0.5">
            Keep materials cycling in Colombo, zero landfill drift.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold font-mono tabular-nums text-[#254B2A] bg-[#E3EDE4] px-2 py-0.5 rounded-full">
            {completedCount}/{habits.length} Done
          </span>
        </div>
      </div>

      {/* 4 Connected Circular Nodes Flow */}
      <div className="grid grid-cols-4 gap-1.5 relative my-2">
        {habits.map((habit, idx) => (
          <div key={habit.id} className="relative flex flex-col items-center">
            {/* Arrow connecting to next node */}
            {idx < habits.length - 1 && (
              <div className="absolute top-5 left-[65%] w-[70%] h-0.5 z-0 flex items-center justify-center">
                <div
                  className={`w-full h-0.5 transition-colors duration-300 ${
                    habit.completed && habits[idx + 1].completed ? 'bg-[#254B2A]' : 'bg-[#E0D7C6]'
                  }`}
                />
                <ArrowRight
                  size={10}
                  className={`absolute right-0 -mr-1 transition-colors ${
                    habit.completed ? 'text-[#254B2A]' : 'text-[#AFA695]'
                  }`}
                />
              </div>
            )}

            {/* Circular node button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => onToggleHabit(habit.id)}
              className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                habit.completed
                  ? 'bg-[#254B2A] text-white shadow-sm ring-2 ring-[#9EE08E]/50'
                  : 'bg-white text-[#718274] border border-[#DDD5C5] hover:border-[#254B2A]/40'
              }`}
            >
              {habit.completed ? (
                <Check size={18} strokeWidth={2.6} className="text-[#9EE08E]" />
              ) : (
                <span className="text-lg leading-none">{habit.icon}</span>
              )}
            </motion.button>

            {/* Label */}
            <div className="mt-1.5 text-center">
              <span
                className={`block text-[10px] font-semibold leading-tight capitalize ${
                  habit.completed ? 'text-[#254B2A]' : 'text-[#7A8A7C]'
                }`}
              >
                {habit.key}
              </span>
              <span className="text-[9px] text-[#9A8F7D] font-mono tabular-nums">
                +{habit.seeds}s
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active step details list */}
      <div className="mt-3 pt-2.5 border-t border-[#EDE7DC] space-y-1.5">
        {habits.map((habit) => (
          <div
            key={`detail-${habit.id}`}
            onClick={() => onToggleHabit(habit.id)}
            className={`flex items-start justify-between p-2 rounded-xl text-left cursor-pointer transition-colors ${
              habit.completed ? 'bg-[#F2ECE1]/50 text-[#304435]' : 'bg-white/80 hover:bg-white text-[#526456]'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{habit.icon}</span>
              <div>
                <span className="text-xs font-medium text-[#1E3024]">{habit.title}</span>
                <p className="text-[10px] text-[#718274] leading-relaxed line-clamp-1">{habit.action}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 pt-0.5">
              <span
                className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                  habit.completed
                    ? 'bg-[#254B2A]/10 text-[#254B2A] font-semibold'
                    : 'bg-[#F0EBE0] text-[#7E7465]'
                }`}
              >
                {habit.completed ? 'Claimed' : `+${habit.seeds} Seeds`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
