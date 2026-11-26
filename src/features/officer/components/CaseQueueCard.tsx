import React from 'react';
import { OfficerCase } from '../types/officerTypes';
import { Link } from 'react-router-dom';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  MapPin,
  Calendar,
  CalendarCheck,
} from 'lucide-react';
import Badge, { BadgeVariant } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

interface CaseQueueCardProps {
  cropCase: OfficerCase;
}

export const CaseQueueCard: React.FC<CaseQueueCardProps> = ({ cropCase: c }) => {
  const getStatusBadge = (status: string): { variant: BadgeVariant; label: string; icon: React.ReactNode } => {
    switch (status) {
      case 'resolved':
        return { variant: 'success', label: 'Resolved', icon: <CheckCircle2 className="w-3 h-3" /> };
      case 'escalated':
        return { variant: 'error', label: 'Escalated', icon: <AlertOctagon className="w-3 h-3" /> };
      case 'under_review':
        return { variant: 'info', label: 'Under Review', icon: <Clock className="w-3 h-3" /> };
      case 'analyzing':
        return { variant: 'info', label: 'AI Analyzing', icon: <Sparkles className="w-3 h-3" /> };
      case 'pending':
      default:
        return { variant: 'warning', label: 'Pending Triage', icon: <Clock className="w-3 h-3" /> };
    }
  };

  const getSeverityBadge = (sev?: string) => {
    switch (sev) {
      case 'high':
      case 'severe':
      case 'critical':
        return <Badge variant="error" size="sm">HIGH SEVERITY</Badge>;
      case 'moderate':
        return <Badge variant="warning" size="sm">MODERATE</Badge>;
      case 'low':
      case 'mild':
        return <Badge variant="success" size="sm">LOW</Badge>;
      default:
        return null;
    }
  };

  const badge = getStatusBadge(c.status);
  const sev = c.severity || c.aiAnalysis?.severity;
  const predLabel = c.aiAnalysis?.prediction?.label || c.prediction?.diseaseName;
  const predConf =
    c.aiAnalysis?.prediction?.confidence ??
    (c.prediction ? (c.prediction.confidenceScore > 1 ? c.prediction.confidenceScore / 100 : c.prediction.confidenceScore) : null);

  return (
    <div className="p-4 sm:p-5 rounded-card bg-white border border-neutral-200 shadow-2xs hover:border-primary/50 transition-all space-y-3 group">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
            #{c.id}
          </span>
          <Badge variant={badge.variant} size="sm" className="gap-1 font-semibold text-xs">
            {badge.icon}
            <span>{badge.label}</span>
          </Badge>
          {c.fieldVisit?.required && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              <CalendarCheck className="w-3 h-3" />
              <span>Visit Scheduled</span>
            </span>
          )}
        </div>

        {getSeverityBadge(sev)}
      </div>

      <div>
        <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">
          {c.cropName} — {c.farmerName || 'Farmer Submission'}
        </h3>
        <p className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>{c.village || 'Village'}, {c.district || 'District'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-sans">
            <Calendar className="w-3 h-3 text-neutral-400" />
            <span>{new Date(c.reportedAt).toLocaleDateString()}</span>
          </span>
        </p>
      </div>

      {predLabel && (
        <div className="p-2.5 rounded bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold truncate">AI: {predLabel}</span>
          </div>
          {predConf != null && (
            <span className="font-bold text-emerald-700 shrink-0">
              {Math.round(predConf * 100)}% Match
            </span>
          )}
        </div>
      )}

      {c.description && (
        <p className="text-xs text-neutral-600 line-clamp-2 font-sans leading-relaxed">
          {c.description}
        </p>
      )}

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-end">
        <Link to={`/officer/cases/${encodeURIComponent(c.id)}`} className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto gap-1 text-xs py-1.5 px-3 min-h-[40px] group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-semibold"
          >
            <span>Review &amp; Assess Case</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CaseQueueCard;
