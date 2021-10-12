import { Voice } from 'models/Voice';

import { SelectOption } from 'components/Select/types';

export interface VoiceSelectOption extends SelectOption<string> {
  id: string;
  googleTtsLanguageId: number;
}

export const voiceByGoogleLanguageIdSelectFormatter = ({
  id,
  voiceLabel,
  languageCode,
  ...restProps
}: Voice): VoiceSelectOption => ({
  id,
  value: id,
  label: `(${languageCode}) ${voiceLabel}`,
  ...restProps,
});
