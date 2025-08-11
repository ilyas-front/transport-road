import React from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/shared/providers';
import { selectSelectedStopId, DetailedStopInfo } from '@/entities/stop';
import { RootState } from '@/shared/providers/store';
import { Tooltip } from '@/shared/ui';
const MapTooltipBase: React.FC = () => {
    const selectedStopId = useAppSelector(selectSelectedStopId);
    const tooltip = useAppSelector((state: RootState) => state.tooltip);
    if (!tooltip.visible || !tooltip.stop) {
        return null;
    }
    const portalTarget = typeof document !== 'undefined'
        ? document.getElementById('portal-root') || document.body
        : null;
    if (!portalTarget) {
        return null;
    }
    return createPortal((<Tooltip content={<DetailedStopInfo stop={tooltip.stop} isSelectedStop={selectedStopId === tooltip.stop.id} className="z-50"/>} visible={true} position={tooltip.position || undefined} className="z-50">
        <div />
      </Tooltip>), portalTarget);
};
export const MapTooltip = React.memo(MapTooltipBase);
MapTooltip.displayName = 'MapTooltip';
