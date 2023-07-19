import { CatMhLicenseType } from 'models/Intervention';

export type ModalUIData = {
  organizationId: number;
  applicationId: string;
  isAccessRevoked: boolean;
  licenseType: CatMhLicenseType;
  testNumber: number;
  testsLeft: number;
};

export type ThirdPartyToolsAccessFormValues = {
  hfhsAccess: boolean;
  locationIds: string[];
};
