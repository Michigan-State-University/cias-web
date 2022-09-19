import { CountryCode } from 'libphonenumber-js/types';

export interface PhoneAttributes {
  iso: CountryCode;
  number: string;
  prefix: string;
}

export interface Phone extends PhoneAttributes {
  id: string;
  confirmed: boolean;
}
