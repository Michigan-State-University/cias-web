import { CountryCode } from 'libphonenumber-js/types';

export interface PhoneAttributes {
  iso: CountryCode;
  number: string;
  prefix: string;
}

export type PhoneNumberFormCalculatedValue = {
  phoneAttributes: PhoneAttributes;
};
