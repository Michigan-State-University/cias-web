import { defineMessages } from 'react-intl';

export const scope = 'app.components.ParticipantPersonalData`';

export default defineMessages({
  participantPersonalData: {
    id: `${scope}.participantPersonalData`,
    defaultMessage: 'Participant personal data',
  },
  chooseDataType: {
    id: `${scope}.chooseDataType`,
    defaultMessage: 'Choose data type to include',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail address',
  },
});
