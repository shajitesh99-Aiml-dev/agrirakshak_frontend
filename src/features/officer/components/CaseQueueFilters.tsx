import React from 'react';
import { OfficerCaseFilter } from '../types/officerTypes';
import { Search, Filter, X } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface CaseQueueFiltersProps {
  filter: OfficerCaseFilter;
  onFilterChange: (newFilterPartial: Partial<OfficerCaseFilter>) => void;
  onReset: () => void;
  totalCount: number;
}

export const CaseQueueFilters: React.FC<CaseQueueFiltersProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalCount,
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'escalated', label: 'Escalated to Officer' },
    { value: 'resolved', label: 'Resolved' },
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'high', label: 'High / Critical' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'low', label: 'Mild / Low' },
  ];

  const cropOptions = [
    { value: 'all', label: 'All Crops' },
    { value: 'tomato', label: 'Tomato (टमाटर)' },
    { value: 'cotton', label: 'Cotton (कपास)' },
    { value: 'wheat', label: 'Wheat (गेहूं)' },
    { value: 'soybean', label: 'Soybean (सोयाबीन)' },
    { value: 'rice', label: 'Paddy / Rice (धान)' },
  ];

  const hasActiveFilters =
    (filter.status && filter.status !== 'all') ||
    (filter.severity && filter.severity !== 'all') ||
    (filter.crop && filter.crop !== 'all') ||
    Boolean(filter.search && filter.search.trim() !== '');

  return (
    <div className="p-4 sm:p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3.5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Case ID (#CASE-2026-...), Farmer, Crop, Village, District..."
            value={filter.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/70 hover:bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            aria-label="Search cases"
          />
        </div>

        {/* Clear Filter Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-neutral-600 hover:text-red-700 gap-1 shrink-0 min-h-[42px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </Button>
        )}
      </div>

      {/* Dropdown Filters Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-500 font-bold shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {/* Status Filter */}
        <select
          value={filter.status || 'all'}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          aria-label="Filter cases by status"
          className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-md font-medium text-neutral-800 hover:border-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Severity Filter */}
        <select
          value={filter.severity || 'all'}
          onChange={(e) => onFilterChange({ severity: e.target.value })}
          aria-label="Filter cases by severity"
          className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-md font-medium text-neutral-800 hover:border-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {severityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Crop Filter */}
        <select
          value={filter.crop || 'all'}
          onChange={(e) => onFilterChange({ crop: e.target.value })}
          aria-label="Filter cases by crop"
          className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-md font-medium text-neutral-800 hover:border-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {cropOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="ml-auto text-neutral-400 font-medium">
          Showing <strong className="text-neutral-800">{totalCount}</strong> cases
        </span>
      </div>
    </div>
  );
};

export default CaseQueueFilters;
