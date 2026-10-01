import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TreePine, Trash2, Scissors, Waves, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LogActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLog: (action: {
    type: 'tree' | 'waste' | 'upcycle' | 'cleanup';
    amount: number;
    seeds: number;
    note: string;
  }) => void;
}

export const LogActionModal: React.FC<LogActionModalProps> = ({ isOpen, onClose, onConfirmLog }) => {
  const [selectedType, setSelectedType] = useState<'tree' | 'waste' | 'upcycle' | 'cleanup'>('tree');
  const [amount, setAmount] = useState<number>(1);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const actionPresets = {
    tree: {
      title: 'Planted Native Sapling',
      unit: 'trees',
      rateCo2: 12,
      seedsPerUnit: 50,
      icon: <TreePine size={20} />,
      color: '#254B2A',
      placeholder: 'e.g. Kumbuk sapling planted at campus perimeter',
    },
    waste: {
      title: 'Diverted Plastic / Compost',
      unit: 'kg',
      rateCo2: 1.5,
      seedsPerUnit: 10,
      icon: <Trash2 size={20} />,
      color: '#507855',
      placeholder: 'e.g. Sorted 3kg PET bottles dropped at Diyatha Uyana',
    },
    upcycle: {
      title: 'Repaired or Upcycled Item',
      unit: 'items',
      rateCo2: 3.5,
      seedsPerUnit: 35,
      icon: <Scissors size={20} />,
      color: '#CE6B42',
      placeholder: 'e.g. Mended torn canvas backpack instead of buying new',
    },
    cleanup: {
      title: 'Joined Beach or Canal Clean-up',
      unit: 'hours',
      rateCo2: 8.0,
      seedsPerUnit: 40,
      icon: <Waves size={20} />,
      color: '#2A6150',
      placeholder: 'e.g. 2 hours sifting microplastics at Mt. Lavinia',
    },
  };

  const currentPreset = actionPresets[selectedType];
  const calculatedSeeds = Math.round(amount * currentPreset.seedsPerUnit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#254B2A', '#9EE08E', '#CE6B42', '#FAF7F2'],
    });

    onConfirmLog({
      type: selectedType,
      amount,
      seeds: calculatedSeeds,
      note: note || currentPreset.placeholder,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-[#FAF7F2] rounded-3xl p-5 w-full max-w-sm border border-[#E3DDD1] shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#DDD5C5] flex items-center justify-center text-[#6B7D6F] hover:text-[#1E3024]"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-[#E3EDE4] text-[#254B2A] flex items-center justify-center">
            <Sparkles size={14} />
          </div>
          <span className="text-[11px] font-bold text-[#647868] uppercase tracking-wider">
            Verified Youth Audit
          </span>
        </div>
        <h2 className="font-display font-bold text-lg text-[#1E3024]">
          Log Tangible Eco Action
        </h2>
        <p className="text-xs text-[#718274] mt-0.5">
          Updates your personal progress rings and rewards Seed tokens.
        </p>

        {/* Action Type Selector */}
        <div className="grid grid-cols-2 gap-2 my-4">
          {(Object.keys(actionPresets) as Array<keyof typeof actionPresets>).map((type) => {
            const isSelected = selectedType === type;
            const p = actionPresets[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setSelectedType(type);
                  setAmount(1);
                }}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-white border-[#254B2A] ring-2 ring-[#254B2A]/20 shadow-xs'
                    : 'bg-white/60 border-[#E5DFD4] hover:bg-white'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center mb-1 text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.icon}
                </div>
                <div className="font-display font-semibold text-xs text-[#1E3024] leading-tight">
                  {p.title}
                </div>
                <div className="text-[10px] text-[#718274] mt-0.5 font-mono">
                  +{p.seedsPerUnit} seeds/{p.unit}
                </div>
              </button>
            );
          })}
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Quantity Counter */}
          <div className="bg-white p-3 rounded-2xl border border-[#DDD5C5] flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1E3024]">
              Quantity ({currentPreset.unit}):
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAmount(Math.max(1, amount - 1))}
                className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#DDD5C5] font-bold text-sm text-[#1E3024] hover:bg-[#EAE3D4]"
              >
                -
              </button>
              <span className="font-display font-bold text-base text-[#1E3024] tabular-nums min-w-[24px] text-center">
                {amount}
              </span>
              <button
                type="button"
                onClick={() => setAmount(amount + 1)}
                className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#DDD5C5] font-bold text-sm text-[#1E3024] hover:bg-[#EAE3D4]"
              >
                +
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-semibold text-[#647868] block mb-1">
              Short Description / Location:
            </label>
            <input
              type="text"
              placeholder={currentPreset.placeholder}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDD5C5] text-xs placeholder:text-[#9AABA0] focus:outline-none focus:ring-1 focus:ring-[#254B2A]"
            />
          </div>

          {/* Reward Summary */}
          <div className="p-3 bg-[#E3EDE4] rounded-2xl flex items-center justify-between text-xs">
            <span className="text-[#254B2A] font-semibold">Reward for this action:</span>
            <span className="font-mono font-bold text-[#254B2A] text-sm">
              +{calculatedSeeds} Seeds 🌱
            </span>
          </div>

          {/* Submit CTA */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-3 bg-[#254B2A] text-white rounded-2xl font-display font-semibold text-xs shadow-md hover:bg-[#1E3E22] transition-colors flex items-center justify-center gap-1.5"
          >
            <Check size={16} />
            <span>Confirm & Update Rings</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
