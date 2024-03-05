/**
 * useLoading.jsx
 *
 * @version 1.0.0
 *
 * @description A custom hook for managing loading states.
 *
 * @example
 * import { useEffect } from "react";
 * import useLoading from "../hooks/useLoading";
 *
 *   function MyComponent() {
 *    const { loading, startLoading, endLoading, error, handleError } = useLoading();
 *
 *   useEffect(() => {
 *    startLoading();
 *   fetch("https://api.example.com/data")
 *   .then((response) => response.json())
 *   .then((data) => {
 *
 *   endLoading();
 *   })
 */

import { useState } from "react";

function useLoading() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const startLoading = () => {
    setError(null);
    setLoading(true);
  };

  const endLoading = () => setLoading(false);

  const handleError = (error) => {
    setError(error);
    setLoading(false);
  };

  return { loading, startLoading, endLoading, error, handleError };
}

export default useLoading;
