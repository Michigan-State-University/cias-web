/**
 *
 * Tests for ReflectionFormulaBlock
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { reflectionType } from 'models/Narrator/BlockTypes';
import { instantiateBlockForType } from 'models/Session/utils';
import { singleQuestion } from 'models/Session/QuestionTypes';
import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import ReflectionFormulaBlock from '../ReflectionFormulaBlock';

describe('<ReflectionFormulaBlock />', () => {
  const mockFunctions = {
    formatMessage,
    updateAnimation: jest.fn(),
    switchToSpeech: jest.fn(),
    switchToReflection: jest.fn(),
    updateAction: jest.fn(),
    onFormulaUpdate: jest.fn(),
    onAddCase: jest.fn(),
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

  const defaultProps = {
    block,
    blockIndex: 0,
    id: 'test',
    currentQuestionType: singleQuestion.id,
    disabled: false,
    ...mockFunctions,
  };

  const store = createTestStore({});

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReflectionFormulaBlock {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReflectionFormulaBlock {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
