import { Sex } from './Sex';
import { PhoneType } from './PhoneType';

// Used when verifying patient on the HF initial screen
export type HfhsPatientData = {
  id?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  sex?: Sex;
  zipCode?: string;
  phoneNumber?: string;
  phoneType?: PhoneType;
  mrn?: string;
};

// Returned from BE (the participant-provided values). A record matched by QR
// code has none of them, so every attribute can be null.
export type HfhsPatientDetail = {
  [Key in keyof Omit<HfhsPatientData, 'mrn'>]?: Nullable<HfhsPatientData[Key]>;
};

export type HfhsPatientDetailAnonymized = {
  id: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  phoneNumber?: string;
  mrn?: string;
};
