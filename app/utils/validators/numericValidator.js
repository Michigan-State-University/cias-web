const regex = /^[0-9\b]+$/;

export const numericValidator = target => {
  if (regex.test(target) || target === '') return true;

  return false;
};
