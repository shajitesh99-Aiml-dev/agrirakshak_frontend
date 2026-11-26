import React from 'react';
import Dialog from '../ui/Dialog';
import Button from '../ui/Button';
import { LogOut } from 'lucide-react';
import { useI18n } from '../../i18n';

interface ConfirmLogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmLogoutDialog: React.FC<ConfirmLogoutDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  const { t } = useI18n();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('dialogs.confirmLogoutTitle')}
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-3 w-full font-serif">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            {t('dialogs.cancelBtn')}
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            {t('dialogs.confirmLogoutBtn')}
          </Button>
        </div>
      }
    >
      <div className="py-2 space-y-3 font-serif">
        <p className="text-sm text-text-muted leading-relaxed">
          {t('dialogs.confirmLogoutDesc')}
        </p>
      </div>
    </Dialog>
  );
};

export default ConfirmLogoutDialog;
