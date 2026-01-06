import { Phone } from 'models/Phone';
import { AppFile } from 'models/File';
import { SmsLink } from 'models/SmsLink';

import { TextMessageVariant } from './TextMessageVariant';
import { TextMessageType } from './TextMessageType';
import { TextMessageScheduleOption } from './TextMessageScheduleOption';
import { TextMessageScheduleFrequency } from './TextMessageScheduleFrequency';
import { SmsSendTimeType } from './SmsSendTimeType';

export interface TextMessageOriginalText {
  noFormulaText: string;
}

export interface TextMessageIncludeOptions {
  includeFirstName: Nullable<boolean>;
  includeLastName: Nullable<boolean>;
  includePhoneNumber: Nullable<boolean>;
  includeEmail: Nullable<boolean>;
}

export interface SmsSendTimeDetails {
  time?: string;
  from?: string;
  to?: string;
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
  variants?: TextMessageVariant[];
  type: TextMessageType;
  phones?: Phone[];
  smsLinks?: SmsLink[];
  noFormulaAttachment: Nullable<AppFile>;
  smsSendTimeType: SmsSendTimeType;
  smsSendTimeDetails: Nullable<SmsSendTimeDetails>;
} & TextMessageIncludeOptions;
