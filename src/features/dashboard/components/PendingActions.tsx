import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { PendingAction } from '../../../types/dashboard';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

interface PendingActionsProps {
  actions: PendingAction[];
}

export const PendingActions: React.FC<PendingActionsProps> = ({ actions }) => {
  const navigate = useNavigate();

  if (!actions || actions.length === 0) {
    return (
      <section aria-labelledby="pending-actions-heading" className="space-y-3">
        <h2 id="pending-actions-heading" className="text-lg sm:text-xl font-bold text-text-dark font-serif tracking-tight">
          Things You May Need to Do
        </h2>
        <Card padding="md" className="bg-[#F8FAF8] border-[#DFE8DF] flex items-center gap-3.5 py-4">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 text-primary">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-dark-green leading-snug">
              You're all caught up!
            </h3>
            <p className="font-serif text-xs sm:text-sm text-text-muted mt-0.5">
              No pending actions require your immediate attention right now.
            </p>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section aria-labelledby="pending-actions-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="pending-actions-heading" className="text-lg sm:text-xl font-black text-[#172117] font-serif tracking-tight">
          Things You May Need to Do
        </h2>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-[4px] bg-[#FFF3E0] text-[#8D5B00] border-2 border-[#172117] shadow-[1px_1px_0px_#172117]">
          {actions.length} action{actions.length > 1 ? 's' : ''} needed
        </span>
      </div>

      <div className="space-y-3">
        {actions.map((item) => (
          <Card
            key={item.id}
            padding="md"
            className="border-2 border-[#172117] border-l-[6px] border-l-[#2E7D32] bg-white shadow-neo rounded-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={item.priority === 'urgent' ? 'error' : 'warning'}
                    size="sm"
                    icon={<AlertCircle className="w-3 h-3" />}
                  >
                    {item.priority === 'urgent' ? 'Action Required' : 'Notice'}
                  </Badge>
                  <h3 className="font-serif text-base font-bold text-text-dark">
                    {item.title}
                  </h3>
                </div>

                <p className="font-serif text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => navigate(item.actionUrl)}
                  className="w-full sm:w-auto font-semibold"
                >
                  {item.actionLabel}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PendingActions;
