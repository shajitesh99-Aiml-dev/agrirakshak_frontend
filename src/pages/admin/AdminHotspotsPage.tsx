import React, { useState, useMemo } from 'react';
import {
  useHotspots,
  HotspotMap,
  HotspotLegend,
  HotspotFilters,
  HotspotDetailsPanel,
  OutbreakAlertCard,
  HotspotMapSkeleton,
} from '../../features/admin';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { MapPin, RefreshCw, AlertCircle, Flame } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';

export const AdminHotspotsPage: React.FC = () => {
  const {
    hotspots,
    alerts,
    selectedHotspot,
    setSelectedHotspot,
    isLoading,
    error,
    refreshHotspots,
  } = useHotspots();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [trendFilter, setTrendFilter] = useState('all');

  const filteredHotspots = useMemo(() => {
    return hotspots.filter((h) => {
      if (severityFilter !== 'all' && h.severity !== severityFilter) return false;
      if (categoryFilter !== 'all' && h.dominantCategory !== categoryFilter) return false;
      if (trendFilter !== 'all' && h.trend !== trendFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesDistrict = h.district.toLowerCase().includes(q);
        const matchesIssue = h.dominantIssue.toLowerCase().includes(q);
        const matchesCrop = h.affectedCrops.some((c) => c.toLowerCase().includes(q));
        if (!matchesDistrict && !matchesIssue && !matchesCrop) return false;
      }
      return true;
    });
  }, [hotspots, severityFilter, categoryFilter, trendFilter, searchQuery]);

  if (isLoading && hotspots.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
            { label: 'Hotspot Surveillance', isCurrent: true },
          ]}
        />
        <HotspotMapSkeleton />
      </div>
    );
  }

  if (error && hotspots.length === 0) {
    return (
      <div className="p-8 rounded-card bg-rose-50 border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-rose-950">Surveillance Data Offline</h2>
          <p className="text-xs text-rose-800 mt-1">{error}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => refreshHotspots()}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="mx-auto"
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
              { label: 'Hotspot Surveillance', isCurrent: true },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-primary" />
            <span>Outbreak Surveillance &amp; Epidemic Heatmaps</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
            Geospatial density telemetry, pathogen cluster concentrations, and algorithmic outbreak notifications.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refreshHotspots()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs"
        >
          Sync GIS Data
        </Button>
      </div>

      {/* Outbreak Alert Directives */}
      {alerts && alerts.length > 0 && (
        <section aria-label="Active Outbreak Directives" className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
              Active Outbreak Directives ({alerts.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <OutbreakAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <HotspotFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severityFilter={severityFilter}
        onSeverityChange={setSeverityFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        trendFilter={trendFilter}
        onTrendChange={setTrendFilter}
        totalFiltered={filteredHotspots.length}
        totalCount={hotspots.length}
      />

      {/* Map & Drill-Down Detail Panel Grid */}
      {filteredHotspots.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <HotspotMap
              hotspots={filteredHotspots}
              selectedHotspot={selectedHotspot}
              onSelectHotspot={(h) => setSelectedHotspot(h)}
            />
            <HotspotLegend />
          </div>

          <div className="lg:col-span-1">
            <HotspotDetailsPanel hotspot={selectedHotspot} />
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Hotspots Matching Filters"
          description="Adjust your search query or severity filters to view agricultural clusters."
          icon={<MapPin className="w-8 h-8 text-neutral-400" />}
          primaryAction={{
            label: 'Reset Filters',
            onClick: () => {
              setSearchQuery('');
              setSeverityFilter('all');
              setCategoryFilter('all');
              setTrendFilter('all');
            },
          }}
        />
      )}
    </div>
  );
};

export default AdminHotspotsPage;
