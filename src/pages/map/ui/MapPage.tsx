import React from 'react';
import { MapViewer } from '@/widgets/map-viewer';
import { useMapData } from '../model';
import { LoadingState } from './parts/LoadingState';
import { ErrorState } from './parts/ErrorState';
export const MapPage: React.FC = () => {
    const { isLoading, errors, retryLoadData } = useMapData();
    if (isLoading) {
        return <LoadingState />;
    }
    if (errors) {
        return <ErrorState errorMessage={errors} onRetry={retryLoadData}/>;
    }
    return (<MapViewer />);
};
