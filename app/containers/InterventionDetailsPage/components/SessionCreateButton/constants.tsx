import { SessionTypes } from 'models/Session';
import messages from './messages';

type SessionTypesCard = {
  title: string;
  type: SessionTypes;
  description: string;
};

export const prepareSessionTypes = (
  formatMessage: any,
  canCreateCatSession: boolean,
): SessionTypesCard[] => {
  if (canCreateCatSession) {
    return [
      {
        title: formatMessage(messages.classicSession),
        type: SessionTypes.CLASSIC_SESSION,
        description: formatMessage(messages.classicSessionDescription),
      },
      {
        title: formatMessage(messages.smsSession),
        type: SessionTypes.SMS_SESSION,
        description: formatMessage(messages.smsSessionDescription),
      },
      {
        title: formatMessage(messages.catSession),
        type: SessionTypes.CAT_SESSION,
        description: formatMessage(messages.catSessionDescription),
      },
    ];
  }
  return [
    {
      title: formatMessage(messages.classicSession),
      type: SessionTypes.CLASSIC_SESSION,
      description: formatMessage(messages.classicSessionDescription),
    },
    {
      title: formatMessage(messages.smsSession),
      type: SessionTypes.SMS_SESSION,
      description: formatMessage(messages.smsSessionDescription),
    },
  ];
};
