import { Sex } from './Sex';

export type BaseHfhsPatientData = {
  firstName: string;
  lastName: string;
  dob: string;
  sex: Sex;
  zipCode: string;
};

export type MedicalNumberHfhsPatientData = {
  mrn: string;
};

// Used when verifying patient on the HF initial screen
export type HfhsPatientData =
  | BaseHfhsPatientData
  | MedicalNumberHfhsPatientData;

// Returned from BE
export type HfhsPatientDetail = {
  patientId: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: Sex;
  zipCode: string;
};
