import type { ButtonProps } from "../interfaces/types";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  style,
  disabled = false,
  loading = false,
  ariaLabel,
  type = "button",
  startIcon,
  endIcon
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {startIcon && <span className="button-icon">{startIcon}</span>}
      {text}
      {endIcon && <span className="button-icon">{endIcon}</span>}
    </button>
  );
};

export default Button;
