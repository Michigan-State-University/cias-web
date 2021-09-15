import { Question } from 'global/types/question';

interface TileData {
  showDetailedInfo: boolean;
}

export interface QuestionTileData extends TileData {
  question: Question;
  showDetails: boolean;
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void;
  index: number;
  selected: boolean;
  onSelectedChange: (selected: boolean, nodeId: string) => void;
}

export interface SessionTileData extends TileData {
  sessionIndex: number;
  selected: boolean;
  onSelectedChange: (selected: boolean, nodeId: string) => void;
}
