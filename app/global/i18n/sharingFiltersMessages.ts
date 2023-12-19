import { defineMessages } from 'react-intl';

import { SharingFilter } from 'models/Intervention/SharingFilter';

export const scope = 'app.global.SharingFilters';

export default defineMessages<SharingFilter>({
  [SharingFilter.ONLY_SHARED_BY_ME]: {
    id: `${scope}.onlySharedByMe`,
    defaultMessage: `Shared by me`,
  },
  [SharingFilter.ONLY_SHARED_WITH_ME]: {
    id: `${scope}.onlySharedWithMe`,
    defaultMessage: `Shared with me`,
  },
  [SharingFilter.ONLY_NOT_SHARED_WITH_ANYONE]: {
    id: `${scope}.onlyNotSharedWithAnyone`,
    defaultMessage: `Mine only (not shared)`,
  },
});
