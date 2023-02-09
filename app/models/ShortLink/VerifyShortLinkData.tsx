import { CamelToSnake } from 'global/types/camelToSnake';

export enum ShortLinkType {
  SEQUENTIAL = 'Intervention',
  FLEXIBLE_ORDER = 'Intervention::FlexibleOrder',
  FIXED_ORDER = 'Intervention::FixedOrder',
}

export type VerifySequentialShortLinkData = {
  type: ShortLinkType.SEQUENTIAL;
  interventionId: string;
  healthClinicId: Nullable<string>;
  firstSessionId: Nullable<string>;
};

export type VerifyModuleShortLinkData = {
  type: ShortLinkType.FLEXIBLE_ORDER | ShortLinkType.FIXED_ORDER;
  interventionId: string;
  healthClinicId: Nullable<string>;
  firstSessionId: null;
};

export type VerifyShortLinkData =
  | VerifySequentialShortLinkData
  | VerifyModuleShortLinkData;

export type VerifyShortLinkDataDTO = CamelToSnake<VerifyShortLinkData>;
