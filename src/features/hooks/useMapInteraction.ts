import { useCallback } from 'react';
import L from 'leaflet';
import { useAppDispatch } from '@/shared/providers/ReduxHooks';
import { showTooltip, hideTooltip } from '@/shared/slices/tooltipSlice';
import { MarkerWithCost, selectMarker, clearSelection } from '@/shared';


export const useMapInteraction = () => {
  const dispatch = useAppDispatch();
  const handleMarkerClick = useCallback((marker: MarkerWithCost) => {
    dispatch(selectMarker(marker.id));
  }, [dispatch]);
  const handleMarkerHover = useCallback((marker: MarkerWithCost, event: L.LeafletMouseEvent) => {
    dispatch(showTooltip({
      marker,
      position: {
        x: event.containerPoint.x,
        y: event.containerPoint.y,
      },
    }));
  }, [dispatch]);
  const handleMarkerLeave = useCallback(() => {
    dispatch(hideTooltip());
  }, [dispatch]);
  const handleMapClick = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);
  return {
    handlers: {
      onMarkerClick: handleMarkerClick,
      onMarkerHover: handleMarkerHover,
      onMarkerLeave: handleMarkerLeave,
      onMapClick: handleMapClick,
    },
    selectMarker: handleMarkerClick,
    clearSelection: handleMapClick,
    showTooltip: handleMarkerHover,
    hideTooltip: handleMarkerLeave,
  };
};
