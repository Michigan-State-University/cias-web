import { Sex } from './Sex';
import { PhoneType } from './PhoneType';

// Used when verifying patient on the HF initial screen
export type HfhsPatientData = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  sex?: Sex;
  zipCode?: string;
  phoneNumber?: string;
  phoneType?: PhoneType;
  mrn?: string;
};

// Returned from BE
export type HfhsPatientDetail = Omit<HfhsPatientData, 'mrn'> & {
  patientId: string;
};
