export interface QuestionSettings {
  image: boolean;
  title: boolean;
  video: boolean;
  required?: boolean;
  subtitle: boolean;
  textLimit?: number;
  narratorSkippable: boolean;
  proceedButton?: boolean;
  showNumber?: boolean;
}
