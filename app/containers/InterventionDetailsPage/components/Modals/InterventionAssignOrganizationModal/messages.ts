import { defineMessages } from 'react-intl';

export const scope =
  'app.components.InterventionModals.InterventionAssignOrganizationModal';

export default defineMessages({
  assignOrganizationSelectLabel: {
    id: `${scope}.assignOrganizationSelectLabel`,
    defaultMessage: 'Choose Organization:',
  },
  shortLinksInfo: {
    id: `${scope}.shortLinksInfo`,
    defaultMessage:
      "Changing the intervention's Organization assignment will cause all custom links created for this intervention to be deleted",
  },
});
