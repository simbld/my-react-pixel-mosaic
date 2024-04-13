import type { ButtonProps } from "../interfaces/types";

const Button: React.FC<ButtonProps> = ({ text, onClick, loading = false }) => {
  return (
    <button className="title-btn" onClick={onClick} disabled={loading}>
      <svg className="text-svg" viewBox="0 0 1200 300" overflow="visible">
        <defs>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="lightgrey" />
            <stop offset="100%" stopColor="dark" />
          </linearGradient>
          <linearGradient
            id="text-gradient-hover"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="black" />
            <stop offset="100%" stopColor="darkblue" />
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
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="lightgrey" />
          </linearGradient>
        </defs>
        <g transform="skewX(35)">
          <rect
            x="150"
            y="25"
            width="650"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="5"
          />
          <rect
            x="816"
            y="25"
            width="80"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="5"
          />
          <rect
            x="912"
            y="25"
            width="40"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="5"
          />
          <rect
            x="968"
            y="25"
            width="25"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="5"
          />
          <rect
            x="1009"
            y="25"
            width="15"
            height="250"
            fill="url(#arrow-gradient)"
            stroke="url(#border-gradient)"
            strokeWidth="5"
          />
        </g>
        <polygon
          points="-10,90 40,-40 70,25 150,25 327,275 205,275 230,340"
          fill="url(#arrow-gradient)"
          stroke="url(#border-gradient)"
          strokeWidth="5"
        />
        <text
          className="button-text"
          x="570"
          y="150"
          fontSize="120"
          fontFamily="'Back', sans-serif"
          fill="url(#text-gradient)"
          stroke="url(#border-gradient)"
          strokeWidth="5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {text}
        </text>
        <text
          className="button-text-hover"
          x="570"
          y="150"
          fontSize="110"
          fontFamily="'Back', sans-serif"
          fill="url(#text-gradient-hover)"
          stroke="url(#border-gradient)"
          strokeWidth="5"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ opacity: 0 }}
        >
          {text}
        </text>
      </svg>
    </button>
  );
};

export default Button;
