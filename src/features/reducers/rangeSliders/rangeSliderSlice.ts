import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  RangeSliderStateProps,
  SimpleFilterProps,
  ExtendedFilterProps,
  BlockFilterProps
} from "@interfaces/types";

// Initial state of the slice
const initialState: RangeSliderStateProps = {
  filterType: "ascii",
  stipplingType: "simple",
  ropeType: "simple",
  signType: "simple",
  stringType: "simple",

  // The states of simple, extended and block filters
  stipplingSimple: {
    numPoints: 30000,
    pointRadius: 2,
    brightnessThreshold: 0.5
  },
  stipplingExtended: { gridSpacing: 10, maxPointSize: 5, brightnessScaling: 1 },
  stipplingBlock: {
    numPoints: 1000,
    pointRadius: 2,
    brightnessThreshold: 0.5,
    lerpFactor: 0.2
  },
  ropeSimple: {
    lineThickness: 1,
    numLines: 50,
    minOpacity: 0.1,
    maxOpacity: 1,
    boostFactor: 1
  },
  ropeExtended: { step: 5, angleSteps: 10, lineDensity: 0.8 },
  ropeBlock: { step: 5, minLineDensity: 2, maxLineDensity: 10 },
  signSimple: { shape: "circle", step: 10, lineDensity: 5 },
  signExtended: { step: 10, lineDensity: 10 },
  signBlock: { step: 10, minLineDensity: 2, maxLineDensity: 10 },
  stringSimple: {
    lineDensity: 100,
    numPoints: 100,
    lineWidth: 0.1
  },
  stringExtended: { lineDensity: 0.8, step: 10, tension: 0.5, opacity: 0.8 },
  stringBlock: { thickness: 2, maxLength: 50, step: 10 }
};

const rangeSliderSlice = createSlice({
  name: "rangeSliders",
  initialState,
  reducers: {
    // Actions to update the filter
    updateFilterType(
      state,
      action: PayloadAction<"ascii" | "stippling" | "rope" | "sign" | "string">
    ) {
      state.filterType = action.payload;
    },
    // Actions to update the sub option of the filter
    updateStipplingType(
      state,
      action: PayloadAction<"simple" | "extended" | "block">
    ) {
      state.stipplingType = action.payload;
    },
    updateRopeType(
      state,
      action: PayloadAction<"simple" | "extended" | "block">
    ) {
      state.ropeType = action.payload;
    },
    updateSignType(
      state,
      action: PayloadAction<"simple" | "extended" | "block">
    ) {
      state.signType = action.payload;
    },
    updateStringType(
      state,
      action: PayloadAction<"simple" | "extended" | "block">
    ) {
      state.stringType = action.payload;
    },

    // Other actions to update simple, extended and block filters
    updateStipplingSimple(state, action: PayloadAction<SimpleFilterProps>) {
      state.stipplingSimple = action.payload;
    },
    updateStipplingExtended(state, action: PayloadAction<ExtendedFilterProps>) {
      state.stipplingExtended = action.payload;
    },
    updateStipplingBlock(state, action: PayloadAction<BlockFilterProps>) {
      state.stipplingBlock = action.payload;
    },
    updateRopeSimple(state, action: PayloadAction<SimpleFilterProps>) {
      state.ropeSimple = action.payload;
    },
    updateRopeExtended(state, action: PayloadAction<ExtendedFilterProps>) {
      state.ropeExtended = action.payload;
    },
    updateRopeBlock(state, action: PayloadAction<BlockFilterProps>) {
      state.ropeBlock = action.payload;
    },
    updateSignSimple(state, action: PayloadAction<SimpleFilterProps>) {
      state.signSimple = action.payload;
    },
    updateSignExtended(state, action: PayloadAction<ExtendedFilterProps>) {
      state.signExtended = action.payload;
    },
    updateSignBlock(state, action: PayloadAction<BlockFilterProps>) {
      state.signBlock = action.payload;
    },
    updateStringSimple(state, action: PayloadAction<SimpleFilterProps>) {
      state.stringSimple = action.payload;
    },
    updateStringExtended(state, action: PayloadAction<ExtendedFilterProps>) {
      state.stringExtended = action.payload;
    },
    updateStringBlock(state, action: PayloadAction<BlockFilterProps>) {
      state.stringBlock = action.payload;
    }
  }
});

export const {
  updateFilterType,
  updateStipplingType,
  updateRopeType,
  updateSignType,
  updateStringType,
  updateStipplingSimple,
  updateStipplingExtended,
  updateStipplingBlock,
  updateRopeSimple,
  updateRopeExtended,
  updateRopeBlock,
  updateSignSimple,
  updateSignExtended,
  updateSignBlock,
  updateStringSimple,
  updateStringExtended,
  updateStringBlock
} = rangeSliderSlice.actions;

export default rangeSliderSlice.reducer;
