import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/shared/providers/store';
import { getCostDataBetweenStops } from '../lib/parsers';
import { StopWithCost } from './types';
export const selectStops = (state: RootState) => state.stops.stops;
export const selectStopsLoading = (state: RootState) => state.stops.loading;
export const selectStopsError = (state: RootState) => state.stops.error;
export const selectCostsMap = (state: RootState) => state.costs.costsMap;
export const selectCostsLoading = (state: RootState) => state.costs.loading;
export const selectCostsError = (state: RootState) => state.costs.error;
export const selectSelectedStopId = (state: RootState) => state.selectedStop.selectedStopId;
export const selectSelectedStop = createSelector([selectStops, selectSelectedStopId], (stops, selectedStopId) => {
    if (!selectedStopId)
        return null;
    return stops.find(stop => stop.id === selectedStopId) || null;
});
export const selectStopsWithCostData = createSelector([selectStops, selectCostsMap, selectSelectedStopId], (stops, costsMap, selectedStopId): StopWithCost[] => {
    if (process.env.NODE_ENV === 'development' && stops.length > 0 && Object.keys(costsMap).length > 0) {
        console.log('✅ Data loaded:', {
            stopsCount: stops.length,
            costsMapSize: Object.keys(costsMap).length,
            selectedStopId
        });
    }
    if (!selectedStopId) {
        return stops.map(stop => ({ ...stop, costData: undefined }));
    }
    return stops.map(stop => {
        if (stop.id === selectedStopId) {
            return { ...stop, costData: undefined };
        }
        const costData = getCostDataBetweenStops(selectedStopId, stop.id, costsMap);
        return { ...stop, costData };
    });
});
export const selectStopsWithCosts = selectStopsWithCostData;
export const selectStopsWithDetailedCosts = selectStopsWithCostData;
export const selectIsDataLoaded = createSelector([selectStops, selectCostsMap], (stops, costsMap) => stops.length > 0 && Object.keys(costsMap).length > 0);
export const selectIsLoading = createSelector([selectStopsLoading, selectCostsLoading], (stopsLoading, costsLoading) => stopsLoading || costsLoading);
export const selectErrors = createSelector([selectStopsError, selectCostsError], (stopsError, costsError) => {
    const errors = [stopsError, costsError].filter(Boolean);
    return errors.length > 0 ? errors.join('; ') : null;
});
