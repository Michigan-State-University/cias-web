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
    defaultMessage: 'Register {role} account',
  },
  termsRequired: {
    id: `${scope}.termsRequired`,
    defaultMessage: 'You need to accept terms and conditions',
  },
  termsAndConditions: {
    id: `${scope}.termsAndConditions`,
    defaultMessage: 'Terms and conditions',
  },
  termsAndConditionsText: {
    id: `${scope}.termsAndConditionsText`,
    defaultMessage: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et finibus risus. Donec sagittis in enim quis cursus. Integer dapibus consequat libero a tempus. Proin dignissim aliquam nibh, sed commodo eros vulputate vitae. Phasellus gravida lorem at nisl efficitur, ac egestas risus dictum. Etiam ipsum turpis, feugiat ut consectetur vitae, convallis eget felis. Ut sollicitudin, eros nec iaculis tristique, libero est malesuada lorem, ut gravida felis lacus interdum leo.

    Maecenas dictum est in mattis pharetra. Donec venenatis et ligula at imperdiet. Nunc vitae metus id metus vehicula euismod. Maecenas ultrices luctus odio vel pulvinar. Maecenas at est faucibus, mollis leo mattis, mollis diam. Donec fringilla nisl eu nunc sodales, a rhoncus elit porta. In hac habitasse platea dictumst. Pellentesque placerat arcu non volutpat finibus. Proin venenatis et leo tristique malesuada.

    Mauris aliquet bibendum tellus, nec euismod velit porttitor vel. Quisque sit amet venenatis turpis. Vivamus non lacinia orci. Mauris sed suscipit ante. Nunc vitae augue varius, posuere eros vel, ultricies est. Cras semper scelerisque erat scelerisque finibus. Quisque nisl sem, placerat vulputate vulputate eget, viverra sed dui. Sed maximus non velit a pellentesque. Cras eu facilisis mi, quis faucibus neque. Curabitur arcu massa, porttitor a massa vitae, facilisis tempor lacus. Mauris eros turpis, consectetur vel euismod ut, facilisis vel urna.

    Nulla facilisi. Suspendisse tempus dui sodales leo aliquam lobortis. Morbi maximus eu quam posuere dapibus. Morbi nibh velit, pharetra eu elit quis, tempus luctus magna. Pellentesque egestas feugiat purus, sit amet sodales felis ultrices et. Donec velit libero, fringilla id imperdiet eget, rutrum id enim. Donec pharetra libero est, in faucibus leo efficitur id. Nullam non malesuada mi. Donec metus velit, dictum vel sollicitudin eget, molestie in neque. Quisque eu lorem et velit feugiat vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tristique in risus in malesuada.

    Duis a libero risus. Pellentesque gravida mattis dui tincidunt consectetur. Curabitur ullamcorper, turpis quis rutrum semper, tortor enim porttitor orci, vitae scelerisque quam mauris id leo. Suspendisse a massa interdum, vestibulum enim et, lacinia diam. Proin non dictum leo, vel tincidunt dolor. Pellentesque sed ultrices velit. Sed a imperdiet metus. Mauris congue urna sit amet molestie lacinia. Morbi in facilisis felis, in suscipit sem. Nulla gravida ligula eu massa mollis pellentesque. Suspendisse potenti. Suspendisse potenti.`,
  },
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'Accept',
  },
});
