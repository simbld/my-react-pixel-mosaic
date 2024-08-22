import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideMenu } from "../gameboy/gameboySlice";
import { RootStateProps } from "../stores/store";
import { resetToFirstOption } from "./menuGameboySlice";

// Un simple selector pour obtenir l'index de l'option sélectionnée
export const selectOptionIndex = (state: RootStateProps) =>
  state.menuGameBoy.OptionIndex;

export const selectOptionCount = (state: RootStateProps) =>
  state.menuGameboy.optionCount;

// Si vous avez besoin d'accéder aux détails de l'option actuellement sélectionnée

// Supposons que vous ayez un tableau d'options quelque part dans l'état
export const selectCurrentOption = (state: RootStateProps) => {
  const options = state.menuGameboy.options; // Assurez-vous que vous stockez vos options quelque part dans l'état
  return options[state.menuGameboy.selectedOptionIndex];
};

export const goBackToMainMenu = createAsyncThunk(
  "menuGameboy/goBackToMainMenu",
  async (_, { dispatch, getState }) => {
    const { gameboy } = getState() as RootStateProps;
    if (gameboy.menuVisible) {
      dispatch(hideMenu());
    }
    dispatch(resetToFirstOption());
  }
);

// Si vous avez besoin de sélectionner des données plus complexes ou calculées,
// vous pouvez utiliser createSelector pour la composition des selectors:
// import { createSelector } from '@reduxjs/toolkit';

// export const selectSomethingComplex = createSelector(
//   [selectOptionIndex, anotherSelector],
//   (OptionIndex, anotherValue) => {
//     // Faites un calcul complexe ici si nécessaire
//     return computedValue;
//   }
// );
