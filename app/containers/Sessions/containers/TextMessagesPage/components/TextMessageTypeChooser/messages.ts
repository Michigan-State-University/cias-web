import { defineMessages } from 'react-intl';

export const scope = 'app.components.TextMessageTypeChooser';

export default defineMessages({
  typeOfTheSMS: {
    id: `${scope}.typeOfTheSMS`,
    defaultMessage: 'Type of the SMS',
  },
  typeOfTheSMSTooltip: {
    id: `${scope}.typeOfTheSMSTooltip`,
    defaultMessage:
      '<h3>Information for participant</h3><p>Classic SMS that is sent to the participant after the end of the session.</p><h3>Alert for third party</h3><p>This SMS will be sent as an alert to the relevant phone numbers in case of danger to the participant.</p>',
  },
  informationForParticipantLabel: {
    id: `${scope}.informationForParticipantLabel`,
    defaultMessage: 'Information for participant',
  },
  alertForThirdPartyLabel: {
    id: `${scope}.alertForThirdPartyLabel`,
    defaultMessage: 'Alert for third party',
  },
});
