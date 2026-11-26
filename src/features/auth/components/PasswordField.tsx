import React, { useState, useId } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label = 'Password',
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
    const [showPassword, setShowPassword] = useState(false);
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
            {required && (
              <span className="text-semantic-error ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted">
            <Lock className="w-4 h-4" aria-hidden="true" />
          </div>

          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={`w-full min-h-[44px] font-serif text-base text-[#172117] bg-white rounded-md border-2 transition-all duration-150 pl-10 pr-12 py-2.5 focus:outline-none disabled:bg-[#F2F4F2] disabled:text-[#496274] disabled:cursor-not-allowed shadow-[2px_2px_0px_#172117] focus:shadow-neo ${
              hasError
                ? 'border-[#D32F2F] text-[#D32F2F]'
                : 'border-[#172117]'
            } ${className}`}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-small transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-primary" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {hasError && (
          <p
            id={errorId}
            className="font-serif text-xs sm:text-sm text-semantic-error mt-1 flex items-center gap-1 font-medium"
          >
            {errorMessage}
          </p>
        )}

        {!hasError && helperText && (
          <p
            id={helperId}
            className="font-serif text-xs sm:text-sm text-text-muted mt-1"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
