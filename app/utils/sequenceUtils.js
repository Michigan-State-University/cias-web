import max from 'lodash/max';

/**
 * @readonly
 * @enum {number}
 */
export const CalculationStrategy = {
  NEXT_VALUE: 0,
  HIGHEST_VALUE: 1,
};

/**
 * Generates value based on provided sequence
 * @param  {Array<number>} valuesSequence
 * @param  {CalculationStrategy}[strategy]
 * @returns {number}
 */
export const calculateNextValue = (valuesSequence, strategy) => {
  if (!valuesSequence || !valuesSequence.length) return 1;

  switch (strategy) {
    case CalculationStrategy.NEXT_VALUE:
      return nextValueStrategy(valuesSequence);
    case CalculationStrategy.HIGHEST_VALUE:
    default:
      return highestValueStrategy(valuesSequence);
  }
};

const nextValueStrategy = (valuesSequence) => {
  let { length: value } = valuesSequence;
  do {
    value += 1;
  } while (valuesSequence.includes(`${value}`));
  return value;
};

const highestValueStrategy = (valuesSequence) => max(valuesSequence) + 1;

/**
 * Generates uniq variable based on provided sequence
 * @param  {Array<string>} valuesSequence
 * @returns {string}
 */
export const getUniqVariable = (valuesSequence, baseVariable) => {
  if (!valuesSequence || !valuesSequence.length) return baseVariable;
  let variable = baseVariable;
  let index = 0;
  do {
    if (!valuesSequence.includes(variable)) return variable;
    index += 1;
    variable = `${baseVariable}_${index}`;
  } while (true);
};
