import { Edge, FlowTransform } from 'react-flow-renderer';

import { QuestionDTO, TlfbQuestionDTO } from 'models/Question';

export interface InteractiveNodeData {
  showDetailedInfo: boolean;
  selectableOnClick: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean, nodeId: string) => void;
}

export interface QuestionNodeData extends InteractiveNodeData {
  question: QuestionDTO;
  showDetails: boolean;
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void;
  questionIndex: number;
}

export interface SessionNodeData extends InteractiveNodeData {
  sessionIndex: number;
}

export interface TlfbNodeData extends InteractiveNodeData {
  tlfbQuestion: TlfbQuestionDTO;
}

export interface CollapseNodeData {
  firstCollapsedScreenNo: number;
  lastCollapsedScreenNo: number;
}

export type DownloadMapState = {
  transform: FlowTransform;
  edgePaneWidth: Nullable<string>;
  edgePaneHeight: Nullable<string>;
};

export type DownloadProgressState = {
  mapState: Nullable<DownloadMapState>;
  cachedEdgesPane: Nullable<Element>;
  withBackground: boolean;
  isInProgress: boolean;
  isReadyToGenerate: boolean;
  isReadyToRestore: boolean;
};

export type EdgeSharedAttributesGetter = (
  selectedNodesIds: string[],
  source: string,
  target: string,
) => Partial<Edge>;
