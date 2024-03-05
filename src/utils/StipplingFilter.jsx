import useStipplingEffect from "../hooks/useStipplingEffect";
import useLoading from "../hooks/useLoading";

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
    return <div>Loading...</div>;
  }

  return <canvas ref={canvasRef} />;
}

export default StipplingFilter;
