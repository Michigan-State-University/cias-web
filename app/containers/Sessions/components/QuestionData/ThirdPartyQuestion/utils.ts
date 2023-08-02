import { Recipients } from './types';

export const divideRecipients = (mixedRecipients: string): Recipients =>
  mixedRecipients.split(',').reduce<Recipients>(
    (recipients, recipient) => {
      if (recipient.includes('@')) {
        recipients.emails.push(recipient);
      } else {
        recipients.faxes.push(recipient);
      }
      return recipients;
    },
    {
      emails: [],
      faxes: [],
    },
  );
