import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DistrictStatistic } from '../../../../types/analytics';
import { MapPin, Table, BarChart2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routeConfig';

interface DistrictDistributionChartProps {
  districtStats: DistrictStatistic[];
}

export const DistrictDistributionChart: React.FC<DistrictDistributionChartProps> = ({
  districtStats,
}) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div
      aria-label="District Epidemiological Aggregation"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">District Incident Distribution</h3>
            <p className="text-xs text-neutral-500">Active vs Escalated cluster cases by administrative district</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="text-xs font-semibold text-neutral-600 hover:text-primary flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          aria-label="Toggle district data table view"
        >
          {showTable ? <BarChart2 className="w-3.5 h-3.5" /> : <Table className="w-3.5 h-3.5" />}
          <span>{showTable ? 'View Chart' : 'View Data Table'}</span>
        </button>
      </div>

      {!showTable ? (
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={districtStats}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis
                dataKey="district"
                type="category"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                width={70}
              />
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
              <Bar dataKey="activeCases" name="Active Cases" fill="#0D9488" radius={[0, 4, 4, 0]} />
              <Bar dataKey="escalatedCases" name="Escalated Cases" fill="#E11D48" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">District &amp; State</th>
                <th className="py-2.5 px-3 text-right">Total Cases</th>
                <th className="py-2.5 px-3 text-right">Active</th>
                <th className="py-2.5 px-3 text-right">Escalated</th>
                <th className="py-2.5 px-3">Leading Threat</th>
                <th className="py-2.5 px-3">Affected Crops</th>
                <th className="py-2.5 px-3 text-center">Trend</th>
                <th className="py-2.5 px-3 text-right">Drill-Down</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans">
              {districtStats.map((d) => (
                <tr key={d.district} className="hover:bg-neutral-50">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-neutral-900">{d.district}</div>
                    <div className="text-[11px] text-neutral-400">{d.state}</div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-neutral-800">
                    {d.totalCases}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-teal-700 font-semibold">
                    {d.activeCases}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-rose-700 font-bold">
                    {d.escalatedCases}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-neutral-800">{d.topIssue}</td>
                  <td className="py-2.5 px-3 text-neutral-600">{d.affectedCrops.join(', ')}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                        d.trend === 'increasing'
                          ? 'bg-rose-100 text-rose-800'
                          : d.trend === 'decreasing'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {d.trend}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      to={`${ROUTES.ADMIN_CASES}?district=${encodeURIComponent(d.district)}`}
                      className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                    >
                      <span>Cases</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
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

export default DistrictDistributionChart;
