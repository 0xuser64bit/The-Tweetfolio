import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: globalThis.Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-x-primary text-x-text-primary px-6">
          <div className="w-full max-w-[420px] text-center">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 mx-auto mb-4 fill-x-text-primary"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <h1 className="text-[20px] font-extrabold mb-1">
              Something went wrong.
            </h1>
            <p className="text-[15px] text-x-text-secondary mb-5">
              An unexpected error occurred. Try reloading.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-x-text-primary text-x-primary rounded-full px-5 py-2 font-bold text-[14px] hover:opacity-90 transition-opacity"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
