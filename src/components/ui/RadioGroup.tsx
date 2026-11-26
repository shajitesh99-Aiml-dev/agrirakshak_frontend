import React, { useId } from 'react';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  defaultValue,
  onChange,
  errorMessage,
  helperText,
  disabled = false,
  required = false,
  direction = 'vertical',
  className = '',
}) => {
  const generatedId = useId();
  const groupId = `${name}-${generatedId}`;
  const errorId = `${groupId}-error`;
  const helperId = `${groupId}-helper`;

  const hasError = Boolean(errorMessage);

  return (
    <fieldset
      id={groupId}
      aria-invalid={hasError}
      aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
      className={`w-full border-none p-0 m-0 ${className}`}
    >
      {label && (
        <legend className="block font-serif text-sm font-semibold text-text mb-2">
          {label}
          {required && <span className="text-semantic-error ml-1" aria-hidden="true">*</span>}
        </legend>
      )}

      <div
        className={`flex ${
          direction === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2'
        }`}
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isOptionDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`inline-flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-1 px-1 rounded-medium hover:bg-[#F2F7F0] transition-colors ${
                isOptionDisabled ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <div className="relative flex items-center shrink-0 mt-0.5">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={value !== undefined ? value === option.value : undefined}
                  defaultChecked={defaultValue !== undefined ? defaultValue === option.value : undefined}
                  disabled={isOptionDisabled}
                  required={required}
                  onChange={(e) => {
                    if (onChange && e.target.checked) {
                      onChange(option.value);
                    }
                  }}
                  className="peer sr-only"
                />
                {/* Styled Radio Circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all bg-white shadow-[2px_2px_0px_#172117] ${
                    hasError
                      ? 'border-semantic-error'
                      : 'border-[#172117] peer-checked:border-[#172117]'
                  } peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-base text-text leading-tight">{option.label}</span>
                {option.description && (
                  <span className="font-serif text-xs sm:text-sm text-text-muted mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {hasError && (
        <p id={errorId} className="font-serif text-xs text-semantic-error mt-1 font-medium">
          {errorMessage}
        </p>
      )}

      {!hasError && helperText && (
        <p id={helperId} className="font-serif text-xs text-text-muted mt-1">
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

export default RadioGroup;
