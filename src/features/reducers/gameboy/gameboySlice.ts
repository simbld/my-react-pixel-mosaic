import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { GameboyState } from "../../../interfaces/prop-types";

// Définition des types d'actions
export type TogglePowerAction = PayloadAction<void>;
export type InsertCartridgeAction = PayloadAction<string>;
export type RemoveCartridgeAction = PayloadAction<void>;
export type ChangeScreenAction = PayloadAction<string>;
export type ChangeScreenColorAction = PayloadAction<"green" | "darkgreen">;

// Type qui combine toutes les actions du slice
export type GameboyActions =
  | TogglePowerAction
  | InsertCartridgeAction
  | RemoveCartridgeAction
  | ChangeScreenAction
  | ChangeScreenColorAction;

// Définition de l'état initial
const initialState: GameboyState = {
  power: false,
  cartridge: null,
  screen: null,
  screenColorOn: "green"
};

// Définition du slice
export const gameboySlice = createSlice({
  name: "gameboy",
  initialState,
  reducers: {
    togglePower: (state) => {
      state.power = !state.power;
    },
    insertCartridge: (state, action: PayloadAction<string>) => {
      state.cartridge = action.payload;
    },
    removeCartridge: (state) => {
      state.cartridge = null;
    },
    changeScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
    changeScreenColor: (
      state,
      action: PayloadAction<"green" | "darkgreen">
    ) => {
      state.screenColorOn = action.payload;
    }
  }
});

// Exporter les actions
export const {
  togglePower,
  insertCartridge,
  removeCartridge,
  changeScreen,
  changeScreenColor
} = gameboySlice.actions;

// Exporter le reducer
export default gameboySlice.reducer;
