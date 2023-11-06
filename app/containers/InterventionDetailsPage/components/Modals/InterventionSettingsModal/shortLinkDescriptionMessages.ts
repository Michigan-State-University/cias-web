import { defineMessages } from 'react-intl';

import { InterventionType } from 'models/Intervention';

export const scope =
  'app.components.InterventionModals.InterventionSettingsModal.ShortLinkDescriptions';

export default defineMessages<InterventionType>({
  [InterventionType.DEFAULT]: {
    id: `${scope}.Intervention`,
    defaultMessage: `This link directs user to the first session in this intervention`,
  },
  [InterventionType.FIXED]: {
    id: `${scope}.Intervention::FixedOrder`,
    defaultMessage: `This link directs user to the first session in this intervention`,
  },
  [InterventionType.FLEXIBLE]: {
    id: `${scope}.Intervention::FlexibleOrder`,
    defaultMessage: `This link directs user to the module home screen`,
  },
});
