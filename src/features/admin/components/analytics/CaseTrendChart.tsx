import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CaseTrend } from '../../../../types/analytics';
import { TrendingUp, Table, BarChart2 } from 'lucide-react';

interface CaseTrendChartProps {
  trends: CaseTrend[];
}

export const CaseTrendChart: React.FC<CaseTrendChartProps> = ({ trends }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div
      aria-label="Case Submission & Resolution Trajectory"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Case Intake &amp; Resolution Trajectory</h3>
            <p className="text-xs text-neutral-500">Weekly intake vs completed advisories vs escalations</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-semibold text-neutral-600 hover:text-primary flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          aria-label="Toggle accessible data table view"
        >
          {showTable ? <BarChart2 className="w-3.5 h-3.5" /> : <Table className="w-3.5 h-3.5" />}
          <span>{showTable ? 'View Chart' : 'View Data Table'}</span>
        </button>
      </div>

      {!showTable ? (
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorEscalated" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="totalCases"
                name="Total Submissions"
                stroke="#4F46E5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
              <Area
                type="monotone"
                dataKey="resolvedCases"
                name="Resolved Advisories"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorResolved)"
              />
              <Area
                type="monotone"
                dataKey="escalatedCases"
                name="Escalated Incidents"
                stroke="#EF4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEscalated)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Accessible Table Fallback */
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Timeline Interval</th>
                <th className="py-2.5 px-3 text-right">Total Cases</th>
                <th className="py-2.5 px-3 text-right">Resolved</th>
                <th className="py-2.5 px-3 text-right">Escalated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {trends.map((t) => (
                <tr key={t.period} className="hover:bg-neutral-50">
                  <td className="py-2 px-3 font-sans font-medium text-neutral-800">{t.period}</td>
                  <td className="py-2 px-3 text-right text-indigo-700 font-bold">{t.totalCases}</td>
                  <td className="py-2 px-3 text-right text-emerald-700">{t.resolvedCases}</td>
                  <td className="py-2 px-3 text-right text-rose-700">{t.escalatedCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CaseTrendChart;
