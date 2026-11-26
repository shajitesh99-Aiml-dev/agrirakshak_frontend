import React from 'react';
import {
  Clock,
  Sparkles,
  CheckCircle,
  AlertOctagon,
  ShieldCheck,
  XCircle,
} from 'lucide-react';

export type StatusType =
  | 'pending'
  | 'under_review'
  | 'analyzing'
  | 'resolved'
  | 'escalated'
  | 'verified'
  | 'rejected';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  label?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showIcon = true,
  size = 'md',
  className = '',
  ...props
}) => {
  const statusConfig: Record<
    StatusType,
    { defaultLabel: string; bg: string; text: string; border: string; icon: React.ReactNode; dot: string }
  > = {
    pending: {
      defaultLabel: 'Pending Review',
      bg: 'bg-[#FFF8E1]',
      text: 'text-[#E65100]',
      border: 'border-[#172117]',
      icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
      dot: 'bg-semantic-warning',
    },
    under_review: {
      defaultLabel: 'Under Review',
      bg: 'bg-[#E1F5FE]',
      text: 'text-[#01579B]',
      border: 'border-[#172117]',
      icon: <Clock className="w-3.5 h-3.5 text-[#01579B]" aria-hidden="true" />,
      dot: 'bg-[#01579B]',
    },
    analyzing: {
      defaultLabel: 'AI Analyzing',
      bg: 'bg-[#E1F5FE]',
      text: 'text-[#01579B]',
      border: 'border-[#172117]',
      icon: <Sparkles className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />,
      dot: 'bg-semantic-info',
    },
    resolved: {
      defaultLabel: 'Resolved',
      bg: 'bg-[#C8E6C9]',
      text: 'text-[#1B5E20]',
      border: 'border-[#172117]',
      icon: <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />,
      dot: 'bg-semantic-success',
    },
    escalated: {
      defaultLabel: 'Escalated to Officer',
      bg: 'bg-[#FFF3E0]',
      text: 'text-[#D84315]',
      border: 'border-[#172117]',
      icon: <AlertOctagon className="w-3.5 h-3.5" aria-hidden="true" />,
      dot: 'bg-[#D84315]',
    },
    verified: {
      defaultLabel: 'Expert Verified',
      bg: 'bg-[#E8F5E9]',
      text: 'text-[#1B5E20]',
      border: 'border-[#172117]',
      icon: <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />,
      dot: 'bg-[#1B5E20]',
    },
    rejected: {
      defaultLabel: 'Rejected / Invalid',
      bg: 'bg-[#FFEBEE]',
      text: 'text-[#C62828]',
      border: 'border-[#172117]',
      icon: <XCircle className="w-3.5 h-3.5" aria-hidden="true" />,
      dot: 'bg-semantic-error',
    },
  };

  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-sm px-3 py-1 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-serif font-bold rounded-[4px] border-[1.5px] border-[#172117] shadow-[1.5px_1.5px_0px_#172117] select-none ${config.bg} ${config.text} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${config.dot}`} aria-hidden="true" />
      {showIcon && <span className="shrink-0">{config.icon}</span>}
      <span>{displayLabel}</span>
    </span>
  );
};

export default StatusIndicator;
