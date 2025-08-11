import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedMarkerState } from '@/shared/types/MarkerType';
const initialState: SelectedMarkerState = {
    selectedMarkerId: null,
};
const selectedStopSlice = createSlice({
    name: 'selectedStop',
    initialState,
    reducers: {
        selectMarker: (state, action: PayloadAction<number>) => {
            state.selectedMarkerId = action.payload;
        },
        clearSelection: (state) => {
            state.selectedMarkerId = null;
        },
    },
});
export const { selectMarker, clearSelection } = selectedStopSlice.actions;
export default selectedStopSlice.reducer;
