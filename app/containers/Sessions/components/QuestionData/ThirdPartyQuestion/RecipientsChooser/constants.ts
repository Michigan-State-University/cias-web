import { NumberFormat } from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

import { themeColors } from 'theme';

export const MANAGE_RECIPIENTS_MODAL_WIDTH = '532px';
export const TAB_CONTENT_HEIGHT = '384px';

export const ADD_RECIPIENT_BUTTON_PROPS = {
  color: themeColors.secondary,
  type: 'button',
};

export const API_PHONE_NUMBER_FORMAT: NumberFormat = 'E.164';

export const FAX_RECIPIENTS_COUNTRY_CODES: CountryCode[] = [
  'US',
  'AU',
  'MX',
  'HK',
  'NL',
  'GB',
  'JP',
  'KR',
  'BE',
  'DE',
  'SG',
  'IL',
  'CN',
  'FR',
  'IT',
  'TW',
  'EG',
  'CH',
  'PT',
  'NZ',
  'BR',
  'IE',
  'ES',
  'AT',
  'GR',
];
