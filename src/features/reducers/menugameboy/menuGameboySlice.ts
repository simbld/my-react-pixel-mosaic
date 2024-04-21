import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MenuGameboyState } from "../../../interfaces/types";

export type MenuGameboyAction = PayloadAction<number>;

const initialState: MenuGameboyState = {
  selectedOptionIndex: 0,
  optionCount: 4 // Cette valeur peut être dynamique si nécessaire
};

export const menuGameboySlice = createSlice({
  name: "menuGameboy",
  initialState,
  reducers: {
    // Action pour sélectionner une option directement
    selectOption: (state, action: MenuGameboyAction) => {
      // Vérifie si l'index est dans les limites des options disponibles
      if (action.payload >= 0 && action.payload < state.optionCount) {
        state.selectedOptionIndex = action.payload;
      }
    },
    // Action pour naviguer à l'option suivante
    nextOption: (state) => {
      state.selectedOptionIndex =
        (state.selectedOptionIndex + 1) % state.optionCount;
    },
    // Action pour revenir à l'option précédente
    previousOption: (state) => {
      state.selectedOptionIndex =
        (state.selectedOptionIndex - 1 + state.optionCount) % state.optionCount;
    },
    // Action pour définir le nombre total d'options (si dynamique)
    setOptionCount: (state, action: MenuGameboyAction) => {
      state.optionCount = action.payload;
    }
  }
});

// Exportation des actions pour utilisation dans les composants
export const { selectOption, nextOption, previousOption, setOptionCount } =
  menuGameboySlice.actions;

// Exportation du reducer pour inclusion dans le store
export default menuGameboySlice.reducer;
