import { CatMhLicenseType } from 'models/Intervention';

export type ModalUIData = {
  organizationId: string;
  applicationId: string;
  isAccessRevoked: boolean;
  licenseType: CatMhLicenseType;
  testNumber: number;
  currentTestNumber: number;
};
