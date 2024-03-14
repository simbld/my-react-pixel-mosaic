/**
 * Renders an ASCII art representation of an image.
 *
 * @param {Object} props - The component props.
 * @param {ImageData} props.imageData - The image data to convert to ASCII art.
 * @returns {JSX.Element} The rendered ASCII art.
 */

import { useEffect, useRef } from "react";
import useAsciiArt from "../../hooks/useAsciiArt";
import useLoading from "../../hooks/useLoading";
import { AsciiFilterProps } from "../../interfaces/prop-types";

const AsciiFilter: React.FC<AsciiFilterProps> = ({ asciiFilter }) => {
  const { loading: asciiLoading, startLoading, endLoading } = useLoading();
  const canvasRef = useRef<HTMLCanvasElement>(null); // Référence pour un canvas non affiché
  const { asciiArt, loading, error } = useAsciiArt(canvasRef, asciiFilter); // Utilisez les props correctement

  useEffect(() => {
    // Vous pouvez utiliser asciiLoading pour le chargement global si nécessaire
    if (loading) startLoading();
    else endLoading();
  }, [loading, startLoading, endLoading]);

  if (loading) {
    return (
      <div className="pl">
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__text">Loading…</div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <pre>{asciiArt}</pre>; // Affichage de l'art ASCII
};

export default AsciiFilter;
