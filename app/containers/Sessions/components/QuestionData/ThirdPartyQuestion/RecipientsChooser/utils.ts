import { IntlShape } from 'react-intl';
import * as Yup from 'yup';
import countBy from 'lodash/countBy';
import isNil from 'lodash/isNil';

import { requiredEmailFormValidationSchema } from 'utils/validators';

import { Recipients, RecipientsFormValues } from './types';
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
  [...emails, ...faxes].join(',');

export const UNIQUE_RECIPIENTS_METHOD = 'uniqueRecipients';

export const createRecipientsFormSchema = (
  formatMessage: IntlShape['formatMessage'],
) => {
  // eslint-disable-next-line func-names
  Yup.addMethod(Yup.array, UNIQUE_RECIPIENTS_METHOD, function (message) {
    return (this as any).test(
      UNIQUE_RECIPIENTS_METHOD,
      message,
      // eslint-disable-next-line func-names
      function (list: RecipientsFormValues['emails']) {
        const counts = countBy(list, ({ value }) => value);
        const errors: Yup.ValidationError[] = [];

        list.forEach((item, index) => {
          const { value } = item;
          if (!value) return;

          const count = counts[value];
          if (!isNil(count) && count > 1) {
            errors.push(
              new Yup.ValidationError(
                message,
                value,
                // @ts-ignore
                `${this.path}.${index}.value`,
              ),
            );
          }
        });

        // @ts-ignore
        return errors.length ? new Yup.ValidationError(errors) : true;
      },
    );
  });

  return Yup.object().shape({
    emails: Yup.array()
      .of(
        Yup.object({
          old: Yup.boolean(),
          value: requiredEmailFormValidationSchema,
        }),
      )
      // @ts-ignore
      .uniqueRecipients(formatMessage(messages.recipientMustBeUnique)),
  });
};
