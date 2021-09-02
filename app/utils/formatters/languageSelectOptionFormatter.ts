import { Language } from 'global/types/language';

import { SelectOption } from 'components/Select/types';

export interface LanguageSelectOption extends SelectOption<string> {
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
