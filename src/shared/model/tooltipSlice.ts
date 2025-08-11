import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StopWithCost } from '@/entities/stop';
export interface TooltipPosition {
    x: number;
    y: number;
}
export interface TooltipState {
    stop: StopWithCost | null;
    position: TooltipPosition | null;
    visible: boolean;
}
const initialState: TooltipState = {
    stop: null,
    position: null,
    visible: false,
};
const tooltipSlice = createSlice({
    name: 'tooltip',
    initialState,
    reducers: {
        showTooltip: (state, action: PayloadAction<{
            stop: StopWithCost;
            position: TooltipPosition;
        }>) => {
            state.stop = action.payload.stop;
            state.position = action.payload.position;
            state.visible = true;
        },
        hideTooltip: state => {
            state.stop = null;
            state.position = null;
            state.visible = false;
        },
    },
});
export const { showTooltip, hideTooltip } = tooltipSlice.actions;
export default tooltipSlice.reducer;
