
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
  progress?: number; // Optional progress value (0 to 1)
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message, progress }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 my-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
      <div className="text-blue-700 font-semibold mb-2">{message}</div>
      {progress !== undefined && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
          ></div>
        </div>
      )}
      {progress === undefined && (
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      )}
    </div>
  );
};

export default LoadingIndicator;
