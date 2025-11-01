
import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin dark:border-gray-800 dark:border-t-gray-200"></div>
            </div>
        );
    }

    return user ? <Dashboard /> : <Login />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
