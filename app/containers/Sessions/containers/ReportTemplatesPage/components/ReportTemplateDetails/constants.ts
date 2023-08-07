import { themeColors } from 'theme';

export const REPORT_TEMPLATE_ACTION_BUTTONS_COMMON_PROPS = {
  fontWeight: 'bold',
  fontSize: 14,
  buttonProps: {
    color: themeColors.secondary,
    fontWeight: 'bold',
    display: 'flex',
    gap: 5,
  },
  spinnerProps: { size: 30, width: 2 },
};
