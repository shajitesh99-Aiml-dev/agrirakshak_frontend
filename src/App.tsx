import React from 'react';
import RouteErrorBoundary from './routes/RouteErrorBoundary';
import AppRoutes from './routes';
import { AuthProvider, useAuth } from './features/auth';
import { I18nProvider } from './i18n';

const AuthenticatedI18nBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userLang = user && 'preferred_language' in user ? (user.preferred_language as string) : undefined;
  return <I18nProvider userPreferredLanguage={userLang}>{children}</I18nProvider>;
};

export const App: React.FC = () => {
  return (
    <RouteErrorBoundary>
      <AuthProvider>
        <AuthenticatedI18nBridge>
          <AppRoutes />
        </AuthenticatedI18nBridge>
      </AuthProvider>
    </RouteErrorBoundary>
  );
};

export default App;
