import { formatIncompletePhoneNumber } from 'libphonenumber-js';

import { PhoneAttributes } from 'models/Phone';

export const formatPhone = (phoneAttributes: PhoneAttributes): string => {
  const { prefix, number, iso } = phoneAttributes;
  return `${prefix} ${formatIncompletePhoneNumber(number, iso)}`;
};
