import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ThirdParty.components.RecipientsChooser';

export default defineMessages({
  manageRecipients: {
    id: `${scope}.manageRecipients`,
    defaultMessage: 'Manage recipients',
  },
  emailRecipients: {
    id: `${scope}.emailRecipients`,
    defaultMessage: 'E-mail recipients',
  },
  noEmailRecipients: {
    id: `${scope}.noEmailRecipients`,
    defaultMessage: 'No e-mail recipients',
  },
  faxRecipients: {
    id: `${scope}.faxRecipients`,
    defaultMessage: 'Fax recipients',
  },
  noFaxRecipients: {
    id: `${scope}.noFaxRecipients`,
    defaultMessage: 'No fax recipients',
  },
  manageRecipientsModalDefaultTitle: {
    id: `${scope}.manageRecipientsModalDefaultTitle`,
    defaultMessage: 'Unlabelled answer',
  },
  manageRecipientsModalDescription: {
    id: `${scope}.manageRecipientsModalDescription`,
    defaultMessage: 'Determine where you want reports to be sent.',
  },
  deleteRecipient: {
    id: `${scope}.deleteRecipient`,
    defaultMessage: 'Delete recipient',
  },
  recipientMustBeUnique: {
    id: `${scope}.recipientMustBeUnique`,
    defaultMessage: 'Each recipient must be unique',
  },
  addNewEmail: {
    id: `${scope}.addNewEmail`,
    defaultMessage: '+ Add new e-mail',
  },
  addNewFax: {
    id: `${scope}.addNewFax`,
    defaultMessage: '+ Add new fax number',
  },
  enterEmailAddress: {
    id: `${scope}.enterEmailAddress`,
    defaultMessage: 'Enter e-mail address',
  },
  enterFax: {
    id: `${scope}.enterFax`,
    defaultMessage: 'Enter fax number',
  },
});
