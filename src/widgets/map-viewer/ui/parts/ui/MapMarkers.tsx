import React from 'react';
import { useAppSelector } from '@/shared/providers/ReduxHooks';
import { MapInteractionHandlers } from '../../../types/types';
import { selectStopsWithCostData, selectSelectedMarkerId, MarkerWithCost, } from '@/shared';
import { Marker } from '@/entities/marker';
interface MapMarkersProps {
  handlers: MapInteractionHandlers;
}
export const MapMarkers: React.FC<MapMarkersProps> = ({ handlers }) => {
  const MarkersWithCostData = useAppSelector(selectStopsWithCostData);
  const selectedMarkerId = useAppSelector(selectSelectedMarkerId);
  return (<>
    {MarkersWithCostData.map((marker: MarkerWithCost) => (
      <Marker key={marker.id}
        marker={marker} isSelected={marker.id === selectedMarkerId}
        onClick={handlers.onMarkerClick}
        onMouseEnter={handlers.onMarkerHover}
        onMouseLeave={handlers.onMarkerLeave} />))}
  </>);
};
MapMarkers.displayName = 'MapMarkers';