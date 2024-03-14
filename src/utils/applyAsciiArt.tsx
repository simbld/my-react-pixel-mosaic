import { useEffect, useRef } from "react";

const AsciiArtCanvas = ({ imageSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Après avoir dessiné l'image, appliquer l'effet ASCII
      applyAsciiEffect(canvas, ctx);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  return <canvas ref={canvasRef} />;
};

function applyAsciiEffect(canvas, ctx) {
  // Cette fonction doit implémenter la logique pour convertir l'image en ASCII
  // Exemple simplifié :
  ctx.font = "10px MorePerfectDOSVGA"; // Assurez-vous que cette police est chargée via CSS
  ctx.fillStyle = "black";
  ctx.fillText("Exemple ASCII", 10, 10); // Remplacer par votre logique de dessin ASCII
}

export default AsciiArtCanvas;
