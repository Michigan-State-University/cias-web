import { GenericAnswer } from 'models/Answer';
import { QuestionDTO } from 'models/Question';
import { ToastContent, ToastOptions } from 'react-toastify';

export type SharedProps<
  T extends QuestionDTO = QuestionDTO,
  V extends
    | null
    | GenericAnswer['decryptedBody']['data'] = GenericAnswer['decryptedBody']['data'],
> = {
  selectAnswer: (answer: V, selectedByUser?: boolean) => void;
  answerBody: V;
  questionIndex: number;
  saveAnswer: (skipped?: boolean) => void;
  showError: (content: ToastContent, options?: ToastOptions) => void;
  feedbackScreenSettings: {
    showSpectrum: boolean;
    sliderRef: any;
  };
  setFeedbackSettings: (setting: string, value: boolean) => void;
  isAnimationOngoing: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isMobilePreview: boolean;
  isPreview?: boolean;
  previewMode: string;
  question: T;
  userSessionId?: string;
};
