import messages from './messages';

export const SMS_CAMPAIGN_COLUMN_HEADERS = [
  messages.smsCampaignKindColumnHeader,
  messages.statusColumnHeader,
  messages.smsCampaignDateColumnHeader,
  messages.smsCampaignRecipientsColumnHeader,
];

export const SMS_CAMPAIGN_ACTION_COLUMN_WIDTHS = [90, 40];

export const SMS_CAMPAIGNS_COLUMN_COUNT =
  SMS_CAMPAIGN_COLUMN_HEADERS.length + SMS_CAMPAIGN_ACTION_COLUMN_WIDTHS.length;
