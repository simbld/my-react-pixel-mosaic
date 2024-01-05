/**
 * Maps a value from one range to another.
 *
 * @param {number} value - The value to map.
 * @param {number} start1 - Start of value range.
 * @param {number} stop1 - End of value range.
 * @param {number} start2 - Start of output value range.
 * @param {number} stop2 - End of output value range.
 * @returns {number} The mapped value.
 */

function mapValue(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

export default mapValue;
