export interface FontFaceSet {
  add(font: FontFace): void;
}

export interface Document {
  fonts: FontFaceSet;
}
