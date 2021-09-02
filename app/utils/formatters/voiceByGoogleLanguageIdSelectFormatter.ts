import { Voice } from 'global/types/voice';

import { SelectOption } from 'components/Select/types';

export interface VoiceSelectOption extends SelectOption<string> {
  id: string;
  googleTtsLanguageId: number;
}

export const voiceByGoogleLanguageIdSelectFormatter = ({
  voiceType: value,
  voiceLabel,
  languageCode,
  ...restProps
}: Voice): VoiceSelectOption => ({
  value,
  label: `(${languageCode}) ${voiceLabel}`,
  ...restProps,
});
