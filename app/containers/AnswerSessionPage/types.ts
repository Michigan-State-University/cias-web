import { GenericAnswer } from 'models/Answer';
import { QuestionDTO } from 'models/Question';
import { ToastContent, ToastOptions } from 'react-toastify';

import { LanguageDirection } from 'global/types/locale';

export type AnswerSessionPageFeedbackScreenSettings = {
  showSpectrum: boolean;
  sliderRef: any; // No library type definitions for reference
};

export type SharedProps<
  T extends QuestionDTO = QuestionDTO,
  V extends null | GenericAnswer['decryptedBody']['data'] =
    GenericAnswer['decryptedBody']['data'],
> = {
  selectAnswer: (answer: V) => void;
  answerBody: V;
  questionIndex: number;
  saveAnswer: (skipped?: boolean) => void;
  showError: (content: ToastContent, options?: ToastOptions) => void;
  feedbackScreenSettings: AnswerSessionPageFeedbackScreenSettings;
  setFeedbackSettings: (setting: string, value: boolean) => void;
  isAnimationOngoing: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isMobilePreview: boolean;
  isPreview?: boolean;
  previewMode: string;
  question: T;
  userSessionId?: string;
  disabled: boolean;
  continueButtonLoading: boolean;
  dynamicElementsDirection: LanguageDirection;
};

export type ParticipantSessionSettings = {
  showTextTranscript: boolean;
  showTextReadingControls: boolean;
};
