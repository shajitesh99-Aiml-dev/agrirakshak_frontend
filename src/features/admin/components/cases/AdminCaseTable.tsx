import React from 'react';
import { Link } from 'react-router-dom';
import { CropCase } from '../../../../types';
import Badge, { BadgeVariant } from '../../../../components/ui/Badge';
import {
  Clock,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  MapPin,
  Calendar,
  Eye,
  CalendarCheck,
} from 'lucide-react';

interface AdminCaseTableProps {
  cases: CropCase[];
}

export const AdminCaseTable: React.FC<AdminCaseTableProps> = ({ cases }) => {
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
        return { variant: 'warning', label: 'Pending Review', icon: <Clock className="w-3 h-3" /> };
    }
  };

  const getSeverityBadge = (sev?: string) => {
    switch (sev) {
      case 'critical':
      case 'high':
      case 'severe':
        return <Badge variant="error" size="sm" className="font-bold">HIGH</Badge>;
      case 'moderate':
        return <Badge variant="warning" size="sm">MODERATE</Badge>;
      case 'low':
      case 'mild':
        return <Badge variant="success" size="sm">LOW</Badge>;
      default:
        return <Badge variant="neutral" size="sm">NORMAL</Badge>;
    }
  };

  if (!cases || cases.length === 0) {
    return (
      <div className="p-8 rounded-card bg-white border border-neutral-200 text-center text-sm text-neutral-500">
        No agricultural cases match the current filter criteria.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card border border-neutral-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Case ID</th>
              <th className="py-3 px-4">Farmer</th>
              <th className="py-3 px-4">Crop</th>
              <th className="py-3 px-4">District / State</th>
              <th className="py-3 px-4">AI Prediction</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Governance Action</th>
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
                <tr key={c.id} className="hover:bg-neutral-50/70 transition-colors group">
                  {/* Case ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 whitespace-nowrap">
                    <Link
                      to={`/admin/cases/${encodeURIComponent(c.id)}`}
                      className="hover:text-primary transition-colors font-mono"
                    >
                      #{c.id}
                    </Link>
                    {c.fieldVisit?.required && (
                      <span title="Field inspection logged" className="ml-1.5 inline-flex text-indigo-600">
                        <CalendarCheck className="w-3.5 h-3.5 inline" />
                      </span>
                    )}
                  </td>

                  {/* Farmer */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-neutral-900 truncate max-w-[130px]">
                      {c.farmerName || 'Farmer Submission'}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      {c.farmerPhone || ''}
                    </div>
                  </td>

                  {/* Crop */}
                  <td className="py-3.5 px-4 font-semibold text-neutral-800 whitespace-nowrap">
                    {c.cropName}
                  </td>

                  {/* District */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-medium text-neutral-800 truncate max-w-[130px]">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{c.district || 'District'}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate max-w-[130px]">
                      {c.village || 'Village'}, {c.state || ''}
                    </div>
                  </td>

                  {/* AI Prediction */}
                  <td className="py-3.5 px-4 max-w-[160px]">
                    {predLabel ? (
                      <div className="space-y-0.5">
                        <span className="font-semibold text-neutral-800 block truncate" title={predLabel}>
                          {predLabel}
                        </span>
                        {predConf != null && (
                          <span className="text-[11px] text-emerald-700 font-semibold block">
                            {Math.round(predConf * 100)}% match
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-neutral-400 italic">Pending analysis</span>
                    )}
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getSeverityBadge(sev)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={badge.variant} size="sm" className="gap-1 font-semibold text-xs">
                      {badge.icon}
                      <span>{badge.label}</span>
                    </Badge>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      <span>{new Date(c.reportedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/cases/${encodeURIComponent(c.id)}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold transition-colors text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCaseTable;
