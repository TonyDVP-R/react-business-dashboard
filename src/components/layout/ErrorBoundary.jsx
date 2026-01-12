import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', background: 'var(--bg-app)', color: 'var(--text-primary)', minHeight: '100vh' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Something went wrong.</h1>
                    <div style={{ padding: '20px', background: 'var(--bg-panel)', borderRadius: '8px', border: '1px solid var(--danger)' }}>
                        <h3 style={{ color: 'var(--danger)' }}>{this.state.error && this.state.error.toString()}</h3>
                        <pre style={{ marginTop: '16px', overflow: 'auto', maxHeight: '400px', fontSize: '0.85rem' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{ marginTop: '24px', padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Clear Cache & Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
