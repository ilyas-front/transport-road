import React from 'react';
import { createPortal } from 'react-dom';
import { Tooltip, selectSelectedMarkerId, RootState, useAppSelector } from '@/shared';
import { DetailedMarkerInfo } from '@/entities/detailed-info';

const MapTooltipBase: React.FC = () => {
    const selectedMarkerId = useAppSelector(selectSelectedMarkerId);
    const tooltip = useAppSelector((state: RootState) => state.tooltip);
    if (!tooltip.visible || !tooltip.marker) {
        return null;
    }
    const portalTarget = typeof document !== 'undefined'
        ? document.getElementById('portal-root') || document.body
        : null;
    if (!portalTarget) {
        return null;
    }
    return createPortal((
        <Tooltip content={
            <DetailedMarkerInfo
                marker={tooltip.marker}
                isSelectedMarker={selectedMarkerId === tooltip.marker.id}
            />}
            visible={true}
            position={tooltip.position || undefined}
        >
            <div />
        </Tooltip>), portalTarget);
};
export const MapTooltip = React.memo(MapTooltipBase);
MapTooltip.displayName = 'MapTooltip';
