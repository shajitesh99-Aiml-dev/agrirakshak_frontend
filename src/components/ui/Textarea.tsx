import React, { useId, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      required = false,
      disabled = false,
      showCount = false,
      maxLength,
      className = '',
      id,
      rows = 4,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    // Manage internal char count for uncontrolled or controlled usage
    const initialLength =
      typeof value === 'string'
        ? value.length
        : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0;
    const [charCount, setCharCount] = useState<number>(initialLength);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-serif text-sm font-semibold text-text mb-1.5"
          >
            {label}
            {required && <span className="text-semantic-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className={`w-full font-serif text-base text-text bg-white rounded-md border-2 shadow-[2px_2px_0px_#172117] transition-all px-3.5 py-2.5 focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#172117] disabled:bg-[#F2F4F2] disabled:text-text-subtle disabled:cursor-not-allowed resize-y ${
              hasError
                ? 'border-semantic-error focus:border-semantic-error'
                : 'border-[#172117] focus:border-[#172117]'
            } ${className}`}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between mt-1 text-xs sm:text-sm">
          <div>
            {hasError && (
              <p id={errorId} className="font-serif text-semantic-error flex items-center gap-1 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </p>
            )}
            {!hasError && helperText && (
              <p id={helperId} className="font-serif text-text-muted">
                {helperText}
              </p>
            )}
          </div>

          {showCount && (
            <span className="font-serif text-text-muted shrink-0 ml-2">
              {charCount}
              {maxLength ? ` / ${maxLength}` : ' characters'}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
