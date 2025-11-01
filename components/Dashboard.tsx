
import React, { useState } from 'react';
import { logout } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import NotesModule from './modules/NotesModule';

// This is where you will import and manage new modules.
// To add a new module (e.g., 'Wallet'), you would:
// 1. Create a `WalletModule.tsx` in `components/modules/`.
// 2. Import it here: `import WalletModule from './modules/WalletModule';`
// 3. Add it to the `modules` object below.
const modules = {
    notes: {
        name: 'Notes',
        component: <NotesModule />,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        )
    },
    // Example for a future "Wallet" module:
    // wallet: {
    //     name: 'Wallet',
    //     component: <WalletModule />,
    //     icon: (...)
    // }
};

type ModuleKey = keyof typeof modules;

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeModule, setActiveModule] = useState<ModuleKey>('notes');

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white font-sans">
            {/* Sidebar Navigation */}
            <nav className="w-16 md:w-64 bg-white dark:bg-black p-2 md:p-4 flex flex-col justify-between border-r border-gray-200 dark:border-gray-800">
                <div>
                    <div className="flex items-center mb-8 p-2">
                        <div className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-full"></div>
                        <span className="hidden md:inline font-bold text-lg ml-2 tracking-wider">Second Brain</span>
                    </div>
                    <ul>
                        {Object.keys(modules).map((key) => (
                            <li key={key}>
                                <button
                                    onClick={() => setActiveModule(key as ModuleKey)}
                                    className={`flex items-center w-full p-2 my-1 rounded-md text-sm transition-colors ${
                                        activeModule === key
                                            ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                                    }`}
                                >
                                    {modules[key as ModuleKey].icon}
                                    <span className="hidden md:inline ml-4">{modules[key as ModuleKey].name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex items-center p-2">
                        <img src={user?.photoURL ?? undefined} alt="User" className="w-8 h-8 rounded-full" />
                        <div className="hidden md:flex flex-col ml-3">
                            <span className="text-sm font-medium truncate">{user?.displayName}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full p-2 mt-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                         </svg>
                        <span className="hidden md:inline ml-4">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                {modules[activeModule].component}
            </main>
        </div>
    );
};

export default Dashboard;
