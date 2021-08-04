export const languageSelectOptionFormatter = ({
  id: googleLanguageId,
  languageCode: value,
  languageName: label,
}) => ({
  googleLanguageId,
  value,
  label,
});

export const organizationSelectOptionFormatter = ({
  id: value,
  name: label,
}) => ({
  value,
  label,
});
