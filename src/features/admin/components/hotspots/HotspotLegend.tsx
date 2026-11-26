import React from 'react';
import { AlertOctagon, TrendingUp, Bug, Biohazard } from 'lucide-react';

export const HotspotLegend: React.FC = () => {
  return (
    <div
      aria-label="Hotspot Map Legend"
      className="p-3.5 bg-white rounded-md border-2 border-[#172117] shadow-neo text-xs space-y-2.5"
    >
      <div className="font-black text-[#172117] text-[11px] uppercase tracking-wider">
        Surveillance Legend
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        {/* Severity */}
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-[3px] bg-rose-600 border border-[#172117] shrink-0" />
          <span className="text-[#172117] font-bold">Critical (&gt;20 cases)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-[3px] bg-orange-500 border border-[#172117] shrink-0" />
          <span className="text-[#172117] font-bold">High (15-20 cases)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-[3px] bg-amber-500 border border-[#172117] shrink-0" />
          <span className="text-[#172117] font-bold">Moderate (10-14)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-[3px] bg-emerald-500 border border-[#172117] shrink-0" />
          <span className="text-[#172117] font-bold">Low (&lt;10 cases)</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-[#172117] flex flex-wrap items-center gap-4 text-[11px] text-[#496274] font-bold">
        <span className="flex items-center gap-1">
          <Biohazard className="w-3.5 h-3.5 text-blue-600" />
          <span>Fungal/Viral Disease</span>
        </span>
        <span className="flex items-center gap-1">
          <Bug className="w-3.5 h-3.5 text-amber-700" />
          <span>Insect / Arthropod Pest</span>
        </span>
        <span className="flex items-center gap-1 text-rose-600 font-semibold">
          <TrendingUp className="w-3 h-3" />
          <span>Surging Trend</span>
        </span>
        <span className="flex items-center gap-1 text-neutral-500">
          <AlertOctagon className="w-3 h-3 text-rose-500" />
          <span>Pulsing Radar: Outbreak Active</span>
        </span>
      </div>
    </div>
  );
};

export default HotspotLegend;
