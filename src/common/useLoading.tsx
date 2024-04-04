/**
 *
 * @description A custom hook for managing loading states.
 *
 * @example

  function MyComponent() {
    const { loading, startLoading, endLoading, error, handleError } = useLoading();

    useEffect(() => {
      startLoading();
      fetch("https://api.example.com/data")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          // Traiter les données reçues ici
         console.log(data);
        })
        .catch(handleError) // Utilisez handleError pour attraper et gérer les erreurs
        .finally(endLoading); // Assurez-vous de terminer le chargement, qu'il y ait eu une erreur ou non
    }, []); // Dépendances vides pour exécuter une fois au montage

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>Content</div>;
  *
  */

import { useState } from "react";

type ErrorState = Error | null;

function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(null);

  const startLoading = () => {
    setError(null); // Réinitialiser l'erreur
    setLoading(true); // Commencer le chargement
  };

  const endLoading = () => {
    setLoading(false); // Terminer le chargement
  };

  const handleError = (error: Error) => {
    setError(error); // Gérer l'erreur
    setLoading(false); // Terminer le chargement même en cas d'erreur
  };

  return { loading, startLoading, endLoading, error, handleError };
}

export default useLoading;
