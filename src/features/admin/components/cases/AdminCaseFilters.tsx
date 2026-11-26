import React from 'react';
import SearchInput from '../../../../components/ui/SearchInput';
import Select from '../../../../components/ui/Select';
import { AdminCaseFilter } from '../../../../types/analytics';
import { Filter } from 'lucide-react';

interface AdminCaseFiltersProps {
  filter: AdminCaseFilter;
  onFilterChange: (newPartial: Partial<AdminCaseFilter>) => void;
  totalFiltered: number;
}

export const AdminCaseFilters: React.FC<AdminCaseFiltersProps> = ({
  filter,
  onFilterChange,
  totalFiltered,
}) => {
  return (
    <div
      aria-label="Admin Case Governance Filters"
      className="p-4 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-neutral-900">Governance Case Filters</h2>
        </div>
        <span className="text-xs text-neutral-500 font-mono">
          {totalFiltered} cases matching query parameters
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <SearchInput
          placeholder="Search Case ID, farmer, crop, district..."
          value={filter.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          onClear={() => onFilterChange({ search: '' })}
          className="lg:col-span-2"
        />

        {/* Status */}
        <Select
          value={filter.status || 'all'}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          options={[
            { value: 'all', label: 'All Lifecycle Statuses' },
            { value: 'pending', label: 'Pending Officer Review' },
            { value: 'under_review', label: 'Under Active Review' },
            { value: 'escalated', label: 'Escalated Outbreaks' },
            { value: 'resolved', label: 'Resolved & Closed' },
          ]}
        />

        {/* Severity */}
        <Select
          value={filter.severity || 'all'}
          onChange={(e) => onFilterChange({ severity: e.target.value })}
          options={[
            { value: 'all', label: 'All Severities' },
            { value: 'critical', label: 'Critical Severity' },
            { value: 'high', label: 'High Severity' },
            { value: 'moderate', label: 'Moderate Severity' },
            { value: 'low', label: 'Low Severity' },
          ]}
        />

        {/* District */}
        <Select
          value={filter.district || 'all'}
          onChange={(e) => onFilterChange({ district: e.target.value })}
          options={[
            { value: 'all', label: 'All Districts' },
            { value: 'Varanasi', label: 'Varanasi (UP)' },
            { value: 'Nashik', label: 'Nashik (MH)' },
            { value: 'Guntur', label: 'Guntur (AP)' },
            { value: 'Bathinda', label: 'Bathinda (PB)' },
            { value: 'Karnal', label: 'Karnal (HR)' },
            { value: 'Jabalpur', label: 'Jabalpur (MP)' },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminCaseFilters;
