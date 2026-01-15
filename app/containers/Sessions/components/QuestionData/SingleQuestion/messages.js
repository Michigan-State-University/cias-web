import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Single';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Answer {index}',
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
