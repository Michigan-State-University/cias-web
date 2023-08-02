import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ThirdParty';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Third Party {index}',
  },
  addAnswer: {
    id: `${scope}.addAnswer`,
    defaultMessage: 'Add new Third Party',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Email(s)',
  },
  emailError: {
    id: `${scope}.emailError`,
    defaultMessage:
      'Please enter email(s) in the following format, email1@example.com,email2@example.com',
  },
  reportsToSend: {
    id: `${scope}.reportsToSend`,
    defaultMessage: 'Reports to send',
  },
  noThirdPartyReports: {
    id: `${scope}.noThirdPartyReports`,
    defaultMessage: 'There are no third party reports in this session',
  },
  addNewReport: {
    id: `${scope}.addNewReport`,
    defaultMessage: 'Add new report',
  },
  zeroReportChosen: {
    id: `${scope}.zeroReportChosen`,
    defaultMessage: 'No reports were chosen for that answer',
  },
  reorderIconAlt: {
    id: `${scope}.reorderIconAlt`,
    defaultMessage: 'Reorder icon {index}',
  },
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
});
