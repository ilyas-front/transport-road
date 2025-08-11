import React from 'react';
import { Loader } from '@/shared';
interface LoadingStateProps {
    loadingText?: string;
}
export const LoadingState: React.FC<LoadingStateProps> = ({ loadingText = "Загрузка данных карты..." }) => {
    return (<div className="flex items-center justify-center h-screen">
      <Loader text={loadingText}/>
    </div>);
};
