/**
 * Génère un effet de stippling pour une image donnée.
 *
 * @param {ImageData} imageData - Données de l'image.
 * @returns {string} Représentation sous forme de data URL du canvas.
 * 
 *  @example
      function MyComponent({ image }) {
      const canvasRef = useStipplingEffect(image);
      return <canvas ref={canvasRef} />;
 */

import { useEffect, useRef } from "react";
import getPixelColor from "../utils/getPixelColor";

function useStipplingEffect(imageSrc) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    const ctx = canvas.getContext("2d");

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Convertir imageData en niveaux de gris et placer des points basés sur la luminosité
      for (let y = 0; y < imageData.height; y += 10) {
        // Le pas de 10 contrôle la densité des points
        for (let x = 0; x < imageData.width; x += 10) {
          const index = (x + y * imageData.width) * 4;
          const { r, g, b } = getPixelColor(imageData.data, index);
          const brightness = 0.3 * r + 0.59 * g + 0.11 * b; // Calcul simplifié de la luminosité

          if (brightness < 128) {
            // Seuil de luminosité pour décider de placer un point
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2); // Taille des points
            ctx.fill();
          }
        }
      }
    };
    image.src = imageSrc;
  }, [imageSrc]);

  return canvasRef;
}

export default useStipplingEffect;
