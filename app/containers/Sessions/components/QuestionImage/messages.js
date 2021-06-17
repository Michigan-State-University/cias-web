import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionMedia';

export default defineMessages({
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Upload',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: '\xa0or drop an image right here',
  },
  subheader: {
    id: `${scope}.subheader`,
    defaultMessage: 'It works for JPG, PNG, and GIF formats—max size 5MB',
  },
  drop: {
    id: `${scope}.drop`,
    defaultMessage: 'Drop your file here',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage:
      'Error! You can upload only one file with maximum size of 5 mb',
  },
  logoDescriptionPlaceholder: {
    id: `${scope}.logoDescriptionPlaceholder`,
    defaultMessage:
      'Input here the text describing the image for people with disabilities',
  },
});
