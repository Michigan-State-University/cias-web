import { defineMessages } from 'react-intl';

export const scope = 'app.global.SharingFilters';

export default defineMessages({
  onlySharedByMe: {
    id: `${scope}.onlySharedByMe`,
    defaultMessage: `Shared by me`,
  },
  onlySharedWithMe: {
    id: `${scope}.onlySharedWithMe`,
    defaultMessage: `Shared with me`,
  },
  onlyNotSharedWithAnyone: {
    id: `${scope}.onlyNotSharedWithAnyone`,
    defaultMessage: `Mine only (not shared)`,
  },
});
