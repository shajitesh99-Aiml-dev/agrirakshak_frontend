import React from 'react';
import { OfficerCase } from '../types/officerTypes';
import { Link } from 'react-router-dom';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Eye,
  CalendarCheck,
} from 'lucide-react';
import Badge, { BadgeVariant } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

interface CaseQueueTableProps {
  cases: OfficerCase[];
}

export const CaseQueueTable: React.FC<CaseQueueTableProps> = ({ cases }) => {
  const getStatusBadge = (status: string): { variant: BadgeVariant; label: string; icon: React.ReactNode } => {
    switch (status) {
      case 'resolved':
        return {
          variant: 'success',
          label: 'Resolved',
          icon: <CheckCircle2 className="w-3 h-3" />,
        };
      case 'escalated':
        return {
          variant: 'error',
          label: 'Escalated',
          icon: <AlertOctagon className="w-3 h-3" />,
        };
      case 'under_review':
        return {
          variant: 'info',
          label: 'Under Review',
          icon: <Clock className="w-3 h-3" />,
        };
      case 'analyzing':
        return {
          variant: 'info',
          label: 'AI Analyzing',
          icon: <Sparkles className="w-3 h-3" />,
        };
      case 'pending':
      default:
        return {
          variant: 'warning',
          label: 'Pending Triage',
          icon: <Clock className="w-3 h-3" />,
        };
    }
  };

  const getSeverityBadge = (sev?: string) => {
    switch (sev) {
      case 'high':
      case 'severe':
      case 'critical':
        return <Badge variant="error" size="sm">HIGH</Badge>;
      case 'moderate':
        return <Badge variant="warning" size="sm">MODERATE</Badge>;
      case 'low':
      case 'mild':
        return <Badge variant="success" size="sm">LOW</Badge>;
      default:
        return <span className="text-neutral-400 text-xs font-mono">—</span>;
    }
  };

  return (
    <div className="overflow-x-auto rounded-card border border-neutral-200 bg-white shadow-2xs">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-neutral-50/90 border-b border-neutral-200 text-neutral-600 font-bold uppercase tracking-wider text-[11px]">
          <tr>
            <th scope="col" className="py-3.5 px-4">Case ID</th>
            <th scope="col" className="py-3.5 px-4">Farmer &amp; Location</th>
            <th scope="col" className="py-3.5 px-4">Crop</th>
            <th scope="col" className="py-3.5 px-4">Severity</th>
            <th scope="col" className="py-3.5 px-4">Status</th>
            <th scope="col" className="py-3.5 px-4">AI Prediction</th>
            <th scope="col" className="py-3.5 px-4">Date</th>
            <th scope="col" className="py-3.5 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-150">
          {cases.map((c) => {
            const badge = getStatusBadge(c.status);
            const sev = c.severity || c.aiAnalysis?.severity;
            const predLabel = c.aiAnalysis?.prediction?.label || c.prediction?.diseaseName;
            const predConf =
              c.aiAnalysis?.prediction?.confidence ??
              (c.prediction ? (c.prediction.confidenceScore > 1 ? c.prediction.confidenceScore / 100 : c.prediction.confidenceScore) : null);

            return (
              <tr
                key={c.id}
                className="hover:bg-neutral-50/70 transition-colors group"
              >
                {/* Case ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 whitespace-nowrap">
                  <Link
                    to={`/officer/cases/${encodeURIComponent(c.id)}`}
                    className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    #{c.id}
                  </Link>
                  {c.fieldVisit?.required && (
                    <span
                      title="Field visit scheduled"
                      className="ml-1.5 inline-flex text-indigo-600"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 inline" />
                    </span>
                  )}
                </td>

                {/* Farmer & Location */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-neutral-900 truncate max-w-[140px]">
                    {c.farmerName || 'Farmer'}
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate max-w-[140px]">
                    {c.village || 'Village'}, {c.district || 'District'}
                  </div>
                </td>

                {/* Crop */}
                <td className="py-3.5 px-4 font-medium text-neutral-800 whitespace-nowrap">
                  {c.cropName}
                </td>

                {/* Severity */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {getSeverityBadge(sev)}
                </td>

                {/* Case Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <Badge variant={badge.variant} size="sm" className="gap-1 font-semibold text-xs">
                    {badge.icon}
                    <span>{badge.label}</span>
                  </Badge>
                </td>

                {/* AI Prediction */}
                <td className="py-3.5 px-4 max-w-[180px]">
                  {predLabel ? (
                    <div className="space-y-0.5">
                      <span className="font-semibold text-neutral-800 block truncate" title={predLabel}>
                        {predLabel}
                      </span>
                      {predConf != null && (
                        <span className="text-[11px] text-primary block">
                          {Math.round(predConf * 100)}% match
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-neutral-400 italic">Pending analysis</span>
                  )}
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap font-sans">
                  {new Date(c.reportedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </td>

                {/* Action CTA */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <Link to={`/officer/cases/${encodeURIComponent(c.id)}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs py-1 px-2.5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all min-h-[34px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CaseQueueTable;
