import React from 'react';
import { useAuth } from '../../auth';
import { ShieldCheck, MapPin, Calendar, Clock, Award } from 'lucide-react';

export const OfficerWelcome: React.FC = () => {
  const { user } = useAuth();

  const [greeting] = React.useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  const officerName = user?.name || 'Dr. Priya Sharma';
  const district = user && 'district' in user && user.district ? user.district : 'Nashik & Varanasi';
  const state = user && 'state' in user && user.state ? user.state : 'Jurisdiction Command';

  return (
    <section
      aria-label="Officer Welcome and Jurisdiction"
      className="relative overflow-hidden rounded-md bg-[#1B5E20] text-white p-6 sm:p-7 shadow-neo-lg border-3 border-[#172117]"
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#E8F5E9] text-xs font-bold text-[#1B5E20] border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
              <Award className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
              <span>Officer Badge #DAO-8492</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#172117] bg-white px-2.5 py-1 rounded-[4px] font-bold border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
              <MapPin className="w-3 h-3 text-[#2E7D32]" aria-hidden="true" />
              <span>{district}, {state}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#0277BD] bg-[#E1F5FE] px-2.5 py-1 rounded-[4px] font-bold border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
              <ShieldCheck className="w-3 h-3 text-[#0288D1]" aria-hidden="true" />
              <span>Field Triage Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {greeting}, {officerName} 🔬
          </h1>

          <p className="text-sm text-[#C8E6C9] leading-relaxed font-sans max-w-xl font-medium">
            Welcome to the Agricultural Officer Command Deck. Inspect farmer-reported crop issues, review computer vision pathogen inferences, and issue verified agronomic advisories.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 text-xs text-white/80 bg-black/15 p-3 rounded-lg border border-white/10">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span>Active Agronomic Duty Schedule</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Operational Triage Shift</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficerWelcome;
