import { InterlocutorNameData } from 'models/LiveChat';

export const formatInterlocutorName = (
  interlocutorNameData: Nullable<InterlocutorNameData>,
) => {
  if (!interlocutorNameData) return '?';

  const { firstName, lastName, userId } = interlocutorNameData;
  const formattedName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  if (formattedName.length === 0) return `ID: ${userId}`;

  return formattedName;
};
