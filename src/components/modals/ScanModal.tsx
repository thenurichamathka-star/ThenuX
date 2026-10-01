import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ScanLine, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (seeds: number) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, onReward }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<{
    name: string;
    material: string;
    recyclable: boolean;
    colomboBin: string;
    reward: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setScannedResult(null);
    setTimeout(() => {
      setScanning(false);
      setScannedResult({
        name: 'Ceylon Herbal Tonic Glass Bottle',
        material: 'Type 1 Amber Borosilicate Glass (100% Recyclable)',
        recyclable: true,
        colomboBin: 'Orange Bin / Pettah Circular Depot Drop',
        reward: 15,
      });
    }, 1200);
  };

  const handleClaim = () => {
    if (scannedResult) {
      onReward(scannedResult.reward);
    }
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

        <div className="flex items-center gap-1.5 mb-1">
          <ScanLine size={16} className="text-[#507855]" />
          <span className="text-[11px] font-bold text-[#647868] uppercase tracking-wider">
            Packaging Recyclability Scanner
          </span>
        </div>
        <h2 className="font-display font-bold text-lg text-[#1E3024]">
          Scan Barcode or Material
        </h2>
        <p className="text-xs text-[#718274] mt-0.5">
          Detects packaging composition & directs to nearest Colombo circular drop-off.
        </p>

        {/* Viewfinder simulation */}
        <div className="my-4 relative h-48 bg-[#1B291E] rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-[#3A4E3E]">
          {/* Viewfinder corners */}
          <div className="w-32 h-32 border-2 border-dashed border-[#9EE08E]/70 rounded-xl relative flex items-center justify-center">
            {/* Animated scanning line */}
            {scanning && (
              <motion.div
                initial={{ top: '10%' }}
                animate={{ top: '90%' }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute left-2 right-2 h-0.5 bg-[#9EE08E] shadow-[0_0_8px_#9EE08E]"
              />
            )}
            <span className="text-3xl opacity-80">🧴</span>
          </div>

          <p className="text-[10px] text-[#A8C4AD] mt-2 font-mono">
            {scanning ? 'Analyzing barcode & resin code...' : 'Point camera at product packaging'}
          </p>
        </div>

        {/* Result Area */}
        {scannedResult ? (
          <div className="p-3 bg-white rounded-2xl border border-[#254B2A]/30 mb-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#254B2A]">
              <CheckCircle2 size={16} className="text-[#254B2A]" />
              <span>{scannedResult.name}</span>
            </div>
            <div className="text-[11px] text-[#556958]">
              <strong>Material:</strong> {scannedResult.material}
            </div>
            <div className="text-[11px] text-[#556958]">
              <strong>Colombo Drop:</strong> {scannedResult.colomboBin}
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#254B2A]">
                +{scannedResult.reward} Seeds Reward
              </span>
              <button
                onClick={handleClaim}
                className="px-3 py-1 bg-[#254B2A] text-white rounded-lg text-xs font-semibold"
              >
                Claim Seeds
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSimulateScan}
              disabled={scanning}
              className="flex-1 py-3 bg-[#254B2A] text-white rounded-2xl font-display font-semibold text-xs shadow-md hover:bg-[#1E3E22] transition-colors flex items-center justify-center gap-2"
            >
              <ScanLine size={16} />
              <span>{scanning ? 'Scanning...' : 'Simulate Scan'}</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
