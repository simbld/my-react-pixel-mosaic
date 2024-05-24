import type { LoaderProps } from "../../interfaces/types";

/**
 * Loader est un composant React qui affiche une animation de chargement composée de plusieurs barres.
 * @param {LoaderProps} props - Les propriétés du composant.
 * @param {number} [props.barCount=9] - Le nombre de barres à afficher dans le loader.
 * @param {string} [props.color='rgba(184, 163, 175, 0.529)'] - La couleur des barres du loader.
 * @returns {JSX.Element} Un élément JSX représentant le loader.
 */
const Loader: React.FC<LoaderProps> = ({ barCount = 9 }) => {
  const bars = Array.from({ length: barCount });

  return (
    <div className="loader">
      {bars.map((_, index) => (
        <span key={index} className="loader-bar"></span>
      ))}
    </div>
  );
};

export default Loader;
