import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, loadStops, loadCosts, selectStopsLoading, selectStopsError, selectIsDataLoaded } from '@/shared';

export const useMapData = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectStopsLoading);
    const errors = useAppSelector(selectStopsError);
    const isDataLoaded = useAppSelector(selectIsDataLoaded);
    const loadMapData = () => {
        dispatch(loadStops());
        dispatch(loadCosts());
    };
    const retryLoadData = () => {
        loadMapData();
    };
    useEffect(() => {
        loadMapData();
    }, [dispatch]);
    return {
        isLoading,
        errors,
        retryLoadData,
        isDataLoaded,
    };
};
