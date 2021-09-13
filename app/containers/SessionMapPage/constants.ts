import { ConnectionLineType } from 'react-flow-renderer';

import { colors } from 'theme';

export const defaultMinZoom = 0.5;
export const defaultMaxZoom = 2;
export const defaultZoom = 1;

export const detailedInfoZoomThreshold = 0.75;

export const sessionNodesVerticalDistanceRatio = 1;
export const questionNodesVerticalDistanceRatio = 4;

export const nodeWidth = 210;
export const questionNodeLabelOffset = 32;

export const scrollbarsThickness = 5;
export const scrollbarsMargin = 15;

export const sessionMapColors = {
  nodeBase: colors.smokeWhite,
  nodeDetailsShown: colors.orchid,
  edgeBase: colors.periwinkleGray,
  selected: colors.jungleGreen,
  selectedLight: colors.jungleGreen50,
  sessionNode: colors.tuftsBlue,
};

export enum SessionMapNodeType {
  QUESTION = 'question',
  SESSION = 'session',
}

export enum SessionMapHeadType {
  BASE = 'sessionmap-base',
  SELECTED = 'sesionmap-selected',
  SELECTED_LIGHT = 'sesionmap-selected-light',
}

export const edgeSharedAttributes = {
  type: ConnectionLineType.SmoothStep,
};

export const baseEdgeSharedAttributes = {
  ...edgeSharedAttributes,
  arrowHeadType: SessionMapHeadType.BASE,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.edgeBase,
  },
};

export const selectedLightEdgeSharedAttributes = {
  ...edgeSharedAttributes,
  arrowHeadType: SessionMapHeadType.SELECTED_LIGHT,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.selectedLight,
  },
};
