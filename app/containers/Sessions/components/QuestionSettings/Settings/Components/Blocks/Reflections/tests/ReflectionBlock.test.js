/**
 *
 * Tests for ReflectionBlock
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { multiQuestion } from 'models/Session/QuestionTypes';
import { reflectionType } from 'models/Narrator/BlockTypes';
import { createQuestion } from 'utils/reducerCreators';
import { formatMessage } from 'utils/intlOutsideReact';
import { instantiateBlockForType } from 'models/Session/utils';
import { CharacterType } from 'models/Character';

import ReflectionBlock from '../ReflectionBlock';

describe('<ReflectionBlock />', () => {
  const mockFunctions = {
    formatMessage,
    updateAnimation: jest.fn(),
    switchToSpeech: jest.fn(),
    updateQuestion: jest.fn(),
  };

  const block = {
    ...instantiateBlockForType(reflectionType),
    question_id: 'test',
    reflections: [
      {
        payload: '1',
        text: ['1'],
        value: '1',
        variable: '1',
      },
    ],
  };

  const singleQuestion = createQuestion();
  const multipleQuestion = createQuestion(1, multiQuestion.id);

  const questions = [singleQuestion, multipleQuestion];

  const defaultProps = {
    block,
    blockIndex: 0,
    id: 'test',
    questions: [],
    currentQuestionType: singleQuestion.id,
    disabled: false,
    character: CharacterType.PEEDY,
    ...mockFunctions,
  };

  const initialState = {
    questions: {
      selectedQuestion: singleQuestion.id,
      chosenQuestionId: multipleQuestion.id,
      questions,
    },
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReflectionBlock {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReflectionBlock {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
