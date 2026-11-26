import React, { useRef, useId } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onClear?: () => void;
  isLoading?: boolean;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label = 'Search',
      placeholder = 'Search crop cases, farmers, or diseases...',
      value,
      onChange,
      onClear,
      isLoading = false,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLInputElement | null>;

    const hasValue = value !== undefined ? Boolean(value) : false;

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
      if (resolvedRef.current) {
        resolvedRef.current.value = '';
        resolvedRef.current.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && hasValue) {
        handleClear();
      }
    };

    return (
      <div className={`w-full font-serif ${className}`}>
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>

        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>

          <input
            ref={ref}
            id={inputId}
            type="search"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full min-h-[44px] font-serif text-base text-text bg-white rounded-md border-2 border-[#172117] shadow-[2px_2px_0px_#172117] pl-10 pr-10 py-2.5 transition-all focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#172117] disabled:bg-[#F2F4F2] disabled:cursor-not-allowed"
            {...props}
          />

          <div className="absolute right-2.5 flex items-center">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" aria-hidden="true" />
            ) : hasValue ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="p-1 rounded-md border-2 border-[#172117] bg-white text-[#172117] shadow-[1px_1px_0px_#172117] hover:bg-[#E8F5E9] hover:translate-x-[1px] hover:translate-y-[1px] min-w-[28px] min-h-[28px] flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
