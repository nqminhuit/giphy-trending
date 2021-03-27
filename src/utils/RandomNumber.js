/**
 * @param {number} min
 * @param {number} max
 * @returns {number} random number from min to max inclusively
 */
export function randomNumber(min, max) {
  return Math.floor((Math.random() * max) + min);
}
