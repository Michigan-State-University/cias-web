import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AssignTagModal';

export default defineMessages({
  selectTagsPlaceholder: {
    id: `${scope}.selectTagsPlaceholder`,
    defaultMessage: 'Search or create tags...',
  },
  createNewTag: {
    id: `${scope}.createNewTag`,
    defaultMessage: 'Create "{name}"',
  },
  noTagsFound: {
    id: `${scope}.noTagsFound`,
    defaultMessage: 'No tags found',
  },
  fetchTagsError: {
    id: `${scope}.fetchTagsError`,
    defaultMessage: 'Failed to load tags. Please try again.',
  },
  assignTagsSuccess: {
    id: `${scope}.assignTagsSuccess`,
    defaultMessage: 'Tags assigned successfully',
  },
  assignTagsError: {
    id: `${scope}.assignTagsError`,
    defaultMessage: 'Failed to assign tags. Please try again.',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
});
