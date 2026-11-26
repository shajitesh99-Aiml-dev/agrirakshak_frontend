import React, { useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      options,
      helperText,
      errorMessage,
      required = false,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block font-serif text-sm font-semibold text-text mb-1.5"
          >
            {label}
            {required && <span className="text-semantic-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className={`w-full min-h-[44px] font-serif text-base text-text bg-white rounded-md border-2 shadow-[2px_2px_0px_#172117] appearance-none transition-all pl-3.5 pr-10 py-2.5 focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#172117] disabled:bg-[#F2F4F2] disabled:text-text-subtle disabled:cursor-not-allowed ${
              hasError
                ? 'border-semantic-error focus:border-semantic-error'
                : 'border-[#172117] focus:border-[#172117]'
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-text-muted">
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {hasError && (
          <p id={errorId} className="font-serif text-xs sm:text-sm text-semantic-error mt-1 flex items-center gap-1 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </p>
        )}

        {!hasError && helperText && (
          <p id={helperId} className="font-serif text-xs sm:text-sm text-text-muted mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
