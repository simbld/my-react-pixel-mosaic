import { densityDot } from "../config/config";

function getAsciiCharacter(brightness: number): string {
  const chars = densityDot.split("");
  const index = Math.floor(((brightness - 0) * (chars.length - 1)) / (255 - 0));

  return chars[index];
}

export default getAsciiCharacter;

import { useState, useEffect } from "react";

const useMapValue = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number => {
  const [mappedValue, setMappedValue] = useState<number>(0);

  useEffect(() => {
    const newValue: number =
      start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    setMappedValue(newValue);
  }, [value, start1, stop1, start2, stop2]);

  return mappedValue;
};

export default useMapValue;

const applyAsciiEffect = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let asciiImage = "";

  for (let i = 0; i < imgData.data.length; i += 4) {
    const brightness =
      0.34 * imgData.data[i] +
      0.5 * imgData.data[i + 1] +
      0.16 * imgData.data[i + 2];
    const character = getAsciiCharacter(brightness);
    asciiImage += character;
    // Ajouter une nouvelle ligne tous les X caractères pour simuler la largeur de l'image
    if ((i / 4) % canvas.width === 0) {
      asciiImage += "\n";
    }
  }

  // Ici, vous devez décider de la manière de gérer asciiImage.
  // Par exemple, vous pourriez l'afficher dans la console, ou mieux, le définir dans un état et l'afficher dans le rendu de votre composant.
  console.log(asciiImage);
};

export default applyAsciiEffect;
