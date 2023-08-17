import {
  hfhValueRegex,
  variableNameInTextboxRegex,
  variableNameRegex,
} from 'global/constants/regex';

export const variableNameValidator = (target) => {
  if (target === '') return true;

  return variableNameRegex.test(target);
};

export const variableNameInTextboxValidator = (target) => {
  if (target === '') return true;

  return variableNameInTextboxRegex.test(target);
};

export const hfhValueValidator = (target) => {
  if (target === '') return true;

  return hfhValueRegex.test(target);
};
