import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      leadingIcon,
      trailingIcon,
      required = false,
      disabled = false,
      className = '',
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-serif text-sm font-semibold text-text mb-1.5"
          >
            {label}
            {required && <span className="text-semantic-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted">
              {leadingIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={`w-full min-h-[44px] font-serif text-base text-text bg-white rounded-md border-2 shadow-[2px_2px_0px_#172117] transition-all px-3.5 py-2.5 focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#172117] disabled:bg-[#F2F4F2] disabled:text-text-subtle disabled:cursor-not-allowed ${
              leadingIcon ? 'pl-10' : ''
            } ${trailingIcon || hasError ? 'pr-10' : ''} ${
              hasError
                ? 'border-semantic-error focus:border-semantic-error'
                : 'border-[#172117] focus:border-[#172117]'
            } ${className}`}
            {...props}
          />

          {trailingIcon && !hasError && (
            <div className="absolute right-3.5 flex items-center text-text-muted">
              {trailingIcon}
            </div>
          )}

          {hasError && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-semantic-error">
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
            </div>
          )}
        </div>

        {hasError && (
          <p id={errorId} className="font-serif text-xs sm:text-sm text-semantic-error mt-1 flex items-center gap-1 font-medium">
            {errorMessage}
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

Input.displayName = 'Input';

export default Input;
