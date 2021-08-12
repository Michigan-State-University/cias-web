import { PatternDto } from 'models/Pattern/PatternDto';

export enum SessionTypes {
  CLASSIC_SESSION = 'Session::Classic',
  CAT_SESSION = 'Session::Cat',
}
type SessionSettingsDto = {
  formula?: boolean;
  narrator: {
    voice: boolean;
    animation: boolean;
  };
};

type FormulaDto = {
  payload: string;
  patterns: PatternDto<SessionTypes>[];
};

enum ScheduleOptions {
  AFTER_FILL = 'after_fill',
  DAYS_AFTER_FILL = 'days_after_fill',
  EXACT_DATE = 'exact_date',
  DAYS_AFTER = 'days_after',
  DAYS_AFTER_DATE = 'days_after_date',
}

type GoogleTTSVoiceDto = {
  id: number;
  googleTtsLanguageId: number;
  voiceLabel: string;
  voiceType: string;
  languageCode: string;
  createdAt: string;
  updatedAt: string;
};

export type SessionDto = {
  id: string;
  settings: SessionSettingsDto;
  position: number;
  name: string;
  interventionId: string;
  interventionOwnerId: string;
  logoUrl?: string;
  generatedReportCount: number;
  variable: string;
  googleTtsVoice: GoogleTTSVoiceDto;
  smsPlansCount: number;
  scheduleAt?: string;
  schedulePayload?: number;
  schedule: ScheduleOptions;
  formula: FormulaDto;
  reportTemplatesCount: number;
};

export type ClassicSessionDto = SessionDto & {
  type: SessionTypes.CLASSIC_SESSION;
};
export type CatSessionDto = SessionDto & { type: SessionTypes.CAT_SESSION };
