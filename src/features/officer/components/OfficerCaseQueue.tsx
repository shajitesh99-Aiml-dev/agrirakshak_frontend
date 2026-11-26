import React, { useState } from 'react';
import { OfficerCase, OfficerCaseFilter } from '../types/officerTypes';
import CaseQueueFilters from './CaseQueueFilters';
import CaseQueueTable from './CaseQueueTable';
import CaseQueueCard from './CaseQueueCard';
import { LayoutGrid, Table, Inbox } from 'lucide-react';
import Skeleton from '../../../components/ui/Skeleton';

interface OfficerCaseQueueProps {
  cases: OfficerCase[];
  filter: OfficerCaseFilter;
  onFilterChange: (newFilterPartial: Partial<OfficerCaseFilter>) => void;
  onResetFilter: () => void;
  isLoading: boolean;
}

export const OfficerCaseQueue: React.FC<OfficerCaseQueueProps> = ({
  cases,
  filter,
  onFilterChange,
  onResetFilter,
  isLoading,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <CaseQueueFilters
        filter={filter}
        onFilterChange={onFilterChange}
        onReset={onResetFilter}
        totalCount={cases.length}
      />

      {/* View Switcher Header */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span className="font-medium">
          {cases.length} case{cases.length !== 1 ? 's' : ''} in current triage view
        </span>

        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
            aria-label="Table view"
          >
            <Table className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === 'cards' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
            aria-label="Card view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-white rounded-card border border-neutral-200 space-y-2">
              <Skeleton variant="rectangular" height={20} width="35%" />
              <Skeleton variant="text" width="60%" />
            </div>
          ))}
        </div>
      ) : cases.length > 0 ? (
        <>
          {/* Desktop Table (or if viewMode === 'table') */}
          <div className={viewMode === 'table' ? 'hidden md:block' : 'hidden'}>
            <CaseQueueTable cases={cases} />
          </div>

          {/* Mobile & Cards View */}
          <div className={viewMode === 'cards' ? 'space-y-3' : 'space-y-3 md:hidden'}>
            {cases.map((c) => (
              <CaseQueueCard key={c.id} cropCase={c} />
            ))}
          </div>
        </>
      ) : (
        <div className="p-12 text-center bg-white rounded-card border border-neutral-200 space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">No matching cases found</h3>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto font-sans leading-relaxed">
            No farmer cases match your active search or filter criteria. Try clearing filters or selecting another status tab.
          </p>
        </div>
      )}
    </div>
  );
};

export default OfficerCaseQueue;
