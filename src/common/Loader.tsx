import type { LoaderProps } from "../interfaces/types";

const Loader: React.FC<LoaderProps> = ({
  barCount = 9,
  color = "rgba(148, 148, 148, 0.5)"
}) => {
  return (
    <div className="loader">
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
      <span className="loader-bar"></span>
    </div>
  );
};

export default Loader;
