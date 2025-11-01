import React from 'react';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div
            className={`
                bg-white dark:bg-black
                p-4
                border border-gray-200 dark:border-gray-800
                rounded-lg
                shadow-sm
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Card;
