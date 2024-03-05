import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Creates and configures a canvas for a given image.
 *
 * @param {string} image - Image à dessiner sur le canvas.
 * @param {number} width - Largeur du canvas.
 * @param {number} height - Hauteur du canvas.
 * @returns {JSX.Element} Élément canvas.
 * 
 *  @example
      function MyComponent({ image, width, height }) {
      return <CanvasComponent image={image} width={width} height={height} />;
 */

function CanvasComponent({ image, width, height }) {
  const canvasRef = useRef(null);

  return <canvas ref={canvasRef} />;
}

CanvasComponent.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default CanvasComponent;
