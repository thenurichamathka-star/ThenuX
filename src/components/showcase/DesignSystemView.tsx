import React, { useState } from 'react';
import { Copy, Check, Palette, Type, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export const DesignSystemView: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    {
      name: 'Deep Forest Pine',
      hex: '#254B2A',
      role: 'Primary Navigation Chrome, Outer Progress Ring, Primary CTAs',
      psychology: 'Grounded accountability, stability, biophilic trust',
      textColor: '#FFFFFF',
    },
    {
      name: 'Earthy Moss Sage',
      hex: '#507855',
      role: 'Secondary Tags, Middle Ring, Inactive States, Map Parks',
      psychology: 'Calming foliage, organic balance, natural rhythm',
      textColor: '#FFFFFF',
    },
    {
      name: 'Sprout Lime Glow',
      hex: '#9EE08E',
      role: 'Gamification XP, Active Streak Glow, Dynamic Island Indicator',
      psychology: 'Gen-Z optimism, vitality, youthful reward satisfaction',
      textColor: '#19321D',
    },
    {
      name: 'Warm Terracotta Clay',
      hex: '#CE6B42',
      role: 'Inner Ring (CO2), Upcycling Badge, Hotspot Pins, Fire Streak',
      psychology: 'Human warmth, craft, circular action, anti-industrial',
      textColor: '#FFFFFF',
    },
    {
      name: 'Warm Oat Canvas',
      hex: '#FAF7F2',
      role: 'Mobile Screen Canvas Background, Card Highlights',
      psychology: 'Tactile linen feeling, daylight readability, non-glare',
      textColor: '#1E3024',
    },
    {
      name: 'Linen Sand Backdrop',
      hex: '#EBE4D5',
      role: 'Dribbble Presentation Background with Radial Glows',
      psychology: 'Premium editorial showcase vibe',
      textColor: '#1E3024',
    },
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F4EFE6] text-[#1E3024] p-6 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EDE4] text-xs font-semibold text-[#254B2A] mb-2">
            <Palette size={14} />
            <span>Design Tokens & Aesthetic Architecture</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1E3024]">
            Root & Bloom Design System
          </h1>
          <p className="text-sm text-[#526456] mt-1 max-w-2xl leading-relaxed">
            A comprehensive design system balancing biophilic earthiness, Gen-Z vitality, and rigorous anti-greenwashing accountability.
          </p>
        </div>

        {/* 1. Color Palette Tokens */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E3DDD1] pb-2">
            <Palette size={18} className="text-[#254B2A]" />
            <h2 className="font-display font-bold text-lg text-[#1E3024]">
              01. Earthy Biophilic Color Tokens
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((c) => (
              <div
                key={c.hex}
                onClick={() => copyToClipboard(c.hex)}
                className="bg-white rounded-2xl p-4 border border-[#DDD5C5] shadow-xs cursor-pointer hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div
                  className="w-full h-24 rounded-xl flex items-end justify-between p-3 mb-3 transition-transform group-hover:scale-[1.01]"
                  style={{ backgroundColor: c.hex, color: c.textColor }}
                >
                  <span className="font-mono font-bold text-xs">{c.hex}</span>
                  <button className="w-6 h-6 rounded-md bg-black/20 flex items-center justify-center">
                    {copiedHex === c.hex ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>

                <h3 className="font-display font-bold text-sm text-[#1E3024]">{c.name}</h3>
                <p className="text-[11px] text-[#617464] mt-0.5 leading-snug">{c.role}</p>
                <div className="mt-2 pt-2 border-t border-[#F0EAE0] text-[10px] text-[#8C9C8E]">
                  <em>Impact:</em> {c.psychology}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E3DDD1] pb-2">
            <Type size={18} className="text-[#254B2A]" />
            <h2 className="font-display font-bold text-lg text-[#1E3024]">
              02. Typography Pairing & Scale
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#DDD5C5] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#CE6B42] uppercase font-bold">Display & Headings</span>
                <h4 className="font-display font-bold text-lg text-[#1E3024]">Outfit / Grotesque</h4>
                <p className="text-xs text-[#617464] leading-relaxed">
                  Friendly, rounded-yet-structured geometric grotesque for punchy titles, impact numbers, and cards.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#254B2A] uppercase font-bold">Body & UI Prose</span>
                <h4 className="font-sans font-medium text-lg text-[#1E3024]">Plus Jakarta Sans</h4>
                <p className="text-xs text-[#617464] leading-relaxed">
                  High legibility for touch-screen reading in bright Sri Lankan sunlight. Neutral, approachable, clean.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#507855] uppercase font-bold">Metrics & Verification</span>
                <h4 className="font-mono font-medium text-lg text-[#1E3024]">JetBrains Mono (Tabular)</h4>
                <p className="text-xs text-[#617464] leading-relaxed">
                  Strict tabular alignment for kilograms of plastic, CO2 offsets, and seed balance increments.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0EAE0] space-y-3">
              <div className="flex items-baseline justify-between border-b border-[#F4EFE6] pb-2">
                <span className="text-xs text-[#8C9C8E] font-mono">Display 36px</span>
                <span className="font-display font-bold text-3xl text-[#1E3024]">Your Impact This Month</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-[#F4EFE6] pb-2">
                <span className="text-xs text-[#8C9C8E] font-mono">Title 18px</span>
                <span className="font-display font-bold text-lg text-[#1E3024]">Galle Face Sunset Cleanup</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-[#F4EFE6] pb-2">
                <span className="text-xs text-[#8C9C8E] font-mono">Body 13px</span>
                <span className="text-sm text-[#4E6151]">Turned distressed denim into a heavy-duty daily carry tote.</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#8C9C8E] font-mono">Data 11px</span>
                <span className="font-mono text-xs tabular-nums text-[#254B2A] font-bold">48.5 kg Waste Diverted · 14 Saplings</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Anti-Greenwashing & Zero-Pill Rules */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E3DDD1] pb-2">
            <ShieldCheck size={18} className="text-[#254B2A]" />
            <h2 className="font-display font-bold text-lg text-[#1E3024]">
              03. Anti-Greenwashing & Clean Metadata Discipline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-[#DDD5C5] space-y-2">
              <span className="text-xs font-bold text-[#254B2A] flex items-center gap-1.5">
                <Check size={16} />
                <span>Zero-Pill Metadata Rule</span>
              </span>
              <p className="text-xs text-[#526456] leading-relaxed">
                Informational tags, locations, timestamps, and read counts are rendered as clean, unboxed text separated by typographic middots (<code>·</code>). Pills are strictly reserved for functional buttons, tabs, or interactive toggles.
              </p>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-[#DDD5C5] space-y-2">
              <span className="text-xs font-bold text-[#254B2A] flex items-center gap-1.5">
                <Sparkles size={16} />
                <span>Tangible Accountability</span>
              </span>
              <p className="text-xs text-[#526456] leading-relaxed">
                Every metric is anchored in reality: kilograms of plastic linked directly to Diyatha Hub recycler fiber, and trees linked to native species (Kumbuk & Mahogany) planted in Colombo urban heat corridors.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
