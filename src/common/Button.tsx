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
  endIcon,
  error
}) => {
  if (loading) {
    return (
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <button
      type={type}
      className={`button ${className} ${error ? "button--error" : ""}`}
      onClick={onClick}
      style={style}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {startIcon && <span className="button-icon start-icon">{startIcon}</span>}
      {text}
      {endIcon && <span className="button-icon end-icon">{endIcon}</span>}
    </button>
  );
};

export default Button;
