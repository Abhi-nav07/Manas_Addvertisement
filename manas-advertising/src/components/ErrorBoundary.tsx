"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

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

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Keep full details in the console for developers; never surface
    // stack traces or component internals to real visitors.
    console.error("Unhandled application error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-primary)] px-6 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/15 blur-[130px]" />
          </div>
          <div className="relative z-10 max-w-md">
            <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">
              Something went wrong
            </h1>
            <p className="mt-4 text-white/60">
              We hit an unexpected error. Please refresh the page — if this
              keeps happening, get in touch and we&apos;ll take a look.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-primary)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
