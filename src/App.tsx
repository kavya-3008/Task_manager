import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProjectBoard from './pages/ProjectBoard';
import ProtectedRoute from './components/ProtectedRoute';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h1>
            <p className="text-red-600 mb-4">The app encountered an error while loading.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Reload Page
            </button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-red-600">Error Details</summary>
                <pre className="mt-2 text-xs text-red-500 bg-red-100 p-2 rounded">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component is rendering');
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/project/:id" element={
                  <ProtectedRoute>
                    <ProjectBoard />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;