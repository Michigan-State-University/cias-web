import { defineMessages } from 'react-intl';

import { InterventionType } from 'models/Intervention';

export const scope =
  'app.components.InterventionModals.InterventionSettingsModal.ShortLinkDescriptions';

export default defineMessages<InterventionType>({
  [InterventionType.DEFAULT]: {
    id: `${scope}.Intervention`,
    defaultMessage: `This link directs a participant to the next session they are eligible for`,
  },
  [InterventionType.FIXED]: {
    id: `${scope}.Intervention::FixedOrder`,
    defaultMessage: `This link directs a participant to the next session they are eligible for`,
  },
  [InterventionType.FLEXIBLE]: {
    id: `${scope}.Intervention::FlexibleOrder`,
    defaultMessage: `This link directs a participant to the modules home screen`,
  },
});
