import { Sex } from './Sex';

// Used when verifying patient on the HF initial screen
export type HfhsPatientData = {
  firstName: string;
  lastName: string;
  dob: string;
  sex: Sex;
  zipCode: string;
  mrn?: Nullable<string>;
};

// Returned from BE
export type HfhsPatientDetail = {
  patientId: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: Sex;
  zipCode: string;
};
