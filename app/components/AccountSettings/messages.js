/*
 * AccountSettings Messages
 *
 * This contains all the text for the AccountSettings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AccountSettings';

export default defineMessages({
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
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Enter your password',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'Your old password',
  },
  oldPasswordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Old password',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Your new password',
  },
  newPasswordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'New password',
  },
  newPasswordConfirmation: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Confirm your new password',
  },
  newPasswordConfirmationLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Confirmation',
  },
  confirmPasswordLabel: {
    id: `${scope}.confirmPasswordLabel`,
    defaultMessage: 'Password confirmation',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Retype your password',
  },
  oldPasswordRequired: {
    id: `${scope}.oldPasswordRequired`,
    defaultMessage: 'Old password is required',
  },
  newPasswordRequired: {
    id: `${scope}.newPasswordRequired`,
    defaultMessage: 'New password is required',
  },
  passwordLength: {
    id: `${scope}.passwordLength`,
    defaultMessage: 'Password must have at least {length} characters',
  },
  passwordInvalid: {
    id: `${scope}.passwordInvalid`,
    defaultMessage:
      'Capital letter, small letter, special character and digit are required',
  },
  passwordMatch: {
    id: `${scope}.passwordMatch`,
    defaultMessage: 'Password must match',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Reset password',
  },
  changeAvatar: {
    id: `${scope}.changeAvatar`,
    defaultMessage: 'Change profile photo',
  },
  addAvatar: {
    id: `${scope}.addAvatar`,
    defaultMessage: 'Add profile photo',
  },
  removeAvatar: {
    id: `${scope}.removeAvatar`,
    defaultMessage: 'Remove profile photo',
  },
  removeConfirmation: {
    id: `${scope}.removeConfirmation`,
    defaultMessage: 'Are you sure you want to remove your profile photo?',
  },
  timeZoneLabel: {
    id: `${scope}.timeZoneLabel`,
    defaultMessage: 'Time zone',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Enter e-mail address',
  },
  phoneNumberLabel: {
    id: `${scope}.phoneNumberLabel`,
    defaultMessage: 'Phone number',
  },
  phoneNumberPrefixLabel: {
    id: `${scope}.phoneNumberPrefixLabel`,
    defaultMessage: 'Phone prefix',
  },
  countryCode: {
    id: `${scope}.countryCode`,
    defaultMessage: 'Code',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Enter phone number',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Reset your password',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required',
  },
  phoneNumberRequired: {
    id: `${scope}.phoneNumberRequired`,
    defaultMessage: 'Phone number is required',
  },
  phoneNumberCodeRequired: {
    id: `${scope}.phoneNumberCodeRequired`,
    defaultMessage: 'Code is required',
  },
  phoneNumberInvalid: {
    id: `${scope}.phoneNumberInvalid`,
    defaultMessage: 'Phone number is invalid',
  },
  firstNameRequired: {
    id: `${scope}.firstNameRequired`,
    defaultMessage: 'First name is required',
  },
  lastNameRequired: {
    id: `${scope}.lastNameRequired`,
    defaultMessage: 'Last name is required',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  changeEmail: {
    id: `${scope}.changeEmail`,
    defaultMessage: 'Change e-mail',
  },
  changeYourEmail: {
    id: `${scope}.changeYourEmail`,
    defaultMessage: 'Change your e-mail',
  },
  changeYourPhoneNumber: {
    id: `${scope}.changeYourPhoneNumber`,
    defaultMessage: 'Change your phone number',
  },
  modalDescription: {
    id: `${scope}.modalDescription`,
    defaultMessage:
      'In order to change your e-mail you have to confirm it by providing your password.',
  },
  modalPhoneNumberDescription: {
    id: `${scope}.modalPhoneNumberDescription`,
    defaultMessage:
      'In order to change your phone number you have to confirm it by providing the code that was sent to you.',
  },
  activate: {
    id: `${scope}.activate`,
    defaultMessage: 'Activate account',
  },
  deactivate: {
    id: `${scope}.deactivate`,
    defaultMessage: 'Deactivate account',
  },
  resendInvitationLink: {
    id: `${scope}.resendInvitationLink`,
    defaultMessage: 'Resend invitation link',
  },
  confirmCode: {
    id: `${scope}.confirmCode`,
    defaultMessage: 'Confirm your phone number',
  },
  confirmCodeButton: {
    id: `${scope}.confirmCodeButton`,
    defaultMessage: 'Confirm phone number',
  },
  code: {
    id: `${scope}.code`,
    defaultMessage: 'Code from SMS',
  },
  codeRequired: {
    id: `${scope}.codeRequired`,
    defaultMessage: 'Code is required',
  },
  codeInfo: {
    id: `${scope}.codeInfo`,
    defaultMessage:
      'In a moment, you should receive a text message with the code on your phone number <b>{phone}</b>. <br/> Enter the code you received into the form below to confirm the identity of the number.',
  },
  resendCode: {
    id: `${scope}.resendCode`,
    defaultMessage: 'Resend verification code',
  },
  incorrectOldPassword: {
    id: `${scope}.incorrectOldPassword`,
    defaultMessage: 'Provided old password is not correct',
  },
});
