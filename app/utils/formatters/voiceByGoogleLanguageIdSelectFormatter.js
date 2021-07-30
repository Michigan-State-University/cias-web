export const voiceByGoogleLanguageIdSelectFormatter = ({
  voiceType: value,
  voiceLabel,
  languageCode,
  ...restProps
}) => ({
  value,
  label: `(${languageCode}) ${voiceLabel}`,
  ...restProps,
});
