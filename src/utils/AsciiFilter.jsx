import { useEffect, useState } from "react";
import useAsciiArt from "../hooks/useAsciiArt";
import useLoading from "../hooks/useLoading";
import useDisplay from "../types/useDisplay";

/**
 * Renders an ASCII art representation of an image.
 *
 * @param {Object} props - The component props.
 * @param {ImageData} props.imageData - The image data to convert to ASCII art.
 * @returns {JSX.Element} The rendered ASCII art.
 */

function AsciiFilter({ imageData }) {
  const { loading, startLoading, stopLoading } = useLoading();
  const [asciiArt, setAsciiArt] = useDisplay("");

  useEffect(() => {
    const generateArt = async () => {
      startLoading();
      const art = await useAsciiArt(imageData);
      setAsciiArt(art);
      stopLoading();
    };

    if (imageData) {
      generateArt();
    }
  }, [imageData, startLoading, stopLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <pre>{asciiArt}</pre>;
}

export default AsciiFilter;
