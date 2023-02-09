/**
 *
 * Tests for Reflection
 *
 */

import React from 'react';
import { Provider } from 'react-redux';

import { multiQuestion } from 'models/Session/QuestionTypes';
import { reflectionType, bodyAnimationType } from 'models/Narrator/BlockTypes';
import { createTestStore } from 'utils/testUtils/storeUtils';
import { createQuestion } from 'utils/reducerCreators';
import { formatMessage } from 'utils/intlOutsideReact';
import { testRender } from 'utils/testUtils';
import { CharacterType } from 'models/Character';

import { instantiateBlockForType } from 'models/Session/utils';
import Reflection from '../Reflection';

describe('<Reflection />', () => {
  const mockFunctions = {
    formatMessage,
    updateText: jest.fn(),
    updateNarratorPreviewData: jest.fn(),
    updateNarratorPreviewAnimation: jest.fn(),
  };

  const block = {
    ...instantiateBlockForType(reflectionType),
    reflections: [
      {
        payload: '1',
        text: ['1'],
        value: '1',
        variable: '1',
      },
    ],
  };

  const defaultProps = {
    reflection: {
      ...block.reflections[0],
    },
    blockIndex: 0,
    reflectionIndex: 0,
    id: 'test',
    previewData: {
      type: bodyAnimationType,
      animation: 'standStill',
    },
    updateLoader: false,
    block,
    disabled: false,
    character: CharacterType.PEEDY,
    ...mockFunctions,
  };

  const singleQuestion = createQuestion();
  const multipleQuestion = createQuestion(1, multiQuestion.id);

  const initialState = {
    questions: {
      selectedQuestion: singleQuestion.id,
      chosenQuestionId: multipleQuestion.id,
      questions: [singleQuestion, multipleQuestion],
    },
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    testRender(
      <Provider store={store}>
        <Reflection {...defaultProps} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = testRender(
      <Provider store={store}>
        <Reflection {...defaultProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
