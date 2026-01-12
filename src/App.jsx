import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { SearchProvider } from './context/SearchContext';
import ErrorBoundary from './components/layout/ErrorBoundary';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PageTitle from './components/layout/PageTitle';
import LoadingScreen from './components/ui/LoadingScreen';
import CommandPalette from './components/ui/CommandPalette';
import './styles.css';

// Lazy Loaded Pages
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Orders = lazy(() => import('./pages/Orders'));
const Products = lazy(() => import('./pages/Products'));
const Customers = lazy(() => import('./pages/Customers'));
const Settings = lazy(() => import('./pages/Settings'));

const AppContent = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};



const App = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <ToastProvider>
                    <SearchProvider>
                        <DataProvider>
                            <AuthProvider>
                                <PageTitle />
                                <CommandPalette />
                                <AppContent />
                            </AuthProvider>
                        </DataProvider>
                    </SearchProvider>
                </ToastProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
