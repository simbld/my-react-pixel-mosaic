import type { ButtonProps } from "../interfaces/types";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  loading = false,
  fill,
  filter
}) => {
  const fillValue = fill ? fill : "url(#text-gradient)";
  const filterValue = filter ? filter : "url(#text-border)";
  return (
    <button className="title-btn" onClick={onClick} disabled={loading}>
      <svg className="text-svg" viewBox="0 0 200 50">
        <defs>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fe192d" />
            <stop offset="100%" stopColor="#feff27" />
          </linearGradient>
          <filter id="text-border" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset result="offset" dx="1" dy="1" />
            <feGaussianBlur result="blur" stdDeviation="1" />
            <feComposite
              operator="out"
              in="offset"
              in2="blur"
              result="inverse"
            />
            <feFlood floodColor="black" result="color" />
            <feComposite
              operator="in"
              in="color"
              in2="inverse"
              result="outline"
            />
            <feMerge>
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          fontSize="40" // Ajustez cette valeur selon la taille du bouton
          fontFamily="'Back', sans-serif"
          fill={fillValue}
          filter={filterValue}
        >
          {text}
        </text>
      </svg>
    </button>
  );
};

export default Button;
