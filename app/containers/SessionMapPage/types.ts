import { Question } from 'global/types/question';

export interface QuestionTileData {
  question: Question;
  showDetails: boolean;
  onShowDetailsChange: (showDetails: boolean, id: string) => void;
  showDetailedInfo: boolean;
  index: number;
}
