/**
 *
 * Tests for QuestionSettings
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import QuestionSettings from '../index';

describe('<QuestionSettings />', () => {
  const defaultProps = {
    toggleSettings: jest.fn(),
  };
  const initialState = {
    localState: {
      questionSettings: { visibility: true },
    },
    questions: {
      questions: [
        {
          type: 'Question::Single',
          settings: {
            image: false,
            title: true,
            video: false,
            required: true,
            subtitle: true,
            proceed_button: true,
          },
          narrator: {
            blocks: [
              {
                text: ['Hello'],
                type: 'Speech',
                action: 'NO_ACTION',
                sha256: ['1'],
                animation: 'explain',
                audio_urls: ['/audio/1'],
                endPosition: {
                  x: 1,
                  y: 1,
                },
              },
            ],
            settings: {
              voice: true,
              animation: true,
            },
          },
          formula: {
            payload: '',
            patterns: [],
          },
          id: 'test',
        },
      ],
      selectedQuestion: 'test',
    },
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <QuestionSettings {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <QuestionSettings {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
