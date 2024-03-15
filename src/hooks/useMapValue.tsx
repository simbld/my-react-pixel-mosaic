/**
 * Maps a value from one range to another. This is done using a linear mapping formula
 * that takes into account the start and end of the input range (start1 and stop1) and
 * the start and end of the output range (start2 and stop2).
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
      const mappedValue = mapValue(value, 0, 100, 0, 1);
      return <p>{mappedValue}</p>;
 */

const mapValue = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};

export default mapValue;
