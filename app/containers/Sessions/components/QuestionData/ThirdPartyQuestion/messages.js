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
});
