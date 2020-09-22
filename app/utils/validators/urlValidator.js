import { urlRegex } from 'global/constants/regex';

export const urlValidator = target => urlRegex.test(target) || target === '';
