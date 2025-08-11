import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedStopState } from './types';
const initialState: SelectedStopState = {
    selectedStopId: null,
};
const selectedStopSlice = createSlice({
    name: 'selectedStop',
    initialState,
    reducers: {
        selectStop: (state, action: PayloadAction<number>) => {
            state.selectedStopId = action.payload;
        },
        clearSelection: (state) => {
            state.selectedStopId = null;
        },
    },
});
export const { selectStop, clearSelection } = selectedStopSlice.actions;
export default selectedStopSlice.reducer;
