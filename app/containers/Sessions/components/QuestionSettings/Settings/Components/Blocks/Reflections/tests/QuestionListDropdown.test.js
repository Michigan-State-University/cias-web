/**
 *
 * Tests for QuestionListDropdown
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { createQuestion } from 'utils/reducerCreators';
import { multiQuestion } from 'models/Session/QuestionTypes';

import QuestionListDropdown from '../QuestionListDropdown';

describe('<QuestionListDropdown />', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  const singleQuestion = createQuestion();
  const multipleQuestion = createQuestion(1, multiQuestion.id);

  const initialState = {
    questions: {
      selectedQuestion: singleQuestion.id,
      chosenQuestionId: multipleQuestion.id,
      questions: [
        {
          id: 'test',
          subtitle: 'test-subtitle',
          type: singleQuestion.id,
        },
        singleQuestion,
        multipleQuestion,
      ],
    },
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <QuestionListDropdown {...defaultProps} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <QuestionListDropdown {...defaultProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
