
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={`
                w-full px-3 py-2
                bg-white dark:bg-gray-900
                text-black dark:text-white
                border border-gray-300 dark:border-gray-700
                rounded-md
                focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:border-gray-500
                placeholder-gray-400 dark:placeholder-gray-500
                transition-colors
                ${className}
            `}
            {...props}
        />
    );
};

export default Input;
