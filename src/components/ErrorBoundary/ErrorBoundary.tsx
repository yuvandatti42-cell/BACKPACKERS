import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught application error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = 'hero';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FAF8F5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          color: '#1C1917'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>🧭</div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '0.02em',
            marginBottom: '0.75rem',
            color: '#1A1A18'
          }}>
            Something unexpected occurred
          </h2>
          <p style={{
            maxWidth: '480px',
            color: '#78716C',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem'
          }}>
            We've kept your session safe. Click below to refresh and resume exploring destinations.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              backgroundColor: '#F5BA24',
              color: '#1A1A18',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(245, 186, 36, 0.4)'
            }}
          >
            Reload Explorer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
