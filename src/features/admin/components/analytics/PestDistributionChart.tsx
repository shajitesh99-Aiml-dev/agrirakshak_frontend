import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { PestStatistic } from '../../../../types/analytics';
import { Bug, Table, BarChart2 } from 'lucide-react';

interface PestDistributionChartProps {
  pestStats: PestStatistic[];
}

const COLORS = ['#D97706', '#F59E0B', '#FBBF24', '#FCD34D'];

export const PestDistributionChart: React.FC<PestDistributionChartProps> = ({ pestStats }) => {
  const [showTable, setShowTable] = useState(false);

  const chartData = pestStats.map((p) => ({
    ...p,
    shortName: p.pestName.split('(')[0].trim(),
  }));

  return (
    <div
      aria-label="Pest Population Surveillance Analysis"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Arthropod &amp; Insect Pest Pressure</h3>
            <p className="text-xs text-neutral-500">Major vector &amp; borer infestations across corridors</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-semibold text-neutral-600 hover:text-primary flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          aria-label="Toggle pest data table view"
        >
          {showTable ? <BarChart2 className="w-3.5 h-3.5" /> : <Table className="w-3.5 h-3.5" />}
          <span>{showTable ? 'View Chart' : 'View Data Table'}</span>
        </button>
      </div>

      {!showTable ? (
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="shortName"
                stroke="#64748B"
                fontSize={10}
                interval={0}
                angle={-15}
                textAnchor="end"
                tickLine={false}
              />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
                formatter={(val) => [`${val} Cases`, 'Reported Infestations']}
              />
              <Bar dataKey="caseCount" name="Reported Infestations" radius={[4, 4, 0, 0]}>
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Pest Species</th>
                <th className="py-2.5 px-3 text-right">Infestations</th>
                <th className="py-2.5 px-3 text-right">Share (%)</th>
                <th className="py-2.5 px-3">Target Crops</th>
                <th className="py-2.5 px-3">Focus Districts</th>
                <th className="py-2.5 px-3 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {pestStats.map((p) => (
                <tr key={p.pestName} className="hover:bg-neutral-50">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-neutral-900">{p.pestName}</div>
                    {p.scientificName && (
                      <div className="italic text-[11px] text-neutral-400">{p.scientificName}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">
                    {p.caseCount}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-neutral-600">{p.percentage}%</td>
                  <td className="py-2.5 px-3 text-neutral-700">{p.affectedCrops.join(', ')}</td>
                  <td className="py-2.5 px-3 text-neutral-700">{p.affectedDistricts.join(', ')}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                        p.trend === 'increasing'
                          ? 'bg-rose-100 text-rose-800'
                          : p.trend === 'decreasing'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {p.trend}
                    </span>
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

export default PestDistributionChart;
