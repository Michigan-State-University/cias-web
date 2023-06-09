import { Answer } from 'models/Answer';
import { QuestionDTO } from 'models/Question';
import { ToastContent, ToastOptions } from 'react-toastify';

export type AnswerSessionPageFeedbackScreenSettings = {
  showSpectrum: boolean;
  sliderRef: any; // No library type definitions for reference
};

export type SharedProps<
  T extends QuestionDTO = QuestionDTO,
  V extends null | Answer = null,
> = {
  selectAnswer: (answer: V) => void;
  answer: V;
  questionIndex: number;
  saveAnswer: () => void;
  showError: (content: ToastContent, options?: ToastOptions) => void;
  feedbackScreenSettings: AnswerSessionPageFeedbackScreenSettings;
  setFeedbackSettings: (setting: string, value: boolean) => void;
  isAnimationOngoing: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isMobilePreview: boolean;
  previewMode: string;
  question: T;
  userSessionId?: string;
};

export type ParticipantSessionSettings = {
  showTextTranscript: boolean;
  showTextReadingControls: boolean;
};
