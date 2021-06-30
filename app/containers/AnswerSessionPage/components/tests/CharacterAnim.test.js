/**
 *
 * Tests for CharacterAnim
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { feedbackActions } from 'models/Narrator/FeedbackActions';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';
import { createTestStore } from 'utils/testUtils/storeUtils';

import CharacterAnim from '../CharacterAnim';

describe('<CharacterAnim />', () => {
  const store = createTestStore({});

  const mockedFunctions = {
    changeIsAnimationOngoing: jest.fn(),
    setFeedbackSettings: jest.fn(),
  };

  const defaultProps = {
    blocks: [
      {
        action: feedbackActions.noAction,
        animation: 'rest',
        audio_urls: ['/example/1'],
        endPosition: {
          x: 600,
          y: 600,
        },
        text: ['Enter main text/question for screen here'],
        type: readQuestionBlockType,
      },
    ],
    questionId: 'test',
    settings: {},
    animationContainer: { clientWidth: 0, clientHeight: 0 },
    previewMode: '',
    answers: {},
    feedbackScreenSettings: {},
    audioInstance: { clean: jest.fn(), stop: jest.fn() },
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CharacterAnim {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CharacterAnim {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
