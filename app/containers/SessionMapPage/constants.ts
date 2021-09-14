import { ConnectionLineType, Edge } from 'react-flow-renderer';

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
  SELECTED_LIGHT = 'sesionmap-selected-light',
  SELECTED = 'sesionmap-selected',
}

export const edgePriorities = new Map<string, number>([
  [SessionMapHeadType.BASE, 1],
  [SessionMapHeadType.SELECTED_LIGHT, 2],
  [SessionMapHeadType.SELECTED, 3],
]);

export const edgeSharedAttributes: Partial<Edge> = {
  type: ConnectionLineType.SmoothStep,
};

export const baseEdgeSharedAttributes: Partial<Edge> = {
  ...edgeSharedAttributes,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.BASE,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.edgeBase,
  },
};

export const selectedLightEdgeSharedAttributes: Partial<Edge> = {
  ...edgeSharedAttributes,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.SELECTED_LIGHT,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.selectedLight,
  },
};

export const selectedEdgeSharedAttributes: Partial<Edge> = {
  ...edgeSharedAttributes,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.SELECTED,
  style: {
    strokeWidth: 3,
    stroke: sessionMapColors.selected,
  },
};
