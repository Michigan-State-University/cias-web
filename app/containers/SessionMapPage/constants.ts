import { ConnectionLineType, Edge } from 'react-flow-renderer';

import { colors } from 'theme';

import { DownloadProgressState } from './types';

export const defaultMinZoom = 0.5;
export const defaultMaxZoom = 2;
export const defaultZoom = 1;

export const detailedInfoZoomThreshold = 0.75;

export const sessionNodeVerticalMargin = 0;
export const questionNodeVerticalMargin = 210;

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
  grayedOut: colors.periwinkleGray50,
};

export enum SessionMapNodeType {
  QUESTION = 'question',
  SESSION = 'session',
}

export enum SessionMapHeadType {
  BASE = 'session-map-base',
  HIGHLIGHTED = 'session-map-highlighted',
  DIRECT_CONNECTION = 'session-map-direct-connection',
  GRAYED_OUT = 'session-map-grayed-out',
}

export const edgePriorities = new Map<string, number>([
  [SessionMapHeadType.BASE, 1],
  [SessionMapHeadType.HIGHLIGHTED, 2],
  [SessionMapHeadType.DIRECT_CONNECTION, 3],
  [SessionMapHeadType.GRAYED_OUT, 0],
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

export const highlightedEdgeSharedAttributes: Partial<Edge> = {
  ...edgeSharedAttributes,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.HIGHLIGHTED,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.selectedLight,
  },
};

export const directConnectionEdgeSharedAttributes: Partial<Edge> = {
  ...edgeSharedAttributes,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.DIRECT_CONNECTION,
  style: {
    strokeWidth: 3,
    stroke: sessionMapColors.selected,
  },
};

export const grayedOutEdgeSharedAttributes: Partial<Edge> = {
  ...edgeSharedAttributes,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.GRAYED_OUT,
  style: {
    strokeWidth: 2,
    stroke: sessionMapColors.grayedOut,
  },
};

export const SESSION_MAP_ID = 'session-map';
export const SHOW_DETAILS_CLASSNAME = 'show-details';
export const DIVIDER_CLASSNAME = 'divider';
export const REACT_FLOW_EDGES_PANE_ID = 'react-flow__edges';

export const INITIAL_DOWNLOAD_PROGRESS_STATE: DownloadProgressState = {
  mapState: null,
  cachedEdgesPane: null,
  withBackground: false,
  isInProgress: false,
  isReadyToGenerate: false,
  isReadyToRestore: false,
};
