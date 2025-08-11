import L from 'leaflet';
import type { MarkerWithCost } from '@/shared/types/MarkerType';
export interface MapInteractionHandlers {
  onMarkerClick: (marker: MarkerWithCost) => void;
  onMarkerHover: (marker: MarkerWithCost, event: L.LeafletMouseEvent) => void;
  onMarkerLeave: () => void;
  onMapClick: () => void;
}
