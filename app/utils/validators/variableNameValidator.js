import { variableNameRegex } from 'global/constants/regex';

export const variableNameValidator = target => {
  if (variableNameRegex.test(target) || target === '') return true;

  return false;
};
