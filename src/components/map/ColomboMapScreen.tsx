import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Calendar, Users, Award, ChevronRight, Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { ColomboProject } from '../../types';

interface ColomboMapScreenProps {
  projects: ColomboProject[];
  onToggleRsvp: (projectId: string) => void;
  selectedProjectId?: string | null;
}

export const ColomboMapScreen: React.FC<ColomboMapScreenProps> = ({
  projects,
  onToggleRsvp,
  selectedProjectId: initialSelectedId,
}) => {
  const [selectedProject, setSelectedProject] = useState<ColomboProject | null>(() => {
    if (initialSelectedId) {
      return projects.find((p) => p.id === initialSelectedId) || projects[0];
    }
    return projects[0];
  });
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cleanup' | 'planting' | 'wetland' | 'depot'>('all');

  const filteredProjects = projects.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  return (
    <div className="flex flex-col h-full min-h-full pb-24 text-[#1E3024] relative">
      {/* Top Map App Bar */}
      <div className="pt-3 px-5 pb-3 sticky top-0 z-20 bg-[#F4EFE6]/90 backdrop-blur-md border-b border-[#EAE3D4]/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#647868]">
              Colombo Eco Pulse
            </span>
            <h1 className="font-display font-bold text-lg text-[#1E3024] tracking-tight">
              Community Action Map
            </h1>
          </div>

          <div className="flex items-center gap-1.5 bg-[#254B2A] text-white px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#9EE08E] animate-pulse" />
            <span>14 Active Projects</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              categoryFilter === 'all'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            All Hotspots
          </button>
          <button
            onClick={() => setCategoryFilter('cleanup')}
            className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              categoryFilter === 'cleanup'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Cleanups 🌊
          </button>
          <button
            onClick={() => setCategoryFilter('planting')}
            className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              categoryFilter === 'planting'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Tree Canopy 🌲
          </button>
          <button
            onClick={() => setCategoryFilter('depot')}
            className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              categoryFilter === 'depot'
                ? 'bg-[#254B2A] text-white'
                : 'bg-white text-[#617464] border border-[#DDD5C5]'
            }`}
          >
            Depots ♻️
          </button>
        </div>
      </div>

      {/* Stylized Vector Map of Colombo */}
      <div className="px-5 pt-3 flex-1 flex flex-col">
        <div className="relative w-full aspect-[4/3.8] bg-[#E9E3D3] rounded-3xl overflow-hidden border border-[#D5CDBD] shadow-inner">
          <svg viewBox="0 0 360 340" className="w-full h-full">
            <defs>
              <linearGradient id="oceanMapGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#76A89B" />
                <stop offset="100%" stopColor="#8FC0B4" />
              </linearGradient>
              <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5EFE3" />
                <stop offset="100%" stopColor="#EDE5D3" />
              </linearGradient>
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E3DBD0" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* Indian Ocean base (Left side) */}
            <rect width="360" height="340" fill="url(#oceanMapGrad)" />
            <path
              d="M0 40 Q25 35 45 42 T90 40"
              stroke="#A8D6CA"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M0 120 Q30 115 50 122 T95 120"
              stroke="#A8D6CA"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M0 240 Q20 235 40 242 T80 240"
              stroke="#A8D6CA"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
            />

            {/* Sri Lanka Western Coastline Landmass */}
            {/* Coastline shape from Fort / Port City down to Wellawatte */}
            <path
              d="M360 0 L115 0 C105 30 75 45 78 70 C80 90 92 110 88 140 C85 170 95 200 90 240 C86 280 100 310 110 340 L360 340 Z"
              fill="url(#landGrad)"
            />

            {/* Grid overlay over land */}
            <path
              d="M360 0 L115 0 C105 30 75 45 78 70 C80 90 92 110 88 140 C85 170 95 200 90 240 C86 280 100 310 110 340 L360 340 Z"
              fill="url(#gridPattern)"
            />

            {/* Colombo Port City Peninsula Reclamation */}
            <path
              d="M78 50 C60 50 55 75 75 80 C82 82 85 70 82 55 Z"
              fill="#E5DDD0"
              stroke="#C9BFA8"
              strokeWidth="1.2"
            />
            <text x="56" y="65" fill="#7A8077" fontSize="7" fontWeight="600">Port City</text>

            {/* Galle Face Green Coastal Strip */}
            <rect x="76" y="90" width="12" height="42" rx="4" fill="#69946E" fillOpacity="0.8" />
            <text x="64" y="112" fill="#254B2A" fontSize="7" fontWeight="700" transform="rotate(-90 64 112)">
              Galle Face
            </text>

            {/* Beira Lake Network */}
            <path
              d="M135 110 C145 95 165 95 175 115 C185 130 160 145 145 138 C130 130 125 120 135 110 Z"
              fill="#6EA495"
            />
            <path
              d="M150 135 C160 145 175 140 180 155 C175 165 155 160 148 150 Z"
              fill="#6EA495"
            />
            <text x="145" y="125" fill="#FAF7F2" fontSize="7" fontWeight="600">Beira Lake</text>

            {/* Viharamahadevi Park Green Canopy */}
            <rect x="175" y="150" width="38" height="34" rx="8" fill="#507855" fillOpacity="0.85" />
            <text x="178" y="168" fill="#FAF7F2" fontSize="6.5" fontWeight="700">Viharamahadevi</text>
            <text x="178" y="176" fill="#D3E8D5" fontSize="6" fontWeight="500">Urban Park</text>

            {/* Diyatha Uyana / Battaramulla wetland area */}
            <path
              d="M270 190 C290 180 320 195 310 220 C290 230 260 215 270 190 Z"
              fill="#7AA699"
            />
            <text x="272" y="208" fill="#FAF7F2" fontSize="6.5" fontWeight="600">Diyatha Uyana</text>

            {/* Arterial Roads: Galle Road & Marine Drive */}
            <path
              d="M86 85 L96 140 L94 200 L96 260 L102 340"
              stroke="#D4CABE"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M86 85 L96 140 L94 200 L96 260 L102 340"
              stroke="#FAF7F2"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* High Level Road */}
            <path
              d="M140 140 Q200 180 280 230"
              stroke="#FAF7F2"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Compass Rose */}
            <g transform="translate(325, 30)">
              <circle cx="10" cy="10" r="12" fill="#FAF7F2" fillOpacity="0.85" />
              <path d="M10 2 L13 10 L10 18 L7 10 Z" fill="#254B2A" />
              <text x="10" y="0" fill="#254B2A" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
            </g>
          </svg>

          {/* Interactive Project Hotspot Pins */}
          {filteredProjects.map((proj) => {
            const isSelected = selectedProject?.id === proj.id;
            return (
              <div
                key={proj.id}
                style={{ left: `${proj.coords.x}%`, top: `${proj.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => setSelectedProject(proj)}
              >
                {/* Pulsing beacon if selected */}
                {isSelected && (
                  <span className="absolute -inset-2.5 rounded-full bg-[#CE6B42] animate-ping opacity-75" />
                )}

                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isSelected
                      ? 'bg-[#CE6B42] text-white ring-2 ring-white scale-110 z-20'
                      : proj.category === 'cleanup'
                      ? 'bg-[#254B2A] text-white ring-1 ring-[#FAF7F2]'
                      : proj.category === 'planting'
                      ? 'bg-[#507855] text-white ring-1 ring-[#FAF7F2]'
                      : 'bg-[#9EE08E] text-[#19321D] ring-1 ring-[#254B2A]'
                  }`}
                >
                  <span className="text-xs">
                    {proj.category === 'cleanup'
                      ? '🌊'
                      : proj.category === 'planting'
                      ? '🌲'
                      : proj.category === 'wetland'
                      ? '🛶'
                      : '♻️'}
                  </span>
                </motion.div>

                {/* Pin label pill */}
                <div
                  className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] px-1.5 py-0.5 rounded-md pointer-events-none transition-all shadow-xs ${
                    isSelected
                      ? 'bg-[#1E3024] text-white font-bold opacity-100'
                      : 'bg-white/90 text-[#304435] font-semibold opacity-90'
                  }`}
                >
                  {proj.name.split(' ')[0]} {proj.name.split(' ')[1]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Event Drawer / Bottom Sheet */}
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-3 bg-white rounded-3xl p-4 border border-[#E3DDD1] shadow-xs space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#CE6B42] uppercase tracking-wider block">
                    {selectedProject.neighborhood}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#1E3024] leading-snug">
                    {selectedProject.name}
                  </h3>
                  <div className="text-[11px] text-[#718274] flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#CE6B42]" />
                    <span>{selectedProject.locationName}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#254B2A] bg-[#E3EDE4] px-2 py-0.5 rounded-full block">
                    +{selectedProject.seedReward} Seeds
                  </span>
                </div>
              </div>

              {/* Event Time & Attendees */}
              <div className="grid grid-cols-2 gap-2 p-2 bg-[#FAF7F2] rounded-xl border border-[#ECE5D8] text-xs">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#507855]" />
                  <div>
                    <div className="text-[10px] text-[#7A8A7D]">Schedule</div>
                    <div className="font-medium text-[11px] text-[#1E3024]">{selectedProject.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#507855]" />
                  <div>
                    <div className="text-[10px] text-[#7A8A7D]">Joined</div>
                    <div className="font-medium text-[11px] text-[#1E3024] font-mono tabular-nums">
                      {selectedProject.attendeesCount} Youth Peers
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights & Gear Checklist */}
              <div className="space-y-1">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#526456]">
                    <Check size={12} className="text-[#254B2A] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onToggleRsvp(selectedProject.id)}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                    selectedProject.userRsvpd
                      ? 'bg-[#E3EDE4] text-[#254B2A] border border-[#BBD5BF]'
                      : 'bg-[#254B2A] text-white hover:bg-[#1E3E22]'
                  }`}
                >
                  {selectedProject.userRsvpd ? (
                    <>
                      <Check size={14} strokeWidth={2.5} />
                      <span>RSVP Confirmed (See You There!)</span>
                    </>
                  ) : (
                    <>
                      <span>Join Project (RSVP)</span>
                      <span className="text-[10px] opacity-80">· +{selectedProject.seedReward} Seeds</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
