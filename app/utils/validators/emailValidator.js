import { string } from 'yup';

export const emailValidator = target =>
  string()
    .required()
    .email()
    .isValidSync(target);
