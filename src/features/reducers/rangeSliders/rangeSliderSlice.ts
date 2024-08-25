import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  RangeSliderStateProps,
  SimpleFilterProps,
  ExtendedFilterProps,
  BlockFilterProps
} from "@interfaces/types";

// État initial du slice
const initialState: RangeSliderStateProps = {
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
  stringSimple: { stringLength: 100, stringTension: 0.5 },
  stringExtended: { stringDensity: 10, stringOpacity: 0.7 },
  stringBlock: { stringThickness: 1, maxStringLength: 100 }
};

const rangeSliderSlice = createSlice({
  name: "rangeSliders",
  initialState,
  reducers: {
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
