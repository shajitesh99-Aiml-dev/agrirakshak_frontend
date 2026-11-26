import React, { useState } from 'react';
import { Hotspot } from '../../../../types/analytics';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Bug, Biohazard, Flame } from 'lucide-react';

interface HotspotMapProps {
  hotspots: Hotspot[];
  selectedHotspot: Hotspot | null;
  onSelectHotspot: (h: Hotspot) => void;
}

// Bounding box for India coordinate projection
// Longitude: 68° E to 97° E (width span ~ 29°)
// Latitude: 8° N to 36° N (height span ~ 28°)
const MIN_LNG = 68.0;
const MAX_LNG = 97.0;
const MIN_LAT = 8.0;
const MAX_LAT = 36.0;

function projectCoordinates(lat: number, lng: number, width = 640, height = 600) {
  const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * width;
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * height;
  return { x: Math.round(x), y: Math.round(y) };
}

export const HotspotMap: React.FC<HotspotMapProps> = ({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [regionFilter, setRegionFilter] = useState<'all' | 'north' | 'central' | 'south'>('all');

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'critical':
        return { fill: '#E11D48', stroke: '#881337', ping: 'bg-rose-500' };
      case 'high':
        return { fill: '#EA580C', stroke: '#7C2D12', ping: 'bg-orange-500' };
      case 'moderate':
        return { fill: '#D97706', stroke: '#78350F', ping: 'bg-amber-500' };
      case 'low':
      default:
        return { fill: '#059669', stroke: '#064E3B', ping: 'bg-emerald-500' };
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 2.2));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRegionFilter('all');
  };

  return (
    <div className="relative rounded-card bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-slate-700/80 shadow-card p-4 sm:p-5 overflow-hidden text-white flex flex-col justify-between">
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/80 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>National Crop Outbreak GIS Canvas</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                Live Geocoded
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Aggregated district clusters &amp; pathogen concentrations (Privacy Preserved)
            </p>
          </div>
        </div>

        {/* Region & Zoom Controls */}
        <div className="flex items-center gap-2">
          {/* Region preset selector */}
          <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700 p-0.5 text-xs">
            {(['all', 'north', 'central', 'south'] as const).map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setRegionFilter(reg)}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors ${
                  regionFilter === reg
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700 p-0.5">
            <button
              type="button"
              onClick={() => handleZoom(0.2)}
              title="Zoom in"
              aria-label="Zoom in on map"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.2)}
              title="Zoom out"
              aria-label="Zoom out on map"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Reset zoom"
              aria-label="Reset map zoom"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map Area */}
      <div
        className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center overflow-hidden my-2 select-none"
        role="region"
        aria-label="Interactive India Agriculture Map"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          className="relative transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Main SVG Map of India boundary outlines */}
          <svg
            width="640"
            height="580"
            viewBox="0 0 640 580"
            className="w-[320px] sm:w-[480px] md:w-[600px] h-auto drop-shadow-2xl"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Approximate stylized India peninsula and northern frontiers silhouette */}
            <path
              d="M 230 40 
                 L 260 30 L 290 55 L 295 90 L 330 95 L 360 120 L 400 135 L 440 130 L 470 145 L 490 170 L 530 175 L 560 200 L 550 230 L 500 240 L 460 220 L 420 230 L 400 260 L 380 290 L 360 330 L 330 380 L 300 450 L 280 520 L 270 545 L 260 520 L 230 460 L 200 410 L 175 350 L 160 300 L 130 260 L 110 230 L 130 200 L 160 170 L 180 140 L 190 100 L 210 70 Z"
              fill="url(#mapGradient)"
              stroke="#334155"
              strokeWidth="2"
              className="transition-colors hover:stroke-slate-500"
            />

            {/* Internal State / Agro-climatic Region Lines */}
            {/* Northern Gangetic Plains */}
            <path
              d="M 200 140 Q 280 150 380 180 Q 420 200 460 220"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {/* Central Deccan Plateau */}
            <path
              d="M 160 260 Q 260 270 360 290 Q 380 340 330 380"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {/* Coastal & Delta Belts */}
            <path
              d="M 180 360 Q 260 410 280 500"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            {/* Regional Labels */}
            <text x="270" y="80" fill="#64748B" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Northern Wheat/Mustard Belt
            </text>
            <text x="350" y="210" fill="#64748B" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Indo-Gangetic Basin
            </text>
            <text x="240" y="320" fill="#64748B" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Central Cotton / Soybean Belt
            </text>
            <text x="270" y="440" fill="#64748B" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Southern Chilli / Paddy Delta
            </text>

            {/* Geocoded Hotspot Markers */}
            {hotspots.map((h) => {
              const { x, y } = projectCoordinates(h.latitude, h.longitude, 640, 580);
              const isSelected = selectedHotspot?.id === h.id;
              const colors = getSeverityColor(h.severity);
              const radius = Math.min(Math.max(h.caseCount * 0.9, 10), 26);

              return (
                <g
                  key={h.id}
                  transform={`translate(${x}, ${y})`}
                  onClick={() => onSelectHotspot(h)}
                  className="cursor-pointer group focus:outline-hidden"
                  tabIndex={0}
                  role="button"
                  aria-label={`${h.district} Hotspot: ${h.dominantIssue}, ${h.caseCount} cases, severity ${h.severity}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectHotspot(h);
                    }
                  }}
                >
                  {/* Radar animated pulsing ring for critical/high hotspots */}
                  {(h.severity === 'critical' || h.severity === 'high') && (
                    <circle
                      r={radius * 1.6}
                      fill={colors.fill}
                      fillOpacity="0.18"
                      className="animate-ping origin-center"
                    />
                  )}

                  {/* Outer density area ring */}
                  <circle
                    r={radius}
                    fill={colors.fill}
                    fillOpacity={isSelected ? '0.35' : '0.2'}
                    stroke={colors.fill}
                    strokeWidth={isSelected ? '2' : '1'}
                    className="transition-all group-hover:fill-opacity-40"
                  />

                  {/* Center pin core */}
                  <circle
                    r={isSelected ? 8 : 6}
                    fill={colors.fill}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    filter="url(#glow)"
                    className="transition-all group-hover:scale-125"
                  />

                  {/* Interactive Label Pin */}
                  <g transform="translate(10, -10)" className="pointer-events-none">
                    <rect
                      x="0"
                      y="-12"
                      width={Math.max(h.district.length * 7 + 28, 70)}
                      height="18"
                      rx="4"
                      fill="#0F172A"
                      fillOpacity="0.9"
                      stroke={isSelected ? '#F59E0B' : '#475569'}
                      strokeWidth={isSelected ? '1.5' : '0.8'}
                    />
                    <text
                      x="6"
                      y="1"
                      fill="#F8FAFC"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {h.district} ({h.caseCount})
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Hotspot Floating HUD Overlay */}
        {selectedHotspot && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl z-30 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedHotspot.district}, {selectedHotspot.state}</span>
              </span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                {selectedHotspot.severity}
              </span>
            </div>

            <p className="text-xs font-bold text-white line-clamp-1">
              {selectedHotspot.dominantIssue}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                {selectedHotspot.dominantCategory === 'disease' ? (
                  <Biohazard className="w-3 h-3 text-cyan-400" />
                ) : (
                  <Bug className="w-3 h-3 text-amber-400" />
                )}
                <span>{selectedHotspot.caseCount} cluster cases</span>
              </span>
              <span className="font-semibold text-amber-300">Trend: {selectedHotspot.trend}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-white font-semibold">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>{hotspots.length} Clusters Monitored</span>
          </span>
          <span>•</span>
          <span>Click cluster pin to inspect drill-down details</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Datum: WGS84 Centroid Projected
        </span>
      </div>
    </div>
  );
};

export default HotspotMap;
