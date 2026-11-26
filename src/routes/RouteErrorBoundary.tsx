import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorState from '../components/ui/ErrorState';
import Container from '../components/ui/Container';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class RouteErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Non-sensitive logging for development only
    if (import.meta.env.DEV) {
      console.error('[RouteErrorBoundary] Route error caught:', error.message, errorInfo.componentStack);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background py-16 flex items-center justify-center font-serif px-4">
          <Container size="md">
            <ErrorState
              title="Temporary Display Issue"
              message="We encountered an unexpected display difficulty rendering this agricultural page. Your records are safe."
              retryLabel="Reload Page"
              onRetry={this.handleRetry}
              secondaryAction={{
                label: 'Return to Homepage',
                onClick: () => {
                  window.location.href = '/';
                },
              }}
            />
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
