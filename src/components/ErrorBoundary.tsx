import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
            <p className="mb-4">We are sorry for the inconvenience.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
            <div className="mt-4">
                <button
                    onClick={() => {
                        localStorage.removeItem('sb-qjaqtjidwouyqjmnorub-auth-token'); // Clear Supabase auth
                        localStorage.clear(); // Clear other state
                        window.location.href = '/login';
                    }}
                    className="text-sm text-gray-400 hover:text-white underline"
                >
                    Return to Login
                </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
