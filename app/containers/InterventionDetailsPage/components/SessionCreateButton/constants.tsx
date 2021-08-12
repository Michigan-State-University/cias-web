import { SessionTypes } from 'models/Session/SessionDto';
import messages from './messages';

type SessionTypesCard = {
  title: string;
  type: SessionTypes;
  description: string;
};

export const prepareSessionTypes = (formatMessage: any): SessionTypesCard[] => [
  {
    title: formatMessage(messages.classicSession),
    type: SessionTypes.CLASSIC_SESSION,
    description: formatMessage(messages.classicSessionDescription),
  },
  {
    title: formatMessage(messages.catSession),
    type: SessionTypes.CAT_SESSION,
    description: formatMessage(messages.catSessionDescription),
  },
];
