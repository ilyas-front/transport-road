import React, { useMemo } from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';
import { MarkerWithCost } from '@/shared/types/MarkerType';
import { getCostColor, createMarkerIcon } from '@/shared/lib';
import { COLORS } from '@/shared';



interface MarkerProps {
  marker: MarkerWithCost;
  isSelected?: boolean;
  onClick?: (marker: MarkerWithCost) => void;
  onMouseEnter?: (marker: MarkerWithCost, event: L.LeafletMouseEvent) => void;
  onMouseLeave?: () => void;
}

export const Marker: React.FC<MarkerProps> = ({ marker, isSelected = false, onClick, onMouseEnter, onMouseLeave, }) => {
  const icon = useMemo(() => {
    const markerColor = isSelected
      ? COLORS.SELECTED
      : getCostColor(marker.costData?.cost);

    return createMarkerIcon(markerColor, isSelected);
  }, [isSelected, marker.costData?.cost, marker.id, marker.position]);
  const handleClick = () => {
    onClick?.(marker);
  };
  const handleMouseEnter = (event: L.LeafletMouseEvent) => {
    onMouseEnter?.(marker, event);
  };
  const handleMouseLeave = () => {
    onMouseLeave?.();
  };
  return (<LeafletMarker position={marker.position} icon={icon} eventHandlers={{
    click: handleClick,
    mouseover: handleMouseEnter,
    mouseout: handleMouseLeave,
  }} />);
};
