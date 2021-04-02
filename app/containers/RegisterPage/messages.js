/*
 * RegisterPage Messages
 *
 * This contains all the text for the RegisterPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RegisterPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Register participant account',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'I already have an account',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'First Name',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Enter first name',
  },
  lastNameLabel: {
    id: `${scope}.lastNameLabel`,
    defaultMessage: 'Last name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Enter last name',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Enter e-mail address',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Enter password',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  confirmPasswordLabel: {
    id: `${scope}.confirmPasswordLabel`,
    defaultMessage: 'Password confirmation',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Retype your password',
  },
  validEmail: {
    id: `${scope}.validEmail`,
    defaultMessage: 'Provide valid email',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Password is required',
  },
  passwordLength: {
    id: `${scope}.passwordLength`,
    defaultMessage: 'Password must have at least {length} characters',
  },
  passwordInvalid: {
    id: `${scope}.passwordInvalid`,
    defaultMessage:
      "Password must contain capital letter, small letter, digit and special character (for example !@#$%^&*\"-+=`~:;|',.?\\\\/[]()<>'{}')",
  },
  passwordMatch: {
    id: `${scope}.passwordMatch`,
    defaultMessage: 'Password must match',
  },
  firstNameRequired: {
    id: `${scope}.firstNameRequired`,
    defaultMessage: 'First name is required',
  },
  lastNameRequired: {
    id: `${scope}.lastNameRequired`,
    defaultMessage: 'First name is required',
  },
  createdAccount: {
    id: `${scope}.createdAccount`,
    defaultMessage: 'Your account has been created',
  },
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Registration',
  },
  headerInvite: {
    id: `${scope}.headerInvite`,
    defaultMessage: 'Register researcher account',
  },
});
