import React from 'react';
import { Hotspot } from '../../../../types/analytics';
import {
  MapPin,
  TrendingUp,
  Users,
  Sprout,
  ArrowRight,
  ShieldAlert,
  Biohazard,
  Bug,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routeConfig';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

interface HotspotDetailsPanelProps {
  hotspot: Hotspot | null;
}

export const HotspotDetailsPanel: React.FC<HotspotDetailsPanelProps> = ({ hotspot }) => {
  if (!hotspot) {
    return (
      <div className="p-6 rounded-card bg-white border border-neutral-200 text-center text-sm text-neutral-500 h-full flex flex-col items-center justify-center">
        <MapPin className="w-8 h-8 text-neutral-300 mb-2" />
        <h3 className="font-bold text-neutral-700">No Hotspot Selected</h3>
        <p className="text-xs text-neutral-500 mt-1">
          Select any cluster marker on the map to review epidemiological details and administrative directives.
        </p>
      </div>
    );
  }

  const getSeverityBadgeVariant = (sev: string): 'error' | 'warning' | 'info' | 'success' => {
    switch (sev) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'moderate':
        return 'info';
      case 'low':
      default:
        return 'success';
    }
  };

  return (
    <div
      aria-label={`Hotspot Details: ${hotspot.district}`}
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4 h-full flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-150">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                #{hotspot.id}
              </span>
              <Badge variant={getSeverityBadgeVariant(hotspot.severity)} size="sm" className="font-bold uppercase text-xs">
                {hotspot.severity} SEVERITY
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mt-1">
              {hotspot.district}, {hotspot.state}
            </h3>
            <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Sub-district Cluster: {hotspot.village || 'Primary Agricultural Belt'}</span>
            </p>
          </div>
        </div>

        {/* Threat Card */}
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-600 flex items-center gap-1.5">
              {hotspot.dominantCategory === 'disease' ? (
                <Biohazard className="w-4 h-4 text-blue-600" />
              ) : (
                <Bug className="w-4 h-4 text-amber-600" />
              )}
              <span>Dominant Issue Identified</span>
            </span>
            <span className="font-bold text-neutral-900 capitalize px-2 py-0.5 rounded bg-white border border-neutral-200">
              {hotspot.dominantCategory}
            </span>
          </div>

          <div className="text-base font-bold text-neutral-900">
            {hotspot.dominantIssue}
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-600 pt-1 border-t border-neutral-200/80">
            <span>Cluster Concentration:</span>
            <span className="font-mono font-bold text-rose-700 text-sm">
              {hotspot.caseCount} Active Cases
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="text-neutral-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span>Surveillance Trend</span>
            </span>
            <div className="font-bold text-neutral-900 capitalize text-sm">
              {hotspot.trend}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="text-neutral-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Scouts Assigned</span>
            </span>
            <div className="font-bold text-neutral-900 text-sm font-mono">
              {hotspot.officersAssigned || 2} Extension Officers
            </div>
          </div>
        </div>

        {/* Affected Crops */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-neutral-600 flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vulnerable Crops in Corridor</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hotspot.affectedCrops.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Administrative Directive */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Recommended Governance Action</span>
          </div>
          <p className="text-neutral-700 leading-relaxed font-sans">
            Coordinate with {hotspot.district} District Agriculture Officer to dispatch extension scouts for spore/larva collection and release bio-control advisory.
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-neutral-150">
        <Link
          to={`${ROUTES.ADMIN_CASES}?district=${encodeURIComponent(hotspot.district)}`}
          className="w-full block"
        >
          <Button variant="primary" size="md" className="w-full gap-2 justify-center font-bold">
            <span>Drill Into {hotspot.district} Cases</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HotspotDetailsPanel;
