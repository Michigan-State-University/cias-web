import { QuestionDTO } from 'models/Question';
import {
  ReflectableQuestion,
  ReflectableQuestionTypes,
} from 'models/ReflectableQuestion';
import { QuestionGroup } from 'models/QuestionGroup';

import objectToCamelCase from 'utils/objectToCamelCase';

export const getPreviousQuestions = (
  questions: QuestionDTO[],
  normalizedQuestionGroups: NormalizedData<QuestionGroup>,
  selectedQuestion: Nullable<QuestionDTO>,
  selectedQuestionGroup: Nullable<QuestionGroup>,
): QuestionDTO[] => {
  if (!selectedQuestion || !selectedQuestionGroup) return [];

  const selectedQuestionGroupPosition = selectedQuestionGroup.position;
  const selectedQuestionPosition = selectedQuestion.position;

  return questions.filter(
    ({ question_group_id: questionGroupId, position }) => {
      const questionGroupPosition =
        normalizedQuestionGroups[questionGroupId].position;

      if (questionGroupPosition < selectedQuestionGroupPosition) {
        return true;
      }
      if (questionGroupPosition === selectedQuestionGroupPosition) {
        return position < selectedQuestionPosition;
      }
      return false;
    },
  );
};

export const mapQuestionsToReflectableQuestions = (
  questions: QuestionDTO[],
  sessionId: string,
): ReflectableQuestion[] =>
  questions.reduce((reflectableQuestions, question) => {
    if (!ReflectableQuestionTypes.includes(question.type)) {
      return reflectableQuestions;
    }

    reflectableQuestions.push({ ...objectToCamelCase(question), sessionId });
    return reflectableQuestions;
  }, [] as ReflectableQuestion[]);
