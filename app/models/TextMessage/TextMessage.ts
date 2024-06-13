import { Phone } from 'models/Phone';
import { AppFile } from 'models/File';

import { TextMessageVariant } from './TextMessageVariant';
import { TextMessageType } from './TextMessageType';
import { TextMessageScheduleOption } from './TextMessageScheduleOption';
import { TextMessageScheduleFrequency } from './TextMessageScheduleFrequency';

export interface TextMessageOriginalText {
  noFormulaText: string;
}

export interface TextMessageIncludeOptions {
  includeFirstName: Nullable<boolean>;
  includeLastName: Nullable<boolean>;
  includePhoneNumber: Nullable<boolean>;
  includeEmail: Nullable<boolean>;
}

export type TextMessage = {
  id: string;
  name: string;
  sessionId: string;
  schedule: TextMessageScheduleOption;
  schedulePayload: number;
  frequency: TextMessageScheduleFrequency;
  endAt: Nullable<string>;
  formula: Nullable<string>;
  isUsedFormula: boolean;
  noFormulaText: Nullable<string>;
  originalText: TextMessageOriginalText;
  availableLinkVariableNumber: number;
  variants?: TextMessageVariant[];
  type: TextMessageType;
  phones?: Phone[];
  noFormulaAttachment: Nullable<AppFile>;
} & TextMessageIncludeOptions;
