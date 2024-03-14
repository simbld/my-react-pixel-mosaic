import { useEffect, useRef } from "react";
import useLoading from "../hooks/useLoading"; // Utilisez votre hook de gestion de chargement

const StipplingCanvas = ({ imageSrc }) => {
  const { startLoading, endLoading, loading, error } = useLoading();
  const canvasRef = useRef(null);

  useEffect(() => {
    startLoading();

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Appliquez ici l'effet de stippling
      applyStipplingEffect(ctx, img);

      endLoading();
    };
    img.src = imageSrc;
  }, [imageSrc, startLoading, endLoading]);

  // La fonction d'application de l'effet de stippling
  function applyStipplingEffect(ctx, img) {
    // Cette fonction doit être implémentée pour appliquer l'effet
    // C'est une version simplifiée pour l'exemple
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // Exemple d'effet : Parcourir chaque pixel et appliquer un effet basé sur la luminosité
    for (let i = 0; i < data.length; i += 4) {
      const brightness =
        0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // Votre logique pour appliquer l'effet basé sur la luminosité
      // Cela peut impliquer de dessiner des points sur le canvas basé sur la luminosité
    }

    // Remettre l'image modifiée sur le canvas
    ctx.putImageData(imageData, 0, 0);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <canvas ref={canvasRef}></canvas>;
};

export default StipplingCanvas;
