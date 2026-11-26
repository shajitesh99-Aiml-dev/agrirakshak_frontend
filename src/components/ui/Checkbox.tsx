import React, { useId } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, errorMessage, disabled = false, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const descId = `${checkboxId}-desc`;
    const errorId = `${checkboxId}-error`;

    const hasError = Boolean(errorMessage);

    return (
      <div className={`flex flex-col ${className}`}>
        <label
          htmlFor={checkboxId}
          className={`inline-flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1 ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          <div className="relative flex items-center shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              aria-invalid={hasError ? 'true' : 'false'}
              aria-describedby={
                hasError ? errorId : description ? descId : undefined
              }
              className="peer sr-only"
              {...props}
            />
            {/* Custom box styled with Neo-Brutalist 2px dark border and offset shadow */}
            <div
              className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-all bg-white shadow-[2px_2px_0px_#172117] ${
                hasError
                  ? 'border-semantic-error'
                  : 'border-[#172117] peer-checked:bg-primary'
              } peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2`}
            >
              <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-base text-text leading-tight">{label}</span>
            {description && (
              <span id={descId} className="font-serif text-xs sm:text-sm text-text-muted mt-0.5">
                {description}
              </span>
            )}
          </div>
        </label>

        {hasError && (
          <p id={errorId} className="font-serif text-xs text-semantic-error mt-1 pl-8 font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
