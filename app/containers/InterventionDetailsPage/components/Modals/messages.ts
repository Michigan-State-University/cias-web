import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionModals';

export default defineMessages({
  modalHeader: {
    id: `${scope}.modalHeader`,
    defaultMessage:
      'Fill the form below to give researcher access to creating CAT-MH sessions',
  },
  giveAccess: {
    id: `${scope}.giveAccess`,
    defaultMessage: 'Allow',
  },
  revokeAccess: {
    id: `${scope}.revokeAccess`,
    defaultMessage: 'Revoke',
  },
  licenseDataHeader: {
    id: `${scope}.licenseDataHeader`,
    defaultMessage: 'License information',
  },
  organizationIdLabel: {
    id: `${scope}.organizationIdLabel`,
    defaultMessage: 'CAT-MH Organization ID',
  },
  applicationIdLabel: {
    id: `${scope}.applicationIdLabel`,
    defaultMessage: 'CAT-MH Application ID',
  },
  licenseTypeHeader: {
    id: `${scope}.licenseTypeHeader`,
    defaultMessage: 'License type',
  },
  limitedTypeLabel: {
    id: `${scope}.limitedTypeLabel`,
    defaultMessage: 'Limited',
  },
  unlimitedTypeLabel: {
    id: `${scope}.unlimitedTypeLabel`,
    defaultMessage: 'Unlimited',
  },
  testNumberHeader: {
    id: `${scope}.testNumberHeader`,
    defaultMessage: 'Number of tests',
  },
  testNumberLabel: {
    id: `${scope}.testNumberLabel`,
    defaultMessage: 'Change the number of tests',
  },
  testNumberLeft: {
    id: `${scope}.testsLeft`,
    defaultMessage: `Tests left: <testNumber>{current}/{initial}</testNumber>`,
  },
  numberPlaceholder: {
    id: `${scope}.numberPlaceholder`,
    defaultMessage: 'e.g. 123456789',
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: 'Save changes',
  },
});
