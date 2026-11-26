import React, { useState } from 'react';
import { FieldVisit } from '../types/officerTypes';
import Dialog from '../../../components/ui/Dialog';
import Button from '../../../components/ui/Button';
import { CalendarCheck } from 'lucide-react';

interface FieldVisitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialVisit?: FieldVisit;
  defaultLocation?: string;
  onSave: (visit: FieldVisit) => void;
}

export const FieldVisitDialog: React.FC<FieldVisitDialogProps> = ({
  isOpen,
  onClose,
  initialVisit,
  defaultLocation = '',
  onSave,
}) => {
  const [scheduledDate, setScheduledDate] = useState(initialVisit?.scheduledDate || '');
  const [preferredTime, setPreferredTime] = useState(initialVisit?.preferredTime || '10:00 AM');
  const [location, setLocation] = useState(initialVisit?.location || defaultLocation);
  const [officerNotes, setOfficerNotes] = useState(
    initialVisit?.officerNotes || 'Inspect affected foliage and collect leaf spore scrape sample.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedDate = scheduledDate || new Date().toISOString().split('T')[0];
    onSave({
      required: true,
      scheduledDate: resolvedDate,
      preferredTime,
      location,
      officerNotes,
      status: 'scheduled',
    });
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule On-Site Farm Inspection"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-900">
          <CalendarCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Designating a field inspection dispatches an SMS reminder to the farmer and logs this case into your block jurisdiction itinerary.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label htmlFor="visit-date" className="font-bold text-neutral-700 block">
              Inspection Date *
            </label>
            <input
              id="visit-date"
              type="date"
              required
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="visit-time" className="font-bold text-neutral-700 block">
              Preferred Time Slot *
            </label>
            <input
              id="visit-time"
              type="text"
              required
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="E.g. 10:30 AM or Morning Hours"
              className="w-full p-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label htmlFor="visit-location" className="font-bold text-neutral-700 block">
            Plot / Farm Location *
          </label>
          <input
            id="visit-location"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="E.g. Plot 4B, North Field, Village Rampur"
            className="w-full p-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-1 text-xs">
          <label htmlFor="visit-notes" className="font-bold text-neutral-700 block">
            Field Inspection Objectives &amp; Preparation
          </label>
          <textarea
            id="visit-notes"
            rows={2}
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            placeholder="Notes on equipment to bring (spore kit, pH meter, sticky traps)..."
            className="w-full p-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" className="gap-1.5 min-h-[44px]">
            <CalendarCheck className="w-4 h-4" />
            <span>Confirm Visit Schedule</span>
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default FieldVisitDialog;
