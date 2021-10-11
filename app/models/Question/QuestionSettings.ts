export interface QuestionBaseSettings {
  image: boolean;
  title: boolean;
  video: boolean;
  subtitle: boolean;
  narratorSkippable: boolean;
}

export interface ProceedButtonSetting {
  proceedButton: boolean;
}

export interface RequiredSetting {
  required: boolean;
}

export interface SingleQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting,
    ProceedButtonSetting {}

export interface MultipleQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface FreeResponseQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {
  textLimit: number;
}

export interface ThirdPartyQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface NameQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface NumberQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface GridQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting,
    ProceedButtonSetting {}

export interface SliderQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {
  showNumber: boolean;
}

export interface InformationQuestionSettings extends QuestionBaseSettings {}

export interface ExternalLinkQuestionSettings extends QuestionBaseSettings {}

export interface FeedbackQuestionSettings extends QuestionBaseSettings {}

export interface FinishQuestionSettings extends QuestionBaseSettings {}

export interface PhoneQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface DateQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface ParticipantReportQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export interface CurrencyQuestionSettings
  extends QuestionBaseSettings,
    RequiredSetting {}

export type QuestionSettings =
  | SingleQuestionSettings
  | MultipleQuestionSettings
  | FreeResponseQuestionSettings
  | ThirdPartyQuestionSettings
  | NameQuestionSettings
  | NumberQuestionSettings
  | GridQuestionSettings
  | SliderQuestionSettings
  | InformationQuestionSettings
  | ExternalLinkQuestionSettings
  | FeedbackQuestionSettings
  | FinishQuestionSettings
  | PhoneQuestionSettings
  | DateQuestionSettings
  | ParticipantReportQuestionSettings
  | CurrencyQuestionSettings;
