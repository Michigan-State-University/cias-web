import { CountryCode } from 'libphonenumber-js/types';

export interface PhoneAttributes {
  iso: CountryCode;
  number: string;
  prefix: string;
  confirmed?: boolean;
}

export interface Phone extends PhoneAttributes {
  id: string;
}
