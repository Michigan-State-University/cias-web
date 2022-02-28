import concat from 'lodash/concat';
import { TlfbQuestionDTO } from 'models/Question';
import {
  UPDATE_QUESTION_TITLE,
  UPDATE_HEAD_QUESTION,
  UPDATE_SUBSTANCE_QUESTION,
  UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
  ADD_SUBSTANCE,
  EDIT_SUBSTANCE,
  REMOVE_SUBSTANCE,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const tlfbQuestionsReducer = (
  question: TlfbQuestionDTO,
  payload: { data: { value: string }; type: string },
) => {
  switch (payload.type) {
    case UPDATE_QUESTION_TITLE: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.question_title = value;
      return question;
    }

    case UPDATE_HEAD_QUESTION: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.head_question = value;
      return question;
    }

    case UPDATE_SUBSTANCE_QUESTION: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.substance_question = value;
      return question;
    }

    case UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE: {
      const {
        data: { option },
      } = payload as any;
      question.body.data[0].payload.substances_with_group = option;
      return question;
    }

    case ADD_SUBSTANCE: {
      const {
        data: { substance },
      } = payload as any;
      question.body.data[0].payload.substances = concat(
        question.body.data[0].payload.substances || [],
        [substance],
      );
      return question;
    }

    case EDIT_SUBSTANCE: {
      const {
        data: { substance, substanceId },
      } = payload as any;
      question.body.data[0].payload.substances[substanceId] = substance;
      return question;
    }

    case REMOVE_SUBSTANCE: {
      const {
        data: { substanceId },
      } = payload as any;
      question.body.data[0].payload.substances = [
        ...question.body.data[0].payload.substances.slice(0, substanceId),
        ...question.body.data[0].payload.substances.slice(substanceId + 1),
      ];
      return question;
    }

    default:
      return question;
  }
};

export default tlfbQuestionsReducer;
