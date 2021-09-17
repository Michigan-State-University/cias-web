import { FlowTransform } from 'react-flow-renderer';

import { Question } from 'global/types/question';

interface TileData {
  showDetailedInfo: boolean;
  selectable: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean, nodeId: string) => void;
}

export interface QuestionTileData extends TileData {
  question: Question;
  showDetails: boolean;
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void;
  index: number;
}

export interface SessionTileData extends TileData {
  sessionIndex: number;
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
