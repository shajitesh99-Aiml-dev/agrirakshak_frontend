import React from 'react';
import Spinner from './Spinner';
import { Sprout } from 'lucide-react';

export interface PageLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading Agri Rakshak...',
  subMessage = 'Gathering agricultural data and crop records',
  fullScreen = false,
}) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 bg-background/90 backdrop-blur-sm'
    : 'w-full py-16';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-6 text-center select-none ${containerClass}`}
    >
      <div className="relative mb-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center text-primary shadow-soft">
          <Sprout className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <div className="absolute -inset-1">
          <Spinner size="lg" color="primary" label="" className="w-full h-full opacity-60" />
        </div>
      </div>

      <h3 className="font-serif text-lg sm:text-xl font-bold text-dark-green mb-1">
        {message}
      </h3>
      {subMessage && (
        <p className="font-serif text-xs sm:text-sm text-text-muted max-w-sm">
          {subMessage}
        </p>
      )}
    </div>
  );
};

export default PageLoader;
