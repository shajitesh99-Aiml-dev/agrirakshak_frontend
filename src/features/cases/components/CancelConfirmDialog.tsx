import React from 'react';
import { AlertCircle } from 'lucide-react';
import Dialog from '../../../components/ui/Dialog';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../i18n';

interface CancelConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLeave: () => void;
}

export const CancelConfirmDialog: React.FC<CancelConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirmLeave,
}) => {
  const { t } = useI18n();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={
        <div className="flex items-center gap-2 text-semantic-error">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{t('farmer.report.cancelConfirmTitle')}</span>
        </div>
      }
      description={t('farmer.report.cancelConfirmDesc')}
      footer={
        <div className="flex items-center justify-end gap-2 w-full">
          <Button variant="outline" size="sm" onClick={onClose}>
            {t('farmer.report.keepEditing')}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirmLeave}
          >
            {t('farmer.report.confirmDiscard')}
          </Button>
        </div>
      }
    >
      <p className="font-serif text-sm text-text-muted leading-relaxed">
        {t('farmer.report.cancelConfirmDesc')}
      </p>
    </Dialog>
  );
};

export default CancelConfirmDialog;
