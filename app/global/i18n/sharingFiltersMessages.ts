import { defineMessages } from 'react-intl';

import { SharingFilter } from 'models/Intervention/SharingFilter';

export const scope = 'app.global.SharingFilters';

export default defineMessages<SharingFilter>({
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
