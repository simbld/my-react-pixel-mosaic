import type { LoaderProps } from "../../interfaces/types";

const Loader: React.FC<LoaderProps> = ({
  barCount = 9,
  color = "rgba(148, 148, 148, 0.5)"
}) => {
  const bars = Array.from({ length: barCount });

  return (
    <div className="loader">
      {bars.map((_, index) => (
        <span
          key={index}
          className="loader-bar"
          style={{ backgroundColor: color }}
        ></span>
      ))}
    </div>
  );
};

export default Loader;
