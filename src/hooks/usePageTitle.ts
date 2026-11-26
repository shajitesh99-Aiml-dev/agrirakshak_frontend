import { useEffect } from 'react';

/**
 * Hook to set the document title dynamically on route mount.
 * Formats: 'Agri Rakshak | Page Name'
 */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

export default usePageTitle;
