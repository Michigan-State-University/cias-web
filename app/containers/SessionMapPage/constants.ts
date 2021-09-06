import { colors } from 'theme';

export const defaultMinZoom = 0.5;
export const defaultMaxZoom = 2;
export const defaultZoom = 1;

export const detailedInfoZoomThreshold = 0.75;

export const sessionNodesVerticalDistanceRatio = 1;
export const questionNodesVerticalDistanceRatio = 4;

export const sessionMapColors = {
  nodeBase: colors.smokeWhite,
  nodeDetailsShown: colors.orchid,
  edgeBase: colors.periwinkleGray,
  selected: colors.jungleGreen,
  sessionNode: colors.tuftsBlue,
};

export enum NodeType {
  QUESTION = 'question',
  SESSION = 'session',
}

export enum CustomArrowHeadType {
  BASE = 'arrowcustom-base',
  SELECTED = 'arrowcustom-selected',
}

export const baseEdgeSharedAttributes = {
  type: 'smoothstep',
  arrowHeadType: CustomArrowHeadType.BASE,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.edgeBase,
  },
};
