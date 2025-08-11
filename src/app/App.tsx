import React from 'react';
import { ReduxProvider, } from '@/shared';
import { MapPage } from '@/pages/map/ui/MapPage';
import { MapTooltip } from '@/widgets/map-tooltip';

export const App: React.FC = () => {
  return (<ReduxProvider>
    <MapPage />
    <MapTooltip />
  </ReduxProvider>);
};
