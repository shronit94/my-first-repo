/**
 * Error Boundary component to catch React errors
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackEvent, Events } from '../utils/analytics';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Track error in analytics
    trackEvent('app_error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Reload the page to reset app state
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-rose-50 to-indigo-50">
          <div className="max-w-lg w-full glass p-10 rounded-[3rem] shadow-2xl space-y-8 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">⚠️</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-rose-950">
                Something went wrong
              </h2>
              <p className="text-rose-700/70 leading-relaxed">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-rose-50 p-4 rounded-xl border border-rose-100">
                <summary className="cursor-pointer font-semibold text-rose-800 mb-2">
                  Error Details (dev mode)
                </summary>
                <pre className="text-xs text-rose-700 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-4 bg-rose-500 text-white rounded-full font-bold text-lg hover:bg-rose-600 shadow-xl shadow-rose-200 transition-all active:scale-95"
              aria-label="Restart application"
            >
              Restart App
            </button>

            <p className="text-sm text-rose-500/70">
              If this problem persists, try clearing your browser cache.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
