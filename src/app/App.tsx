import React from 'react';
import { ReduxProvider } from '../shared/providers/ReduxProvider';
import { MapPage } from '@/pages/map';
import { MapTooltip } from '@/widgets/map-viewer';
export const App: React.FC = () => {
    return (<ReduxProvider>
      <MapPage />
      <MapTooltip />
    </ReduxProvider>);
};
