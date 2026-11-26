import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SeverityStatistic } from '../../../../types/analytics';
import { AlertCircle, Table, BarChart2 } from 'lucide-react';

interface SeverityDistributionChartProps {
  severityDistribution: SeverityStatistic[];
}

const SEVERITY_COLORS: Record<string, string> = {
  Mild: '#10B981',
  Moderate: '#F59E0B',
  Severe: '#F97316',
  Critical: '#EF4444',
  Unknown: '#94A3B8',
};

export const SeverityDistributionChart: React.FC<SeverityDistributionChartProps> = ({
  severityDistribution,
}) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div
      aria-label="Pathological Severity Breakdown"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Severity Distribution</h3>
            <p className="text-xs text-neutral-500">Damage classification across all reported fields</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-semibold text-neutral-600 hover:text-primary flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          aria-label="Toggle severity data table view"
        >
          {showTable ? <BarChart2 className="w-3.5 h-3.5" /> : <Table className="w-3.5 h-3.5" />}
          <span>{showTable ? 'View Chart' : 'View Data Table'}</span>
        </button>
      </div>

      {!showTable ? (
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityDistribution}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="count"
                nameKey="level"
              >
                {severityDistribution.map((entry) => (
                  <Cell
                    key={`cell-${entry.level}`}
                    fill={SEVERITY_COLORS[entry.level] || '#64748B'}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
                formatter={(val, name) => [`${val} Cases (${severityDistribution.find((s) => s.level === name)?.percentage || 0}%)`, `${name} Severity`]}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Severity Tier</th>
                <th className="py-2.5 px-3 text-right">Case Count</th>
                <th className="py-2.5 px-3 text-right">Percentage</th>
                <th className="py-2.5 px-3">Intervention Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans">
              {severityDistribution.map((s) => (
                <tr key={s.level} className="hover:bg-neutral-50">
                  <td className="py-2 px-3 font-semibold text-neutral-900 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: SEVERITY_COLORS[s.level] || '#64748B' }}
                    />
                    <span>{s.level}</span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-neutral-800">{s.count}</td>
                  <td className="py-2 px-3 text-right font-mono text-neutral-600">{s.percentage}%</td>
                  <td className="py-2 px-3 text-neutral-500 text-[11px]">
                    {s.level === 'Critical'
                      ? 'Immediate containment & officer dispatch'
                      : s.level === 'Severe'
                      ? 'Advisory review within 24 hours'
                      : s.level === 'Moderate'
                      ? 'Routine agronomic guidance'
                      : 'Self-monitoring & biological prevention'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeverityDistributionChart;
