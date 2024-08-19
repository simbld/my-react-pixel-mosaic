import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MenuGameboyStateProps } from "../../../interfaces/types";

const initialState: MenuGameboyStateProps = {
  selectedOptionIndex: 0,
  optionCount: 4 // Cette valeur peut être dynamique si nécessaire
};

export const menuGameboySlice = createSlice({
  name: "menuGameboy",
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<number>) => {
      state.selectedOptionIndex = action.payload;
    },
    nextOption: (state) => {
      state.selectedOptionIndex = (state.selectedOptionIndex + 1) % 4;
    },
    previousOption: (state) => {
      state.selectedOptionIndex = (state.selectedOptionIndex - 1 + 4) % 4;
    },
    resetToFirstOption: (state) => {
      state.selectedOptionIndex = 0;
    }
  }
});

// Exportation des actions pour utilisation dans les composants
export const { selectOption, nextOption, previousOption, resetToFirstOption } =
  menuGameboySlice.actions;

// Exportation du reducer pour inclusion dans le store
export default menuGameboySlice.reducer;
