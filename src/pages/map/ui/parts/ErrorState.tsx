import React from 'react';
interface ErrorStateProps {
    errorMessage: string;
    onRetry: () => void;
}
export const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage, onRetry }) => {
    return (<div className="flex items-center justify-center h-screen">
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-lg font-semibold text-red-800 mb-2">
          Ошибка загрузки данных
        </h2>
        <p className="text-red-600 mb-4">{errorMessage}</p>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200" onClick={onRetry} type="button">
          Попробовать снова
        </button>
      </div>
    </div>);
};
