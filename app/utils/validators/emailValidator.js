import { string } from 'yup';

export const emailValidator = target =>
  string()
    .email()
    .isValidSync(target);
