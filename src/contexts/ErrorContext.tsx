import { createContext, useContext, ReactNode } from "react";
import useError from "../features/common/useError";
import { ErrorContextTypeProps } from "../interfaces/types";

// Création du contexte avec une valeur par défaut
const ErrorContext = createContext<ErrorContextTypeProps | undefined>(
  undefined
);

// Hook personnalisé pour utiliser le contexte
export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};

// Composant fournisseur du contexte
export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const errorHandlers = useError();

  return (
    <ErrorContext.Provider value={errorHandlers}>
      {children}
    </ErrorContext.Provider>
  );
};
