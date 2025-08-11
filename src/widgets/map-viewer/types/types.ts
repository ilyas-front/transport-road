import L from 'leaflet';
import { StopWithCost } from '@/entities/stop';
export interface MapInteractionHandlers {
    onStopClick: (stop: StopWithCost) => void;
    onStopHover: (stop: StopWithCost, event: L.LeafletMouseEvent) => void;
    onStopLeave: () => void;
    onMapClick: () => void;
}
