/**
 * Custom hook to manage the display value
 * 
 * @param {string} initialValue - The initial value of the display.
 * @returns {Array} The display and the setter.
 * 
 *  @example
      function MyComponent() {
      const [display, setDisplay] = useDisplay("Hello, world!");
      return (
        <div>
          <p>{display}</p>
          <button onClick={() => setDisplay("Goodbye, world!")}>Change</button>
        </div>
      );
  
 */

import { useState, useEffect } from "react";

type DisplayHook = [
  string,
  (value: string) => Promise<void>,
  string | null,
  boolean
];

const useDisplay = (initialValue: string = ""): DisplayHook => {
  const [display, setDisplay] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof initialValue !== "string") {
      setError("The initial value must be a string");
    } else {
      setError(null);
    }
  }, [initialValue]);

  const setDisplayAsync = async (value: string): Promise<void> => {
    setLoading(true);
    try {
      setDisplay(value);
      setError(null);
    } catch (error: any) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return [display, setDisplayAsync, error, loading];
};

export default useDisplay;
