import { useCallback } from 'react';
import L from 'leaflet';
import { useAppDispatch } from '@/shared/providers';
import { selectStop, clearSelection, StopWithCost } from '@/entities/stop';
import { showTooltip, hideTooltip } from '@/shared/model/tooltipSlice';
export const useMapInteraction = () => {
    const dispatch = useAppDispatch();
    const handleStopClick = useCallback((stop: StopWithCost) => {
        dispatch(selectStop(stop.id));
    }, [dispatch]);
    const handleStopHover = useCallback((stop: StopWithCost, event: L.LeafletMouseEvent) => {
        dispatch(showTooltip({
            stop,
            position: {
                x: event.containerPoint.x,
                y: event.containerPoint.y,
            },
        }));
    }, [dispatch]);
    const handleStopLeave = useCallback(() => {
        dispatch(hideTooltip());
    }, [dispatch]);
    const handleMapClick = useCallback(() => {
        dispatch(clearSelection());
    }, [dispatch]);
    return {
        handlers: {
            onStopClick: handleStopClick,
            onStopHover: handleStopHover,
            onStopLeave: handleStopLeave,
            onMapClick: handleMapClick,
        },
        selectStop: handleStopClick,
        clearSelection: handleMapClick,
        showTooltip: handleStopHover,
        hideTooltip: handleStopLeave,
    };
};
