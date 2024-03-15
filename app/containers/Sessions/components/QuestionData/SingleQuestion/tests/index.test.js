/**
 *
 * Tests for SingleQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { singleQuestion } from 'models/Session/QuestionTypes';
import { InterventionStatus } from 'models/Intervention';

import { createTestStore } from 'utils/testUtils/storeUtils';

import SingleQuestion from '../index';

describe('<SingleQuestion />', () => {
  const mockedFunctions = {
    addAnswer: jest.fn(),
    updateAnswer: jest.fn(),
    removeAnswer: jest.fn(),
    reorderAnswers: jest.fn(),
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
          type: singleQuestion.id,
          body: {
            data: [
              {
                value: '1',
                payload: 'test-1',
              },
              {
                value: '2',
                payload: 'test-2',
              },
            ],
            variable: {
              name: '1',
            },
          },
          position: 1,
          question_group_id: 'test',
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
            <SingleQuestion {...defaultProps} />
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
            <SingleQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
