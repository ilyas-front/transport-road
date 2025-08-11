import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StopsState, SiteCSVRow } from './types';
import { parseStopFromCSV } from '../lib/parsers';
import { loadCSV } from '@/shared/lib';
const initialState: StopsState = {
    stops: [],
    loading: false,
    error: null,
};
export const loadStops = createAsyncThunk('stops/loadStops', async () => {
    const result = await loadCSV<SiteCSVRow>('/sites.csv', ';');
    if (result.error) {
        throw new Error(result.error);
    }
    return result.data.map(parseStopFromCSV);
});
const stopsSlice = createSlice({
    name: 'stops',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadStops.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loadStops.fulfilled, (state, action) => {
            state.loading = false;
            state.stops = action.payload;
        })
            .addCase(loadStops.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load stops';
        });
    },
});
export default stopsSlice.reducer;
