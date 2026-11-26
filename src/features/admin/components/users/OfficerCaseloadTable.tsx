import React from 'react';
import { OfficerCaseloadMetric } from '../../../../types/analytics';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface OfficerCaseloadTableProps {
  officers: OfficerCaseloadMetric[];
}

export const OfficerCaseloadTable: React.FC<OfficerCaseloadTableProps> = ({ officers }) => {
  return (
    <div className="bg-white rounded-card border border-neutral-200 shadow-2xs overflow-hidden space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Agricultural Officer Deployment &amp; Caseload</h3>
            <p className="text-xs text-neutral-500">Jurisdiction triage efficiency and pending review queues</p>
          </div>
        </div>
        <span className="text-xs text-neutral-500 font-mono">
          {officers.length} Active Field Officers
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-150">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Officer Name</th>
              <th className="py-2.5 px-3">Assigned District</th>
              <th className="py-2.5 px-3">Contact Channels</th>
              <th className="py-2.5 px-3 text-right">Assigned Cases</th>
              <th className="py-2.5 px-3 text-right">Pending Review</th>
              <th className="py-2.5 px-3 text-right">Resolved</th>
              <th className="py-2.5 px-3 text-right">Last Duty Sync</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-sans">
            {officers.map((o) => (
              <tr key={o.id} className="hover:bg-neutral-50">
                <td className="py-3 px-3">
                  <div className="font-bold text-neutral-900">{o.name}</div>
                  <div className="text-[11px] text-neutral-400 font-mono">ID: {o.id}</div>
                </td>
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1 font-semibold text-neutral-800">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{o.district}, {o.state}</span>
                  </span>
                </td>
                <td className="py-3 px-3 space-y-0.5 font-mono text-[11px] text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-neutral-400" />
                    <span>{o.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-neutral-400" />
                    <span>{o.phone}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-neutral-800">
                  {o.assignedCases}
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-amber-700">
                  {o.pendingCases}
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">
                  {o.resolvedCases}
                </td>
                <td className="py-3 px-3 text-right text-neutral-400 font-sans">
                  <span className="flex items-center justify-end gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>{new Date(o.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerCaseloadTable;
