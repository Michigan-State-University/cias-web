// eslint-disable-next-line no-unused-vars
import Question from './Question';
import { multiQuestion, gridQuestion } from './QuestionTypes';

/**
 * @param  {Array<Question>} questions
 * @param  {{structure: 'flat' | 'id'}} options
 */
export const getAllVariables = (questions, options = { structure: 'flat' }) => {
  const variables = [];

  questions.forEach(question => {
    let questionVariables;

    switch (question.type) {
      case multiQuestion.id:
        questionVariables = getMultiVariables(question);
        break;
      case gridQuestion.id:
        questionVariables = getGridVariables(question);
        break;
      default:
        questionVariables = [getDefaultVariable(question)];
        break;
    }

    switch (options.structure) {
      case 'id':
        variables.push({ id: question.id, variables: questionVariables });
        break;
      case 'flat':
      default:
        variables.push(...questionVariables);
        break;
    }
  });

  return variables;
};

const getDefaultVariable = question => question.body.variable.name;

const getMultiVariables = question =>
  question.body.data.map(answer => answer.variable.name);

const getGridVariables = question =>
  question.body.data[0].payload.rows.map(row => row.variable.name);
