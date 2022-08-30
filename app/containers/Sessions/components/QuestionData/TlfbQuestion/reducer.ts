import produce from 'immer';
import { TlfbQuestionDTO } from 'models/Question';
import { deleteItemByIndex } from 'utils/reduxUtils';
import { getUniqVariable } from 'utils/sequenceUtils';
import {
  UPDATE_QUESTION_TITLE,
  UPDATE_HEAD_QUESTION,
  UPDATE_SUBSTANCE_QUESTION,
  UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE,
  ADD_SUBSTANCE,
  ADD_SUBSTANCE_GROUP,
  EDIT_SUBSTANCE,
  REMOVE_SUBSTANCE,
  EDIT_SUBSTANCE_GROUP,
  EDIT_SUBSTANCE_IN_GROUP,
  REMOVE_SUBSTANCE_IN_GROUP,
  ADD_SUBSTANCE_IN_GROUP,
  REMOVE_SUBSTANCE_GROUP,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const tlfbQuestionsReducer = (
  question: TlfbQuestionDTO,
  payload: { data: { value: string }; type: string },
) =>
  produce(question, (draft) => {
    switch (payload.type) {
      case UPDATE_QUESTION_TITLE: {
        const {
          data: { value },
        } = payload;
        draft.body.data[0].payload.question_title = value;
        break;
      }

      case UPDATE_HEAD_QUESTION: {
        const {
          data: { value },
        } = payload;
        draft.body.data[0].payload.head_question = value;
        break;
      }

      case UPDATE_SUBSTANCE_QUESTION: {
        const {
          data: { value },
        } = payload;
        draft.body.data[0].payload.substance_question = value;
        break;
      }

      case UPDATE_SUBSTANCES_WITH_GROUP_TOGGLE: {
        const {
          data: { option, tlfbVariables },
        } = payload as any;
        draft.body.data[0].payload.substances_with_group = option;
        if (option) {
          draft.body.data[0].payload.substance_groups =
            question.body.data[0].payload.substances.map(({ name }) => ({
              name,
              substances: [],
            }));
          draft.body.data[0].payload.substances = [];
        } else {
          let variablesWithNew = [...tlfbVariables];
          draft.body.data[0].payload.substances =
            question.body.data[0].payload.substance_groups.map(({ name }) => {
              const variable = getUniqVariable(variablesWithNew, name);
              variablesWithNew = [...variablesWithNew, variable];
              return {
                name,
                variable,
              };
            });
          draft.body.data[0].payload.substance_groups = [];
        }
        break;
      }

      // NOT GROUPED SUBSTANCES
      case ADD_SUBSTANCE: {
        const {
          data: { substance },
        } = payload as any;
        draft.body.data[0].payload.substances.push(substance);
        break;
      }

      case EDIT_SUBSTANCE: {
        const {
          data: { substance, substanceIndex },
        } = payload as any;
        draft.body.data[0].payload.substances[substanceIndex] = substance;
        break;
      }

      case REMOVE_SUBSTANCE: {
        const {
          data: { substanceIndex },
        } = payload as any;
        deleteItemByIndex(
          draft.body.data[0].payload.substances,
          substanceIndex,
        );
        break;
      }

      // GROUPED SUBSTANCES

      case ADD_SUBSTANCE_GROUP: {
        const {
          data: { name },
        } = payload as any;
        draft.body.data[0].payload.substance_groups.push({
          name,
          substances: [],
        });
        break;
      }

      case ADD_SUBSTANCE_IN_GROUP: {
        const {
          data: { groupIndex, substance },
        } = payload as any;
        draft.body.data[0].payload.substance_groups[groupIndex].substances.push(
          substance,
        );
        break;
      }

      case EDIT_SUBSTANCE_GROUP: {
        const {
          data: { name, groupIndex },
        } = payload as any;
        draft.body.data[0].payload.substance_groups[groupIndex].name = name;
        break;
      }

      case EDIT_SUBSTANCE_IN_GROUP: {
        const {
          data: { substanceIndex, groupIndex, substance },
        } = payload as any;
        draft.body.data[0].payload.substance_groups[groupIndex].substances[
          substanceIndex
        ] = substance;
        break;
      }

      case REMOVE_SUBSTANCE_IN_GROUP: {
        const {
          data: { groupIndex, substanceIndex },
        } = payload as any;

        deleteItemByIndex(
          draft.body.data[0].payload.substance_groups[groupIndex].substances,
          substanceIndex,
        );
        break;
      }

      case REMOVE_SUBSTANCE_GROUP: {
        const {
          data: { groupIndex },
        } = payload as any;

        deleteItemByIndex(
          draft.body.data[0].payload.substance_groups,
          groupIndex,
        );
        break;
      }
    }
  });

export default tlfbQuestionsReducer;
