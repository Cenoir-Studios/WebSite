import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#9a8e82' }}>
          <h2 style={{ color: '#f0ebe4', marginBottom: '1rem' }}>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.hash = '#/'; }}
            className="btn btn--ghost" style={{ marginTop: '1.5rem' }}>
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
