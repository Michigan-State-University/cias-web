import { SelectOption } from 'components/Select/types';

export interface Voice {
  id: string;
  googleTtsLanguageId: number;
  languageCode: string;
  voiceLabel: string;
  voiceType: string;
}

export interface VoiceSelectOption extends SelectOption {
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
