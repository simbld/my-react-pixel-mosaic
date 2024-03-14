import { useErrorContext } from "../contexts/ErrorContext";

const ErrorMessage: React.FC = () => {
  const { error, clearError } = useErrorContext();

  if (!error) return null;

  return (
    <div className="error-message">
      {error.message}
      <button onClick={clearError}>Fermer</button>
    </div>
  );
};

export default ErrorMessage;
