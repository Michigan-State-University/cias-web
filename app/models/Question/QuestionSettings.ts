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

export interface StartAutofinishTimerSetting {
  startAutofinishTimer: boolean;
}

export interface ShowDashboardButtonSetting {
  showDashboardButton: boolean;
}

export interface SingleQuestionSettings
  extends
    QuestionBaseSettings,
    RequiredSetting,
    ProceedButtonSetting,
    StartAutofinishTimerSetting {}

export interface MultipleQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface FreeResponseQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {
  textLimit: number;
}

export interface ThirdPartyQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface NameQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface NumberQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface GridQuestionSettings
  extends
    QuestionBaseSettings,
    RequiredSetting,
    ProceedButtonSetting,
    StartAutofinishTimerSetting {}

export interface SliderQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {
  showNumber: boolean;
}

export interface InformationQuestionSettings
  extends QuestionBaseSettings, StartAutofinishTimerSetting {}

export interface ExternalLinkQuestionSettings
  extends QuestionBaseSettings, StartAutofinishTimerSetting {}

export interface FeedbackQuestionSettings
  extends QuestionBaseSettings, StartAutofinishTimerSetting {}

export interface FinishQuestionSettings
  extends QuestionBaseSettings, ShowDashboardButtonSetting {}

export interface PhoneQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface DateQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface ParticipantReportQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

export interface CurrencyQuestionSettings
  extends QuestionBaseSettings, RequiredSetting, StartAutofinishTimerSetting {}

// Designs do not predict any settings to be available for TLFB screens but this is what BE returns
export interface TlfbConfigSettings {}

export interface TlfbEventsSettings extends StartAutofinishTimerSetting {}

export interface TlfbQuestionSettings extends StartAutofinishTimerSetting {}

export interface HenryFordQuestionSettings extends SingleQuestionSettings {}
export interface HenryFordInitialScreenSettings extends QuestionBaseSettings {}

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
  | CurrencyQuestionSettings
  | TlfbConfigSettings
  | TlfbEventsSettings
  | TlfbQuestionSettings
  | HenryFordQuestionSettings
  | HenryFordInitialScreenSettings;
