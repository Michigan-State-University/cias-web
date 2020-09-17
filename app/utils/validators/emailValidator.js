import * as Yup from 'yup';

export const emailValidator = Yup.string().email();
