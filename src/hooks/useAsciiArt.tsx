import { useEffect, useState } from "react";
import getAsciiCharacter from "../helpers/getAsciiCharacter";
import { AsciiArtHookResultProps } from "../interfaces/prop-types";

const useAsciiArt = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageUrl: string,
  applyAscii: boolean
): AsciiArtHookResultProps => {
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageUrl || !applyAscii) {
      setError("Aucune image fournie ou canvas non disponible.");
      return;
    }

    setLoading(true);
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Important pour les sources externes
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let asciiStr = "";
        for (let i = 0; i < imgData.data.length; i += 4) {
          const brightness =
            0.34 * imgData.data[i] +
            0.5 * imgData.data[i + 1] +
            0.16 * imgData.data[i + 2];
          asciiStr += getAsciiCharacter(brightness);
          if ((i / 4) % canvas.width === 0) {
            asciiStr += "\n";
          }
        }
        setAsciiArt(asciiStr);
      } else {
        setError("Impossible de récupérer le contexte du canvas.");
      }
      setLoading(false);
    };
    img.onerror = () => {
      setError("Erreur lors du chargement de l'image.");
      setLoading(false);
    };
  }, [canvasRef, imageUrl, applyAscii]);

  return { asciiArt, loading, error };
};

export default useAsciiArt;
