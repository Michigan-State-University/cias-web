import { Question } from 'global/types/question';

interface TileData {
  showDetailedInfo: boolean;
}

export interface QuestionTileData extends TileData {
  question: Question;
  showDetails: boolean;
  onShowDetailsChange: (showDetails: boolean, id: string) => void;
  index: number;
}

export interface SessionTileData extends TileData {
  sessionIndex: number;
}
