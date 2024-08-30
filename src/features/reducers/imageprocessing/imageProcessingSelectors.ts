import { RootStateProps } from "../stores/store";

export const selectImage = (state: RootStateProps) =>
  state.imageProcessing.image;
