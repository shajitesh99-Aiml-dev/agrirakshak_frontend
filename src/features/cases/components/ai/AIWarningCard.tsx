import React from 'react';
import { AlertTriangle, ShieldAlert, Info, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routeConfig';
import { useI18n } from '../../../../i18n';

interface AIWarningCardProps {
  warnings?: string[];
  requiresOfficerEscalation?: boolean;
  escalationReason?: string;
  isMock?: boolean;
  className?: string;
}

export const AIWarningCard: React.FC<AIWarningCardProps> = ({
  warnings,
  requiresOfficerEscalation,
  escalationReason,
  isMock,
  className = '',
}) => {
  const { t } = useI18n();

  return (
    <div className={`space-y-3.5 ${className}`}>
      {/* Officer Escalation Banner */}
      {requiresOfficerEscalation && (
        <div
          role="region"
          aria-label={t('ai.officerReviewNotice')}
          className="p-4 rounded-card bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-sm text-amber-950">
                {t('ai.officerReviewNotice')}
              </p>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                {escalationReason || t('ai.advisoryDisclaimer')}
              </p>
            </div>
          </div>
          <Link
            to={ROUTES.FARMER_CASES}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-amber-700 text-white font-medium text-xs hover:bg-amber-800 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('nav.myCases')}</span>
          </Link>
        </div>
      )}

      {/* Specific AI Field Warnings */}
      {warnings && warnings.length > 0 && (
        <div className="p-4 rounded-card bg-orange-50/70 border border-orange-200 text-orange-950">
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" aria-hidden="true" />
            <span>{t('ai.advisoryNoticeTitle')}</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-orange-900">
            {warnings.map((w, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" aria-hidden="true" />
                <span className="leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mandatory Advisory Disclaimer */}
      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/90 text-neutral-600 flex items-start gap-2 text-xs">
        <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong className="text-neutral-700 font-semibold">{t('ai.advisoryNoticeTitle')}: </strong>
          {t('ai.advisoryDisclaimer')}
        </p>
      </div>

      {/* Simulated Dev Flag */}
      {isMock && (
        <div
          role="status"
          className="p-2.5 bg-neutral-100 rounded-lg border border-dashed border-neutral-300 text-neutral-600 text-center text-xs"
        >
          <span>{t('ai.devNotice')}</span>
        </div>
      )}
    </div>
  );
};

export default AIWarningCard;
