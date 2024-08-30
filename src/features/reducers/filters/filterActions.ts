import { createAction } from "@reduxjs/toolkit";

// Actions to enable/disable filters
export const toggleAsciiFilter = createAction<boolean>("filters/toggleAscii");
export const toggleStipplingFilter = createAction<boolean>(
  "filters/toggleStippling"
);
export const toggleRopeFilter = createAction<boolean>("filters/toggleRope");
export const toggleSignFilter = createAction<boolean>("filters/toggleSign");
export const toggleStringFilter = createAction<boolean>("filters/toggleString");

// Actions to reset all filters
export const resetAllFilters = createAction("filters/resetAll");
