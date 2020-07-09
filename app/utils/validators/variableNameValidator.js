const regex = /^[a-zA-Z0-9_\b]+$/;

export const variableNameValidator = target => {
  if (regex.test(target) || target === '') return true;

  return false;
};
