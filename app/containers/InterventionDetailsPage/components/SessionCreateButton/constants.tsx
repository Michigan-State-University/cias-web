import { CLASSIC_SESSION, CAT_SESSION } from 'models/Session/constants';
import messages from './messages';

type SessionTypes = {
  title: string;
  type: string;
  description: string;
};

export const prepareSessionTypes = (formatMessage: any): SessionTypes[] => [
  {
    title: formatMessage(messages.classicSession),
    type: CLASSIC_SESSION,
    description: formatMessage(messages.classicSessionDescription),
  },
  {
    title: formatMessage(messages.catSession),
    type: CAT_SESSION,
    description: formatMessage(messages.catSessionDescription),
  },
];
