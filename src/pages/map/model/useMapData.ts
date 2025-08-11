import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/providers';
import { loadStops, loadCosts, selectIsLoading, selectErrors, selectIsDataLoaded } from '@/entities/stop';
export const useMapData = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const errors = useAppSelector(selectErrors);
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
