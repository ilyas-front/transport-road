import { configureStore } from '@reduxjs/toolkit';
import stopsReducer from '@/entities/stop/model/stopsSlice';
import costsReducer from '@/entities/stop/model/costsSlice';
import selectedStopReducer from '@/entities/stop/model/selectedStopSlice';
import tooltipReducer from '@/shared/model/tooltipSlice';
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
