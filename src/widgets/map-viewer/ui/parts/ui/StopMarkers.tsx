import React from 'react';
import { useAppSelector } from '@/shared/providers';
import { selectStopsWithCostData, selectSelectedStopId, StopMarker, StopWithCost, } from '@/entities/stop';
import { MapInteractionHandlers } from '../../../types/types';
interface StopMarkerProps {
    handlers: MapInteractionHandlers;
}
export const StopMarkers: React.FC<StopMarkerProps> = ({ handlers }) => {
    const stopsWithCostData = useAppSelector(selectStopsWithCostData);
    const selectedStopId = useAppSelector(selectSelectedStopId);
    return (<>
      {stopsWithCostData.map((stop: StopWithCost) => (<StopMarker key={stop.id} stop={stop} isSelected={stop.id === selectedStopId} onClick={handlers.onStopClick} onMouseEnter={handlers.onStopHover} onMouseLeave={handlers.onStopLeave}/>))}
    </>);
};
