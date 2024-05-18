/**
 * 
 * @module useError

const MyComponent = () => {
  const { error, setError, displayError } = useError();

  useEffect(() => {
    // Simuler une opération qui pourrait échouer
    try {
      throw new Error("Un problème est survenu");
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Erreur inattendue"));
    }
  }, [setError]);

  useEffect(() => {
    // Afficher l'erreur si elle existe
    if (error) {
      displayError();
    }
  }, [error, displayError]);
    
*/

import { useState, useCallback } from "react";
import { UseErrorReturnProps } from "../../interfaces/types";
import { toast } from "react-toastify";

const useError = (): UseErrorReturnProps => {
  const [error, setError] = useState<Error | null>(null);

  const displayError = useCallback(() => {
    if (error) {
      toast.error(`Erreur : ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => clearError()
      });
      //  setError(null); // Réinitialiser l'erreur après l'affichage
    }
  }, [error]);
  // L'utilisateur peut appeler cette fonction pour réinitialiser l'erreur
  const clearError = useCallback(() => setError(null), []);

  return { error, setError, displayError, clearError };
};

export default useError;
