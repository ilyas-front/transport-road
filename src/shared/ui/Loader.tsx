import React from 'react';
interface LoaderProps {
    className?: string;
    text?: string;
}
export const Loader: React.FC<LoaderProps> = ({ className = '', text = 'Загрузка...' }) => {
    return (<div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
      <span className="text-gray-600 text-sm">{text}</span>
    </div>);
};
