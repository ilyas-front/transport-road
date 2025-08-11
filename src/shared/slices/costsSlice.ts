import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CostsState, CostCSVRow } from '@/shared/types/MarkerType';
import { parseCostDataFromCSV, createCostsMap } from '@/shared/lib/data-parsers';
import { loadCSV } from '@/shared/lib';
const initialState: CostsState = {
    costsMap: {},
    loading: false,
    error: null,
};
export const loadCosts = createAsyncThunk('costs/loadCosts', async () => {
    const result = await loadCSV<CostCSVRow>(`${import.meta.env.BASE_URL}costs.csv`, ';');
    if (result.error) {
        throw new Error(result.error);
    }
    const costsWithIds = result.data.map(parseCostDataFromCSV);
    const costsMap = createCostsMap(costsWithIds);
    return { costsMap };
});
const costsSlice = createSlice({
    name: 'costs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loadCosts.fulfilled, (state, action) => {
            state.loading = false;
            state.costsMap = action.payload.costsMap;
        })
            .addCase(loadCosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load costs';
        });
    },
});
export default costsSlice.reducer;
