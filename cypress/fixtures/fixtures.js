/*
Fixtures are used as external pieces of static data that can be used by
your tests.Fixture files are located in cypress/fixtures by default, but
can be configured to another directory.You would typically use them
with the cy.fixture() command and most often when you’re stubbing
Network Requests
 */

import {
  singleQuestion,
  feedbackQuestion,
  visualAnalogueScaleQuestion,
  urlQuestion,
  numberQuestion,
  textboxQuestion,
  multiQuestion,
  gridQuestion,
  informationQuestion,
} from 'models/Session/QuestionTypes';

export const noVarQuestionTypes = [
  feedbackQuestion.name,
  informationQuestion.name,
];

export const questionTypes = [
  singleQuestion.name,
  textboxQuestion.name,
  numberQuestion.name,
  visualAnalogueScaleQuestion.name,
  urlQuestion.name,
  multiQuestion.name,
  gridQuestion.name,
  ...noVarQuestionTypes,
];
