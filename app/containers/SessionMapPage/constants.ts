import { Edge } from 'react-flow-renderer';

import { colors } from 'theme';

import { QuestionTypes } from 'models/Question';

import {
  CustomConnectionLineType,
  NodeDimensions,
} from 'components/ReactFlowGraph';

import { DownloadProgressState } from './types';

export const DEFAULT_MIN_ZOOM = 0.5;
export const DEFAULT_MAX_ZOOM = 2;
export const DEFAULT_ZOOM = 1;

export const DETAILED_INFO_ZOOM_THRESHOLD = 0.75;

export const NODE_LABEL_OFFSET = 32;

export const NODE_THIN_BORDER_WIDTH = 1;
export const NODE_THICK_BORDER_WIDTH = 3;

// vertical margin + vertical border width + vertical padding
export const NODE_VERTICAL_NON_CONTENT_WIDTH = 19;
// horizontal margin + horizontal border width + horizontal padding
export const NODE_HORIZONTAL_NON_CONTENT_WIDTH = 25;

export const SCROLLBAR_THICKNESS = 5;
export const SCROLLBAR_MARGIN = 15;

export const SESSION_MAP_COLORS = {
  nodeBase: colors.smokeWhite,
  nodeDetailsShown: colors.orchid,
  edgeBase: colors.periwinkleGray,
  selected: colors.jungleGreen,
  selectedLight: colors.jungleGreen50,
  sessionNodeBackground: colors.tuftsBlue,
  questionNodeBackground: colors.linkWater,
  grayedOut: colors.periwinkleGray50,
};

export enum SessionMapNodeType {
  QUESTION = 'question',
  SESSION = 'session',
  TLFB = 'tlfb',
  COLLAPSE = 'collapse',
}

export const SESSION_MAP_NODE_DIMENSIONS = new Map<string, NodeDimensions>([
  [SessionMapNodeType.QUESTION, { height: 146, width: 210 }],
  [SessionMapNodeType.SESSION, { height: 110, width: 210 }],
  [SessionMapNodeType.TLFB, { height: 110, width: 210 }],
  [SessionMapNodeType.COLLAPSE, { height: 324, width: 440 }],
]);

export const FALLBACK_NODE_DIMENSIONS: NodeDimensions = { width: 0, height: 0 };

export enum SessionMapHeadType {
  BASE = 'session-map-base',
  HIGHLIGHTED = 'session-map-highlighted',
  DIRECT_CONNECTION = 'session-map-direct-connection',
  GRAYED_OUT = 'session-map-grayed-out',
}

export const EDGE_PRIORITIES = new Map<string, number>([
  [SessionMapHeadType.BASE, 1],
  [SessionMapHeadType.HIGHLIGHTED, 2],
  [SessionMapHeadType.DIRECT_CONNECTION, 3],
  [SessionMapHeadType.GRAYED_OUT, 0],
]);

export const EDGE_SHARED_ATTRIBUTES: Partial<Edge> = {
  type: CustomConnectionLineType.PathFind,
};

export const BASE_EDGE_SHARED_ATTRIBUTES: Partial<Edge> = {
  ...EDGE_SHARED_ATTRIBUTES,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.BASE,
  style: {
    strokeWidth: 2,
    stroke: SESSION_MAP_COLORS.edgeBase,
  },
};

export const HIGHLIGHTED_EDGE_SHARED_ATTRIBUTES: Partial<Edge> = {
  ...EDGE_SHARED_ATTRIBUTES,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.HIGHLIGHTED,
  style: {
    strokeWidth: 2,
    stroke: SESSION_MAP_COLORS.selectedLight,
  },
};

export const DIRECT_CONNECTION_EDGE_SHARED_ATTRIBUTES: Partial<Edge> = {
  ...EDGE_SHARED_ATTRIBUTES,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.DIRECT_CONNECTION,
  style: {
    strokeWidth: 3,
    stroke: SESSION_MAP_COLORS.selected,
  },
};

export const GRAYED_OUT_EDGE_SHARED_ATTRIBUTES: Partial<Edge> = {
  ...EDGE_SHARED_ATTRIBUTES,
  // @ts-ignore
  arrowHeadType: SessionMapHeadType.GRAYED_OUT,
  style: {
    strokeWidth: 2,
    stroke: SESSION_MAP_COLORS.grayedOut,
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

export const QUESTIONS_WITHOUT_VARIABLES = [
  QuestionTypes.INFORMATION,
  QuestionTypes.FINISH,
  QuestionTypes.FEEDBACK,
];

export const QUESTIONS_WITHOUT_ANSWERS = [
  QuestionTypes.INFORMATION,
  QuestionTypes.FINISH,
  QuestionTypes.FEEDBACK,
  QuestionTypes.EXTERNAL_LINK,
];

export const QUESTIONS_TO_OMIT = [
  QuestionTypes.TLFB_CONFIG,
  QuestionTypes.TLFB_EVENTS,
];
