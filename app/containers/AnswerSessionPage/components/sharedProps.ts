import { Answer } from 'models/Answer';
import { QuestionDTO } from 'models/Question';

export type SharedProps<
  T extends QuestionDTO = QuestionDTO,
  V extends null | Answer = null,
> = {
  selectAnswer: (answer: V, selectedByUser?: boolean) => void;
  answer: V;
  questionIndex: number;
  saveAnswer: () => void;
  showError: () => void;
  feedbackScreenSettings: {
    showSpectrum: boolean;
    sliderRef: any;
  };
  setFeedbackSettings: (setting: string, value: boolean) => void;
  isAnimationOngoing: boolean;
  isDesktop: boolean;
  question: T;
};
