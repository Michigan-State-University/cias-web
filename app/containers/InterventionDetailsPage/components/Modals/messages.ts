import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionModals';

export default defineMessages({
  giveAccess: {
    id: `${scope}.giveAccess`,
    defaultMessage: 'Allow access',
  },
  revokeAccess: {
    id: `${scope}.revokeAccess`,
    defaultMessage: 'Revoke access',
  },
  licenseDataHeader: {
    id: `${scope}.licenseDataHeader`,
    defaultMessage: 'License information',
  },
  organizationIdLabel: {
    id: `${scope}.organizationIdLabel`,
    defaultMessage: 'CAT-MH™ Organization ID',
  },
  applicationIdLabel: {
    id: `${scope}.applicationIdLabel`,
    defaultMessage: 'CAT-MH™ Application ID',
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
    defaultMessage: `Tests left: <primaryColor>{current}/{initial}</primaryColor>`,
  },
  numberPlaceholder: {
    id: `${scope}.numberPlaceholder`,
    defaultMessage: 'e.g. 123456789',
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: 'Save changes',
  },
  thirdPartyToolsAccessModalTitle: {
    id: `${scope}.thirdPartyToolsAccessModalTitle`,
    defaultMessage: 'Access to 3rd party tools',
  },
  catMhLabel: {
    id: `${scope}.catMhLabel`,
    defaultMessage: 'CAT-MH',
  },
  henryFordLabel: {
    id: `${scope}.henryFordLabel`,
    defaultMessage: 'Henry Ford',
  },
  hfhsRevokeAccess: {
    id: `${scope}.hfhsRevokeAccess`,
    defaultMessage: 'Revoke access',
  },
  hfhsGiveAccess: {
    id: `${scope}.hfhsGiveAccess`,
    defaultMessage: 'Allow access',
  },
});
