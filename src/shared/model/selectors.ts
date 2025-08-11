import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/shared/providers/store';
import { getCostDataBetweenStops } from '@/shared/lib/data-parsers';
import { MarkerWithCost } from '@/shared/types/MarkerType';

export const selectStops = (state: RootState) => state.stops.markers;
export const selectStopsLoading = (state: RootState) => state.stops.loading;
export const selectStopsError = (state: RootState) => state.stops.error;
export const selectCostsMap = (state: RootState) => state.costs.costsMap;
export const selectCostsLoading = (state: RootState) => state.costs.loading;
export const selectCostsError = (state: RootState) => state.costs.error;
export const selectSelectedMarkerId = (state: RootState) => state.selectedStop.selectedMarkerId;
export const selectSelectedMarker = createSelector(
    [selectStops, selectSelectedMarkerId],
    (stops, selectedMarkerId) => (selectedMarkerId ? stops.find((stop: MarkerWithCost) => stop.id === selectedMarkerId) ?? null : null)
);
export const selectStopsWithCostData = createSelector(
    [selectStops, selectCostsMap, selectSelectedMarkerId],
    (stops, costsMap, selectedMarkerId): MarkerWithCost[] => {
        
        if (!selectedMarkerId) {
            return stops.map((stop: MarkerWithCost) => ({ ...stop, costData: undefined }));
        }

        return stops.map((stop: MarkerWithCost) => {
            if (stop.id === selectedMarkerId) {
                return { ...stop, costData: undefined };
            }
            const costData = getCostDataBetweenStops(selectedMarkerId, stop.id, costsMap);
            return { ...stop, costData };
        });
    }
);
export const selectStopsWithCosts = selectStopsWithCostData;
export const selectStopsWithDetailedCosts = selectStopsWithCostData;
export const selectIsDataLoaded = createSelector(
    [selectStops, selectCostsMap],
    (stops, costsMap) => Boolean(stops.length && Object.keys(costsMap).length)
);
export const selectIsLoading = createSelector([selectStopsLoading, selectCostsLoading], (stopsLoading, costsLoading) => stopsLoading || costsLoading);
export const selectErrors = createSelector(
    [selectStopsError, selectCostsError],
    (...errors) => {
        const message = errors.filter(Boolean).join('; ');
        return message || null;
    }
);
