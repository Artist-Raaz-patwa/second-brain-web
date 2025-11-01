
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={`
                flex items-center justify-center px-4 py-2 
                bg-black dark:bg-white 
                text-white dark:text-black 
                border border-transparent 
                rounded-md 
                text-sm font-medium 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                dark:focus:ring-offset-black
                hover:bg-gray-800 dark:hover:bg-gray-200
                disabled:bg-gray-300 dark:disabled:bg-gray-700
                disabled:cursor-not-allowed
                transition-colors
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
