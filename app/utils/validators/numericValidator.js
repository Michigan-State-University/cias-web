import { numericRegex } from 'global/constants/regex';

export const numericValidator = (target) => {
  if (numericRegex.test(target) || target === '') return true;

  return false;
};
