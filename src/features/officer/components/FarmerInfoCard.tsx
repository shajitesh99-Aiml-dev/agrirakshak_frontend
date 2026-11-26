import React from 'react';
import { OfficerCase } from '../types/officerTypes';
import { User, Phone, MapPin, Trees } from 'lucide-react';

interface FarmerInfoCardProps {
  cropCase: OfficerCase;
}

export const FarmerInfoCard: React.FC<FarmerInfoCardProps> = ({ cropCase: c }) => {
  return (
    <div className="p-4 sm:p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3">
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-2.5">
        <User className="w-4 h-4 text-primary" aria-hidden="true" />
        <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
          Farmer Profile Information
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Name */}
        <div className="p-2.5 rounded bg-neutral-50 border border-neutral-150">
          <span className="text-neutral-500 block text-[11px]">Farmer Name</span>
          <span className="font-bold text-neutral-900 block mt-0.5 truncate">
            {c.farmerName || 'Kisan Mitra'}
          </span>
        </div>

        {/* Contact */}
        <div className="p-2.5 rounded bg-neutral-50 border border-neutral-150">
          <span className="text-neutral-500 block text-[11px] flex items-center gap-1">
            <Phone className="w-3 h-3 text-neutral-400" />
            <span>Contact Number</span>
          </span>
          <span className="font-bold text-neutral-900 block mt-0.5 truncate font-mono">
            {c.farmerPhone || 'Not available'}
          </span>
        </div>

        {/* Location */}
        <div className="p-2.5 rounded bg-neutral-50 border border-neutral-150">
          <span className="text-neutral-500 block text-[11px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>Village &amp; District</span>
          </span>
          <span className="font-bold text-neutral-900 block mt-0.5 truncate" title={`${c.village || 'Not available'}, ${c.district || ''}`}>
            {c.village || 'Not available'}{c.district ? `, ${c.district}` : ''}
          </span>
        </div>

        {/* Farm Size */}
        <div className="p-2.5 rounded bg-neutral-50 border border-neutral-150">
          <span className="text-neutral-500 block text-[11px] flex items-center gap-1">
            <Trees className="w-3 h-3 text-neutral-400" />
            <span>Holding Size</span>
          </span>
          <span className="font-bold text-neutral-900 block mt-0.5">
            {c.farmSizeAcres ? `${c.farmSizeAcres} Acres` : 'Not available'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FarmerInfoCard;
