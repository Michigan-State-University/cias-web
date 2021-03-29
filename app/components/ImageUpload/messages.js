import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ImageUpload';

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
    defaultMessage: 'It works for {formats} formats, max size 5MB',
  },
  drop: {
    id: `${scope}.drop`,
    defaultMessage: 'Drop your file here',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error! File exceeded 5 mb or file type is not supported!',
  },
});
