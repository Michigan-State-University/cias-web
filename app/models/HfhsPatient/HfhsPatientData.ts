import { Sex } from './Sex';

export type HfhsPatientData = {
  firstName: string;
  lastName: string;
  dob: string;
  sex: Nullable<Sex>;
  zipCode: string;
  mrn: Nullable<string>;
};
