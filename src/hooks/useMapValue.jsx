/**
 * Maps a value from one range to another.
 *
 * @param {number} value - The value to map.
 * @param {number} start1 - Start of value range.
 * @param {number} stop1 - End of value range.
 * @param {number} start2 - Start of output value range.
 * @param {number} stop2 - End of output value range.
 * @returns {number} The mapped value.
 * 
 *  @example
      function MyComponent({ value }) {
      const mappedValue = useMapValue(value, 0, 100, 0, 1);
      return <p>{mappedValue}</p>;

 */

import { useState, useEffect } from "react";

function useMapValue(value, start1, stop1, start2, stop2) {
  const [mappedValue, setMappedValue] = useState(0);

  useEffect(() => {
    const newValue =
      start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    setMappedValue(newValue);
  }, [value, start1, stop1, start2, stop2]);

  return mappedValue;
}

export default useMapValue;
