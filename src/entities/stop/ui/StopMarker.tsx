import React, { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { StopWithCost } from '../model/types';
import { getCostColor } from '@/shared/lib';
import { COLORS } from '@/shared/config';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
interface StopMarkerProps {
    stop: StopWithCost;
    isSelected?: boolean;
    onClick?: (stop: StopWithCost) => void;
    onMouseEnter?: (stop: StopWithCost, event: L.LeafletMouseEvent) => void;
    onMouseLeave?: () => void;
}
const iconCache = new Map<string, L.DivIcon>();
const createMarkerIcon = (color: string, isSelected: boolean = false): L.DivIcon => {
    const key = `${color}-${isSelected}`;
    if (iconCache.has(key)) {
        return iconCache.get(key)!;
    }
    const size = isSelected ? 14 : 10;
    const stroke = isSelected ? 3 : 2;
    try {
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border: ${stroke}px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
            iconSize: [size + stroke * 2, size + stroke * 2],
            iconAnchor: [size / 2 + stroke, size / 2 + stroke],
        });
        iconCache.set(key, icon);
        return icon;
    }
    catch (error) {
        console.error('🚨 createMarkerIcon Error:', error);
        return new L.Icon.Default();
    }
};
export const StopMarker: React.FC<StopMarkerProps> = ({ stop, isSelected = false, onClick, onMouseEnter, onMouseLeave, }) => {
    const icon = useMemo(() => {
        const markerColor = isSelected
            ? COLORS.SELECTED
            : getCostColor(stop.costData?.cost);
        if (stop.id <= 1660) {
            console.log('🔍 StopMarker Debug:', {
                stopId: stop.id,
                position: stop.position,
                lat: stop.position[0],
                lng: stop.position[1],
                isValidLat: stop.position[0] >= -90 && stop.position[0] <= 90,
                isValidLng: stop.position[1] >= -180 && stop.position[1] <= 180,
                isSelected,
                markerColor,
            });
        }
        return createMarkerIcon(markerColor, isSelected);
    }, [isSelected, stop.costData?.cost, stop.id, stop.position]);
    const handleClick = () => {
        onClick?.(stop);
    };
    const handleMouseEnter = (event: L.LeafletMouseEvent) => {
        onMouseEnter?.(stop, event);
    };
    const handleMouseLeave = () => {
        onMouseLeave?.();
    };
    return (<Marker position={stop.position} icon={icon} eventHandlers={{
            click: handleClick,
            mouseover: handleMouseEnter,
            mouseout: handleMouseLeave,
        }}/>);
};
