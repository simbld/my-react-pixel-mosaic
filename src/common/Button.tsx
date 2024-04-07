import type { ButtonProps } from "../interfaces/types";

const Button: React.FC<ButtonProps> = ({ text, onClick, loading = false }) => {
  return (
    <button className="title-btn" onClick={onClick} disabled={loading}>
      {text}
    </button>
  );
};

export default Button;
