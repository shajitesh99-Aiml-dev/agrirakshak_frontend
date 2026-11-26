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
import { CropImpactStatistic } from '../../../../types/analytics';
import { Sprout, Table, BarChart2 } from 'lucide-react';

interface CropImpactChartProps {
  cropImpacts: CropImpactStatistic[];
}

const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

export const CropImpactChart: React.FC<CropImpactChartProps> = ({ cropImpacts }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div
      aria-label="Crop Impact Vulnerability Analysis"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Crop Impact Analysis</h3>
            <p className="text-xs text-neutral-500">Most affected commodities and primary pathogen vectors</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-semibold text-neutral-600 hover:text-primary flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          aria-label="Toggle crop impact data table view"
        >
          {showTable ? <BarChart2 className="w-3.5 h-3.5" /> : <Table className="w-3.5 h-3.5" />}
          <span>{showTable ? 'View Chart' : 'View Data Table'}</span>
        </button>
      </div>

      {!showTable ? (
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cropImpacts} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="cropName" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
                formatter={(val) => [`${val} Cases`, 'Reported Volume']}
              />
              <Bar dataKey="caseCount" name="Impacted Cases" radius={[4, 4, 0, 0]}>
                {cropImpacts.map((_entry, index) => (
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
                <th className="py-2.5 px-3">Crop Commodity</th>
                <th className="py-2.5 px-3 text-right">Case Volume</th>
                <th className="py-2.5 px-3 text-right">Volume Share</th>
                <th className="py-2.5 px-3">Leading Threat Vector</th>
                <th className="py-2.5 px-3 text-center">Severity Breakdown (M / Mod / S)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {cropImpacts.map((c) => (
                <tr key={c.cropName} className="hover:bg-neutral-50">
                  <td className="py-2.5 px-3 font-semibold text-neutral-900">{c.cropName}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                    {c.caseCount}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-neutral-600">{c.percentage}%</td>
                  <td className="py-2.5 px-3 text-neutral-800 font-medium">{c.topThreat}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-[11px] text-neutral-600">
                    <span className="text-emerald-700">{c.severityDistribution.mild}</span> /{' '}
                    <span className="text-amber-700">{c.severityDistribution.moderate}</span> /{' '}
                    <span className="text-rose-700 font-bold">{c.severityDistribution.severe}</span>
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

export default CropImpactChart;
