
import React from 'react';
import { signInWithGoogle } from '../services/authService';
import Button from './common/Button';

const Login: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">
            <div className="text-center">
                <h1 className="text-5xl font-thin mb-2 tracking-wider">Second Brain</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">A minimalist, modular space for your thoughts.</p>
                <Button onClick={signInWithGoogle}>
                    <svg className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C307.2 99.8 280.7 86 248 86c-82.3 0-150.3 66.6-150.3 149.3s68 149.3 150.3 149.3c54.9 0 102.6-29.5 127.2-72.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default Login;
