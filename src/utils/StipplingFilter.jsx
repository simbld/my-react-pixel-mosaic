import useStipplingEffect from "../hooks/useStipplingEffect";
import useLoading from "../hooks/useLoading";
import { useEffect } from "react";

function StipplingFilter({ image }) {
  const canvasRef = useStipplingEffect(image);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const applyEffect = async () => {
      startLoading();
      await canvasRef.current.applyEffect(image);
      stopLoading();
    };

    if (image) {
      applyEffect();
    }
  }, [image, canvasRef, startLoading, stopLoading]);

  if (loading) {
    return (
      <div className="loader">
        <div data-glitch="Loading..." className="glitch">
          Loading...
        </div>
        {/* Vous pouvez ajouter ici un message ou une image */}
      </div>
    );
  }

  return <canvas ref={canvasRef} />;
}

export default StipplingFilter;
