import React from 'react';
import SearchInput from '../../../../components/ui/SearchInput';
import Select from '../../../../components/ui/Select';
import { Filter } from 'lucide-react';

interface HotspotFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  severityFilter: string;
  onSeverityChange: (s: string) => void;
  categoryFilter: string;
  onCategoryChange: (c: string) => void;
  trendFilter: string;
  onTrendChange: (t: string) => void;
  totalFiltered: number;
  totalCount: number;
}

export const HotspotFilters: React.FC<HotspotFiltersProps> = ({
  searchQuery,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  categoryFilter,
  onCategoryChange,
  trendFilter,
  onTrendChange,
  totalFiltered,
  totalCount,
}) => {
  return (
    <div
      aria-label="Hotspot Surveillance Filters"
      className="p-4 rounded-md bg-white border-2 border-[#172117] shadow-neo space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#2E7D32]" />
          <h2 className="text-sm font-black text-[#172117]">Cluster Surveillance Filters</h2>
        </div>
        <span className="text-xs text-[#496274] font-mono font-bold">
          Showing {totalFiltered} of {totalCount} monitored agricultural clusters
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <SearchInput
          placeholder="Search district, crop, or threat..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onClear={() => onSearchChange('')}
        />

        {/* Severity */}
        <Select
          value={severityFilter}
          onChange={(e) => onSeverityChange(e.target.value)}
          options={[
            { value: 'all', label: 'All Severities' },
            { value: 'critical', label: 'Critical Outbreak' },
            { value: 'high', label: 'High Priority' },
            { value: 'moderate', label: 'Moderate Watch' },
            { value: 'low', label: 'Low Variance' },
          ]}
        />

        {/* Threat Type */}
        <Select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={[
            { value: 'all', label: 'All Pathogens & Pests' },
            { value: 'disease', label: 'Fungal / Viral Diseases' },
            { value: 'pest', label: 'Insect / Arthropod Pests' },
          ]}
        />

        {/* Trend */}
        <Select
          value={trendFilter}
          onChange={(e) => onTrendChange(e.target.value)}
          options={[
            { value: 'all', label: 'All Growth Trajectories' },
            { value: 'increasing', label: 'Rapidly Surging' },
            { value: 'stable', label: 'Stationary / Stable' },
            { value: 'decreasing', label: 'Decreasing / Contained' },
          ]}
        />
      </div>
    </div>
  );
};

export default HotspotFilters;
