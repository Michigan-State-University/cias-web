/**
 *
 * Tests for MultiQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { multiQuestion } from 'models/Session/QuestionTypes';
import { draft } from 'models/Status/StatusTypes';

import MultiQuestion from '../index';

describe('<MultiQuestion />', () => {
  const mockedFunctions = {
    addAnswer: jest.fn(),
    updateAnswer: jest.fn(),
    removeAnswer: jest.fn(),
    reorderAnswers: jest.fn(),
  };

  const defaultProps = {
    isNarratorTab: false,
    interventionStatus: draft,
    ...mockedFunctions,
  };
  const initialState = {
    questions: {
      questions: [
        {
          id: 'test',
          title: 'test-title',
          subtitle: 'test-subtitle',
          type: multiQuestion.id,
          body: {
            data: [
              {
                payload: 'test',
                variable: {
                  name: 'test',
                  value: '1',
                },
              },
            ],
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
            <MultiQuestion {...defaultProps} />
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
            <MultiQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
