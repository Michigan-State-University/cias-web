/**
 * @param  {boolean} boolean
 * @param  {any} ifTrue Value to return if `boolean` is `true`
 * @param  {any} ifFalse Value to return if `boolean` is `false`
 * @returns {any} Returns `ifTrue` or `ifFalse` depending on the `boolean`
 */
export const ternary = (boolean, ifTrue, ifFalse) =>
  boolean ? ifTrue : ifFalse;
