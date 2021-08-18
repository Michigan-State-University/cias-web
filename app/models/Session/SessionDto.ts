import { PatternDto } from 'models/Pattern/PatternDto';

export enum SessionTypes {
  CLASSIC_SESSION = 'Session::Classic',
  CAT_SESSION = 'Session::CatMh',
}
interface SessionSettingsDto {
  formula?: boolean;
  narrator: {
    voice: boolean;
    animation: boolean;
  };
}

interface FormulaDto {
  payload: string;
  patterns: PatternDto<SessionTypes>[];
}

enum ScheduleOptions {
  AFTER_FILL = 'after_fill',
  DAYS_AFTER_FILL = 'days_after_fill',
  EXACT_DATE = 'exact_date',
  DAYS_AFTER = 'days_after',
  DAYS_AFTER_DATE = 'days_after_date',
}

interface GoogleTTSVoiceDto {
  id: number;
  googleTtsLanguageId: number;
  voiceLabel: string;
  voiceType: string;
  languageCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionDto {
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
  type: SessionTypes;
}

export interface ClassicSessionDto extends SessionDto {
  type: SessionTypes.CLASSIC_SESSION;
}
export interface CatSessionDto extends SessionDto {
  type: SessionTypes.CAT_SESSION;
}
