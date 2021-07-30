import { SelectOption } from 'components/Select/types';

export interface Language {
  id: string;
  languageCode: string;
  languageName: string;
}

export interface LanguageSelectOption extends SelectOption {
  googleLanguageId: string;
}

export const languageSelectOptionFormatter = ({
  id: googleLanguageId,
  languageCode: value,
  languageName: label,
}: Language): LanguageSelectOption => ({
  googleLanguageId,
  value,
  label,
});
