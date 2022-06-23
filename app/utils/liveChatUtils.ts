import { Interlocutor } from 'models/LiveChat';

export const formatInterlocutorName = (
  interlocutor: Nullable<Interlocutor>,
) => {
  if (!interlocutor) return '?';

  const { id, firstName, lastName } = interlocutor;
  const formattedName = `${firstName ?? ''} ${lastName ?? ''}`;

  if (formattedName.trim().length === 0) return `ID: ${id}`;

  return formattedName;
};
