import { colors } from 'theme';

export const defaultMinZoom = 0.5;
export const defaultMaxZoom = 2;
export const defaultZoom = 1;

export const sessionMapColors = {
  nodeBase: colors.smokeWhite,
  nodeDetailsShown: colors.orchid,
  edgeBase: colors.periwinkleGray,
  selected: colors.jungleGreen,
};

export enum CustomArrowHeadType {
  BASE = 'arrowcustom-base',
  SELECTED = 'arrowcustom-selected',
}
