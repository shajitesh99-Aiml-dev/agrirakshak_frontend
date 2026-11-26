import React, { useState } from 'react';
import { CaseStatus } from '../types/officerTypes';
import Dialog from '../../../components/ui/Dialog';
import Button from '../../../components/ui/Button';
import { AlertTriangle, CheckCircle2, AlertOctagon, Clock } from 'lucide-react';

interface StatusChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  targetStatus: CaseStatus;
  caseId: string;
  onConfirm: (status: CaseStatus, note?: string) => Promise<void>;
  isUpdating: boolean;
}

export const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({
  isOpen,
  onClose,
  targetStatus,
  caseId,
  onConfirm,
  isUpdating,
}) => {
  const [note, setNote] = useState('');

  const getDialogConfig = (status: CaseStatus) => {
    switch (status) {
      case 'resolved':
        return {
          title: 'Mark Case as Resolved',
          description: `Are you sure you want to resolve Case #${caseId}? This indicates that a complete agronomist advisory has been provided and verified.`,
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          confirmText: 'Confirm & Mark Resolved',
          variant: 'primary' as const,
        };
      case 'escalated':
        return {
          title: 'Escalate Case to District Agronomist',
          description: `Are you sure you want to escalate Case #${caseId}? This will place the case into the high-priority epidemic triage channel for district specialists.`,
          icon: <AlertOctagon className="w-6 h-6 text-red-600" />,
          confirmText: 'Confirm Escalation',
          variant: 'primary' as const,
        };
      case 'under_review':
        return {
          title: 'Transition Case to Under Review',
          description: `Begin formal triage review for Case #${caseId}. Other officers will see that this case is currently being assessed.`,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          confirmText: 'Start Review',
          variant: 'primary' as const,
        };
      default:
        return {
          title: `Update Status to ${status}`,
          description: `Are you sure you want to change the status of Case #${caseId} to ${status}?`,
          icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
          confirmText: 'Update Status',
          variant: 'primary' as const,
        };
    }
  };

  const config = getDialogConfig(targetStatus);

  const handleConfirm = async () => {
    await onConfirm(targetStatus, note || undefined);
    setNote('');
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      size="md"
    >
      <div className="space-y-4 pt-1">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
          <div className="shrink-0 mt-0.5">{config.icon}</div>
          <p className="text-sm text-neutral-700 leading-relaxed font-sans">
            {config.description}
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="status-note" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
            Optional Status Note or Reason
          </label>
          <textarea
            id="status-note"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Record brief reason for this status change..."
            className="w-full p-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={config.variant}
            size="md"
            onClick={handleConfirm}
            isLoading={isUpdating}
            disabled={isUpdating}
            className="gap-1.5 min-h-[44px]"
          >
            {config.confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default StatusChangeDialog;
