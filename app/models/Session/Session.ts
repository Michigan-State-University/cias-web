import { CharacterType } from 'models/Character';
import { Formula } from 'models/Formula';

import { SessionTargetType } from './SessionTargetType';

export enum SessionTypes {
  CLASSIC_SESSION = 'Session::Classic',
  CAT_SESSION = 'Session::CatMh',
}

interface SessionSettings {
  formula?: boolean;
  narrator: {
    voice: boolean;
    animation: boolean;
  };
}

export enum SessionSchedule {
  AFTER_FILL = 'after_fill',
  DAYS_AFTER_FILL = 'days_after_fill',
  EXACT_DATE = 'exact_date',
  DAYS_AFTER = 'days_after',
  DAYS_AFTER_DATE = 'days_after_date',
  IMMEDIATELY = 'immediately',
}

export interface GoogleTTSVoice {
  id: number;
  googleTtsLanguageId: number;
  voiceLabel: string;
  voiceType: string;
  languageCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  settings: SessionSettings;
  position: number;
  name: string;
  interventionId: string;
  interventionOwnerId: string;
  logoUrl?: string;
  generatedReportCount: number;
  variable: string;
  createdAt: string;
  googleTtsVoice: GoogleTTSVoice;
  smsPlansCount: number;
  scheduleAt?: string;
  schedulePayload?: number;
  schedule: SessionSchedule;
  formula: Formula<SessionTargetType>;
  reportTemplatesCount: number;
  type: SessionTypes;
  estimatedTime: number;
  currentNarrator: CharacterType;
  multipleFill: boolean;
  autofinishEnabled: boolean;
  autofinishDelay: number;
}

export interface ClassicSession extends Session {
  type: SessionTypes.CLASSIC_SESSION;
}

export interface CatSession extends Session {
  catMhLanguageId: number;
  catMhTimeFrameId: number;
  catMhPopulationId: number;
  type: SessionTypes.CAT_SESSION;
  catMhTestTypes: {
    id: string;
  }[];
}
