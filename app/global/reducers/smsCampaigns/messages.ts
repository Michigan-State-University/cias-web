import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.smsCampaigns';

export default defineMessages({
  createSmsCampaignSuccess: {
    id: `${scope}.createSmsCampaignSuccess`,
    defaultMessage: 'Sending started. The status will update shortly.',
  },
  cancelSmsCampaignSuccess: {
    id: `${scope}.cancelSmsCampaignSuccess`,
    defaultMessage: 'The scheduled reminder has been cancelled.',
  },
});
