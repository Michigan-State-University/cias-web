import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.reportTemplates';

export default defineMessages({
  updateSectionCaseError: {
    id: `${scope}.updateSectionCaseError`,
    defaultMessage: 'Cannot update report template section case',
  },
  reorderSectionCasesError: {
    id: `${scope}.reorderSectionCasesError`,
    defaultMessage: 'Cannot reorder section cases',
  },
});
