import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MarkersState, SiteCSVRow } from '@/shared/types/MarkerType';
import { parseMarkerFromCSV } from '@/shared/lib/data-parsers';
import { loadCSV } from '@/shared/lib';
const initialState: MarkersState = {
    markers: [],
    loading: false,
    error: null,
};
export const loadStops = createAsyncThunk('stops/loadStops', async () => {  
    const result = await loadCSV<SiteCSVRow>('/sites.csv', ';');
    if (result.error) {
        throw new Error(result.error);
    }
    return result.data.map(parseMarkerFromCSV);
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
            state.markers = action.payload;
        })
            .addCase(loadStops.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load stops';
        });
    },
});
export default stopsSlice.reducer;
