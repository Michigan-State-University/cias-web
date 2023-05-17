/**
 *
 * Tests for CharacterAnim
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { EFeedbackAction } from 'models/Narrator/FeedbackActions';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';
import { createTestStore } from 'utils/testUtils/storeUtils';

import { CharacterType } from 'models/Character';
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
        action: EFeedbackAction.NO_ACTION,
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
    settings: { character: CharacterType.PEEDY },
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
          <MemoryRouter>
            <CharacterAnim {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <CharacterAnim {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
