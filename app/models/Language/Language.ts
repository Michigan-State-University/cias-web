import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export interface Language {
  id: string;
  languageCode: string;
  languageName: string;
}

export type LanguageDTO = CamelToSnakeOmitId<Language>;
