export interface QuestionOriginalText {
  title: string;
  subtitle: string;
  imageDescription: Nullable<string>;
  answerImages?: Array<{
    answer_id: string;
    description: string;
  }>;
}
