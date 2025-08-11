import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkerWithCost } from '@/shared/types/MarkerType';

export interface TooltipPosition {
  x: number;
  y: number;
}

export interface TooltipState {
  marker: MarkerWithCost | null;
  position: TooltipPosition | null;
  visible: boolean;
}

const initialState: TooltipState = {
  marker: null,
  position: null,
  visible: false,
};

const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    showTooltip: (
      state,
      action: PayloadAction<{ marker: MarkerWithCost; position: TooltipPosition }>
    ) => {
      state.marker = action.payload.marker;
      state.position = action.payload.position;
      state.visible = true;
    },
    hideTooltip: state => {
      state.marker = null;
      state.position = null;
      state.visible = false;
    },
  },
});

export const { showTooltip, hideTooltip } = tooltipSlice.actions;
export default tooltipSlice.reducer;


