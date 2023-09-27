import { themeColors } from 'theme';

export const INVITE_PARTICIPANTS_MODAL_HEIGHT = 840;
export const INVITE_PARTICIPANTS_MODAL_WIDTH = 624;

export const TEXT_BUTTON_PROPS = {
  color: themeColors.secondary,
  display: 'flex',
  align: 'center',
  justify: 'center',
  flexShrink: 0,
  gap: 8,
  type: 'button',
};

export const CSV_BUTTON_PROPS = {
  ...TEXT_BUTTON_PROPS,
  gap: 5,
  px: 12,
};
