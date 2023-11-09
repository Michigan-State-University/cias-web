/**
 *
 * Tests for FeedbackQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { feedbackQuestion } from 'models/Session/QuestionTypes';
import { InterventionStatus } from 'models/Intervention';

import { createTestStore } from 'utils/testUtils/storeUtils';

import FeedbackQuestion from '../index';

describe('<FeedbackQuestion />', () => {
  const mockedFunctions = {
    onUpdateLabel: jest.fn(),
  };

  const defaultProps = {
    isNarratorTab: false,
    interventionStatus: InterventionStatus.DRAFT,
    ...mockedFunctions,
  };
  const initialState = {
    questions: {
      questions: [
        {
          id: 'test',
          title: 'test-title',
          subtitle: 'test-subtitle',
          type: feedbackQuestion.id,
          body: {
            data: [
              {
                payload: {
                  start_value: '0',
                  end_value: '100',
                  target_value: '',
                },
                spectrum: {
                  payload: '1',
                  patterns: [
                    {
                      match: '=1',
                      target: '50',
                    },
                    {
                      match: '=2',
                      target: '75',
                    },
                  ],
                },
              },
            ],
          },
          position: 1,
          question_group_id: 'test',
          settings: { show_number: true },
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
            <FeedbackQuestion {...defaultProps} />
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
            <FeedbackQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
