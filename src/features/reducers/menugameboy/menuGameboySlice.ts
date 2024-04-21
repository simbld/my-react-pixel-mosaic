import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MenuGameboyState } from "../../../interfaces/types";

const initialState: MenuGameboyState = {
  selectedOptionIndex: 0,
  optionCount: 4 // Cette valeur peut être dynamique si nécessaire
};

export const menuGameboySlice = createSlice({
  name: "menuGameboy",
  initialState,
  reducers: {
    // Action pour sélectionner une option directement
    selectOption: (state, action: PayloadAction<number>) => {
      state.selectedOptionIndex = action.payload;
    },
    // Action pour naviguer à l'option suivante
    nextOption: (state) => {
      state.selectedOptionIndex = (state.selectedOptionIndex + 1) % 4;
    },
    // Action pour revenir à l'option précédente
    previousOption: (state) => {
      state.selectedOptionIndex = (state.selectedOptionIndex - 1 + 4) % 4;
    }
  }
});

// Exportation des actions pour utilisation dans les composants
export const { selectOption, nextOption, previousOption } =
  menuGameboySlice.actions;

// Exportation du reducer pour inclusion dans le store
export default menuGameboySlice.reducer;
