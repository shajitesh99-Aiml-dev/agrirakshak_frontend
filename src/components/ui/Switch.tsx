import React, { useId } from 'react';

export interface SwitchProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  name,
  id,
  className = '',
}) => {
  const generatedId = useId();
  const switchId = id || generatedId;
  const descId = `${switchId}-desc`;

  // Support controlled or uncontrolled usage
  const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const nextVal = !isChecked;
    if (checked === undefined) {
      setInternalChecked(nextVal);
    }
    if (onChange) {
      onChange(nextVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`inline-flex items-start justify-between gap-4 py-1.5 min-h-[44px] ${className}`}>
      <div className="flex flex-col cursor-pointer select-none" onClick={handleToggle}>
        <span className="font-serif text-base text-text leading-tight">{label}</span>
        {description && (
          <span id={descId} className="font-serif text-xs sm:text-sm text-text-muted mt-0.5">
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        id={switchId}
        name={name}
        aria-checked={isChecked}
        aria-describedby={description ? descId : undefined}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-[#172117] shadow-neo-sm transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isChecked ? 'bg-primary' : 'bg-white'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full border-2 border-[#172117] bg-white transition duration-150 ease-in-out mt-0.5 ${
            isChecked ? 'translate-x-6 bg-[#C8E6C9]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
