import { useEffect, useState, useRef } from "react";
import useAsciiArt from "../hooks/useAsciiArt"; // Assurez-vous que ce chemin est correct
import useLoadAndProcessImage from "../hooks/useLoadAndProcessImage"; // Et celui-ci aussi
import { AsciiArtCanvasProps } from "../interfaces/prop-types";

const AsciiArtCanvas = ({ asciiArtCanvas }: AsciiArtCanvasProps) => {
  const canvasRef = useLoadAndProcessImage(asciiArtCanvas);
  const { asciiArt, loading, error } = useAsciiArt(canvasRef, asciiArtCanvas);

  // Logique supplémentaire pour gérer l'affichage de l'art ASCII

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  return <pre>{asciiArt}</pre>;
};

export default AsciiArtCanvas;
