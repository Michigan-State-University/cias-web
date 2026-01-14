import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Multi';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Answer {index}',
  },
  noneOfAbovePlaceholder: {
    id: `${scope}.noneOfAbovePlaceholder`,
    defaultMessage: 'None of the above',
  },
  addAnswer: {
    id: `${scope}.addAnswer`,
    defaultMessage: 'Add new answer',
  },
  reorderIconAlt: {
    id: `${scope}.reorderIconAlt`,
    defaultMessage: 'Reorder icon {index}',
  },
  uploadAnswerImage: {
    id: `${scope}.uploadAnswerImage`,
    defaultMessage: 'Upload Answer Image',
  },
  addImageIconAlt: {
    id: `${scope}.addImageIconAlt`,
    defaultMessage: 'Add image to answer {index}',
  },
  deleteImageIconAlt: {
    id: `${scope}.deleteImageIconAlt`,
    defaultMessage: 'Delete image from answer {index}',
  },
});
