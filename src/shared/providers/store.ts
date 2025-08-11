import { configureStore } from '@reduxjs/toolkit';
import stopsReducer from '@/shared/slices/stopsSlice';
import costsReducer from '@/shared/slices/costsSlice';
import selectedStopReducer from '@/shared/slices/selectedStopSlice';
import tooltipReducer from '@/shared/slices/tooltipSlice';

export const store = configureStore({
    reducer: {
        stops: stopsReducer,
        costs: costsReducer,
        selectedStop: selectedStopReducer,
        tooltip: tooltipReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


