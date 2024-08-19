import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RangeSliderStateProps } from "@interfaces/types";

const initialState: RangeSliderStateProps = {
  stipplingSimple: {
    numPoints: 400000,
    pointRadius: 0.75,
    brightnessThreshold: 0.45
  },
  stipplingExtended: {
    gridSpacing: 9,
    maxPointSize: 15,
    brightnessScaling: 40,
    pointDensityScaling: 12
  },
  stipplingBlock: {
    numPoints: 400000,
    pointRadius: 0.75,
    brightnessThreshold: 0.45,
    lerpFactor: 0.5
  },
  ropeSimple: {
    numPoints: 1500,
    pointRadius: 3,
    brightnessThreshold: 0.7
  },
  ropeExtended: {
    gridSpacing: 10,
    maxPointSize: 20,
    brightnessScaling: 30,
    pointDensityScaling: 40
  },
  ropeBlock: {
    numPoints: 1500,
    pointRadius: 3,
    brightnessThreshold: 0.5,
    lerpFactor: 0.5
  },
  signSimple: {
    numPoints: 1500,
    pointRadius: 3,
    brightnessThreshold: 0.5
  },
  signExtended: {
    gridSpacing: 10,
    maxPointSize: 20,
    brightnessScaling: 30,
    pointDensityScaling: 40
  },
  signBlock: {
    numPoints: 1500,
    pointRadius: 3,
    brightnessThreshold: 0.5,
    lerpFactor: 0.5
  },
  stringSimple: {
    numPoints: 100,
    pointRadius: 1.5,
    brightnessThreshold: 0.6
  },
  stringExtended: {
    gridSpacing: 10,
    maxPointSize: 5,
    brightnessScaling: 20,
    pointDensityScaling: 60
  },
  stringBlock: {
    numPoints: 100,
    pointRadius: 1.5,
    brightnessThreshold: 0.6,
    lerpFactor: 0.5
  }
};

const rangeSliderSlice = createSlice({
  name: "rangeSlider",
  initialState,
  reducers: {
    setNumPoints(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("numPoints" in filter) {
        filter.numPoints = action.payload.value;
      }
    },
    setPointRadius(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("pointRadius" in filter) {
        filter.pointRadius = action.payload.value;
      }
    },
    setBrightnessThreshold(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("brightnessThreshold" in filter) {
        filter.brightnessThreshold = action.payload.value;
      }
    },
    setGridSpacing(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("gridSpacing" in filter) {
        filter.gridSpacing = action.payload.value;
      }
    },
    setMaxPointSize(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("maxPointSize" in filter) {
        filter.maxPointSize = action.payload.value;
      }
    },
    setBrightnessScaling(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("brightnessScaling" in filter) {
        filter.brightnessScaling = action.payload.value;
      }
    },
    setPointDensityScaling(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("pointDensityScaling" in filter) {
        filter.pointDensityScaling = action.payload.value;
      }
    },
    setLerpFactor(
      state,
      action: PayloadAction<{
        filterType: keyof RangeSliderStateProps;
        value: number;
      }>
    ) {
      const filter = state[action.payload.filterType];
      if ("lerpFactor" in filter) {
        filter.lerpFactor = action.payload.value;
      }
    },
    resetRangeSlider(state) {
      return initialState;
    }
  }
});

export const {
  setNumPoints,
  setPointRadius,
  setBrightnessThreshold,
  setGridSpacing,
  setMaxPointSize,
  setBrightnessScaling,
  setPointDensityScaling,
  setLerpFactor,
  resetRangeSlider
} = rangeSliderSlice.actions;

export default rangeSliderSlice.reducer;
