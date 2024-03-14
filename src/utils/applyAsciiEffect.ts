// Assurez-vous d'importer ces fonctions si elles se trouvent dans d'autres fichiers
function getAsciiCharacter(brightness: number): string {
  const chars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", ".", " "];
  return chars[Math.floor(map(brightness, 0, 255, 0, chars.length - 1))];
}

function map(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

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
