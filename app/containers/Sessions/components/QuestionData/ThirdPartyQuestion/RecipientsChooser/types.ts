import { CountryCode } from 'libphonenumber-js/types';

import { SelectOption } from 'components/Select/types';

export type Recipients = { emails: string[]; faxes: string[] };

export type NewFax = {
  iso: Nullable<SelectOption<CountryCode>>;
  number: string;
};

export type RecipientsFormValues = {
  oldEmails: string[];
  newEmails: string[];
  oldFaxes: string[];
  newFaxes: NewFax[];
};
