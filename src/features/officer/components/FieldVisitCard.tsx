import React from 'react';
import { FieldVisit } from '../types/officerTypes';
import { Calendar, Clock, MapPin, Edit3, CalendarCheck } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface FieldVisitCardProps {
  fieldVisit?: FieldVisit;
  onEdit?: () => void;
}

export const FieldVisitCard: React.FC<FieldVisitCardProps> = ({ fieldVisit, onEdit }) => {
  if (!fieldVisit || !fieldVisit.required) {
    return null;
  }

  return (
    <div className="p-4 sm:p-5 rounded-card bg-indigo-50/60 border border-indigo-200 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-indigo-200/70 pb-2.5">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-indigo-700" aria-hidden="true" />
          <h3 className="text-sm font-bold text-indigo-950 tracking-tight">
            Scheduled Agronomist Field Inspection
          </h3>
        </div>

        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-xs text-indigo-700 hover:text-indigo-900 gap-1 p-1 h-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Reschedule</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-2.5 bg-white rounded-lg border border-indigo-150">
          <span className="text-neutral-500 flex items-center gap-1 text-[11px]">
            <Calendar className="w-3 h-3 text-indigo-500" />
            <span>Date</span>
          </span>
          <span className="font-bold text-neutral-900 block mt-0.5">
            {fieldVisit.scheduledDate || 'Date to be confirmed'}
          </span>
        </div>

        <div className="p-2.5 bg-white rounded-lg border border-indigo-150">
          <span className="text-neutral-500 flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-indigo-500" />
            <span>Time</span>
          </span>
          <span className="font-bold text-neutral-900 block mt-0.5">
            {fieldVisit.preferredTime || 'Morning Shift'}
          </span>
        </div>

        <div className="p-2.5 bg-white rounded-lg border border-indigo-150">
          <span className="text-neutral-500 flex items-center gap-1 text-[11px]">
            <MapPin className="w-3 h-3 text-indigo-500" />
            <span>Plot / Location</span>
          </span>
          <span className="font-bold text-neutral-900 block mt-0.5 truncate" title={fieldVisit.location}>
            {fieldVisit.location || 'Farmer plot'}
          </span>
        </div>
      </div>

      {fieldVisit.officerNotes && (
        <div className="p-2.5 bg-white rounded-lg border border-indigo-150 text-xs">
          <span className="text-neutral-500 block text-[11px] font-semibold">Inspection Objective</span>
          <p className="text-neutral-800 font-sans mt-0.5 leading-relaxed">{fieldVisit.officerNotes}</p>
        </div>
      )}
    </div>
  );
};

export default FieldVisitCard;
