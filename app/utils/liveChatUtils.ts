import { Interlocutor } from 'models/LiveChat';

export const formatInterlocutorName = (
  interlocutor: Nullable<Interlocutor>,
) => {
  if (!interlocutor) return '?';

  const { firstName, lastName, userId } = interlocutor;
  const formattedName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  if (formattedName.length === 0) return `ID: ${userId}`;

  return formattedName;
};
