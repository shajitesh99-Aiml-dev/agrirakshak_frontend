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
import { DiseaseStatistic } from '../../../../types/analytics';
import { Biohazard, Table, BarChart2 } from 'lucide-react';

interface DiseaseDistributionChartProps {
  diseaseStats: DiseaseStatistic[];
}

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

export const DiseaseDistributionChart: React.FC<DiseaseDistributionChartProps> = ({
  diseaseStats,
}) => {
  const [showTable, setShowTable] = useState(false);

  // Shorten names for x-axis labels
  const chartData = diseaseStats.map((d) => ({
    ...d,
    shortName: d.diseaseName.split('(')[0].trim(),
  }));

  return (
    <div
      aria-label="Pathogen & Disease Frequency Analysis"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <Biohazard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Crop Disease Distribution</h3>
            <p className="text-xs text-neutral-500">Prevalent fungal, viral, and bacterial pathogens</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-semibold text-neutral-600 hover:text-primary flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          aria-label="Toggle disease data table view"
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
                formatter={(val) => [`${val} Cases`, 'Prevalence Count']}
              />
              <Bar dataKey="caseCount" name="Identified Cases" radius={[4, 4, 0, 0]}>
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
                <th className="py-2.5 px-3">Pathogen &amp; Scientific Name</th>
                <th className="py-2.5 px-3 text-right">Cases</th>
                <th className="py-2.5 px-3 text-right">Share (%)</th>
                <th className="py-2.5 px-3">Affected Crops</th>
                <th className="py-2.5 px-3">Districts</th>
                <th className="py-2.5 px-3 text-right">Avg AI Conf.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {diseaseStats.map((d) => (
                <tr key={d.diseaseName} className="hover:bg-neutral-50">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-neutral-900">{d.diseaseName}</div>
                    {d.scientificName && (
                      <div className="italic text-[11px] text-neutral-400">{d.scientificName}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-700">
                    {d.caseCount}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-neutral-600">{d.percentage}%</td>
                  <td className="py-2.5 px-3 text-neutral-700">{d.affectedCrops.join(', ')}</td>
                  <td className="py-2.5 px-3 text-neutral-700">{d.affectedDistricts.join(', ')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-semibold">
                    {d.averageConfidence ? `${Math.round(d.averageConfidence * 100)}%` : 'N/A'}
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

export default DiseaseDistributionChart;
