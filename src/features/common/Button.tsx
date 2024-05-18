import type { ButtonProps } from "../../interfaces/types";
import { useState } from "react";

const Button: React.FC<ButtonProps> = ({ text, onClick, loading = false }) => {
  const [textOpacity, setTextOpacity] = useState(1);
  const [textHoverOpacity, setTextHoverOpacity] = useState(0);

  return (
    <button
      className="title-btn"
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => {
        setTextHoverOpacity(1);
        setTextOpacity(0);
      }}
      onMouseLeave={() => {
        setTextHoverOpacity(0);
        setTextOpacity(1);
      }}
    >
      <svg className="text-svg" viewBox="0 0 1200 300" overflow="visible">
        <defs>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="grey" />
            <stop offset="100%" stopColor="purple" />
          </linearGradient>
          <linearGradient
            id="text-gradient-hover"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="purple" />
            <stop offset="100%" stopColor="grey" />
          </linearGradient>
          <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor="yellow" />
          </linearGradient>
          <linearGradient
            id="border-gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="lightgrey" />
            <stop offset="100%" stopColor="darkgrey" />
          </linearGradient>
        </defs>
        <g transform="skewX(35)">
          <rect
            className="arrow-group-1"
            x="150"
            y="25"
            width="650"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="10"
          />
          <rect
            className="arrow-group-2"
            x="816"
            y="25"
            width="80"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="10"
          />
          <rect
            className="arrow-group-3"
            x="912"
            y="25"
            width="40"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="10"
          />
          <rect
            className="arrow-group-4"
            x="968"
            y="25"
            width="25"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="10"
          />
          <rect
            className="arrow-group-5"
            x="1009"
            y="25"
            width="15"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="10"
          />
        </g>
        <polygon
          className="arrow-group-0"
          points="-10,90 40,-40 70,25 150,25 327,275 205,275 230,340"
          fill="url(#arrow-gradient)"
          stroke="url(#border-gradient)"
          strokeWidth="10"
        />
        <text
          className="button-text"
          x="585"
          y="160"
          fontSize="100"
          fontFamily="'Back', sans-serif"
          fill="url(#text-gradient)"
          stroke="url(#border-gradient)"
          strokeWidth="5"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ opacity: textOpacity }}
        >
          {text}
        </text>
        <text
          className="button-text-hover"
          x="530"
          y="150"
          fontSize="100"
          fontFamily="'Back', sans-serif"
          fill="url(#text-gradient-hover)"
          stroke="url(#border-gradient)"
          strokeWidth="5"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ opacity: textHoverOpacity }}
        >
          ENTER
        </text>
      </svg>
    </button>
  );
};

export default Button;
