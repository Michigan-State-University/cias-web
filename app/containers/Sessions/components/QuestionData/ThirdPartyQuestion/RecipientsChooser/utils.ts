import { IntlShape } from 'react-intl';
import * as Yup from 'yup';
import countBy from 'lodash/countBy';
import isNil from 'lodash/isNil';

import { emailFormValidationSchema } from 'utils/validators';

import { Recipients } from './types';
import messages from './messages';

export const divideRecipients = (mixedRecipients: string): Recipients =>
  mixedRecipients.split(',').reduce<Recipients>(
    (recipients, recipient) => {
      if (recipient.includes('@')) {
        recipients.emails.push(recipient);
      } else if (recipient) {
        recipients.faxes.push(recipient);
      }
      return recipients;
    },
    {
      emails: [],
      faxes: [],
    },
  );

export const joinRecipients = ({ emails, faxes }: Recipients): string =>
  [...emails, ...faxes].filter((recipient) => recipient).join(',');

export const UNIQUE_RECIPIENTS_METHOD = 'uniqueRecipients';

export const createRecipientsFormSchema = (
  formatMessage: IntlShape['formatMessage'],
) => {
  Yup.addMethod(
    Yup.array,
    UNIQUE_RECIPIENTS_METHOD,
    // eslint-disable-next-line func-names
    function (message, oldItemsKey) {
      return (this as any).test(
        UNIQUE_RECIPIENTS_METHOD,
        message,
        // eslint-disable-next-line func-names
        function (list: string[]) {
          // @ts-ignore
          const oldItems = this.parent[oldItemsKey] ?? [];
          const counts = countBy([...list, ...oldItems]);
          const errors: Yup.ValidationError[] = [];

          list.forEach((item, index) => {
            if (!item) return;

            const count = counts[item];
            if (!isNil(count) && count > 1) {
              errors.push(
                new Yup.ValidationError(
                  message,
                  item,
                  // @ts-ignore
                  `${this.path}.${index}`,
                ),
              );
            }
          });

          // @ts-ignore
          return errors.length ? new Yup.ValidationError(errors) : true;
        },
      );
    },
  );

  return Yup.object().shape({
    oldEmails: Yup.array().of(emailFormValidationSchema),
    newEmails: Yup.array()
      .of(emailFormValidationSchema)
      // @ts-ignore
      .uniqueRecipients(
        formatMessage(messages.recipientMustBeUnique),
        'oldEmails',
      ),
    oldFaxes: Yup.array().of(Yup.string()),
    newFaxes: Yup.array()
      .of(Yup.string())
      // @ts-ignore
      .uniqueRecipients(
        formatMessage(messages.recipientMustBeUnique),
        'oldFaxes',
      ),
  });
};
