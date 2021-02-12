import { currencyRegex } from 'global/constants/regex';

export const currencyValidator = target => {
  if (currencyRegex.test(target) || target === '') return true;

  return false;
};
