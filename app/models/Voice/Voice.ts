import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export interface Voice {
  id: string;
  googleTtsLanguageId: number;
  languageCode: string;
  voiceLabel: string;
  voiceType: string;
}

export type VoiceDTO = CamelToSnakeOmitId<Voice>;
