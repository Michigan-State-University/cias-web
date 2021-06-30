/**
 *
 * Tests for TextboxQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { textboxQuestion } from 'models/Session/QuestionTypes';
import { draft } from 'models/Status/StatusTypes';

import TextboxQuestion from '../index';

describe('<TextboxQuestion />', () => {
  const mockedFunctions = {
    updateAnswer: jest.fn(),
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
          type: textboxQuestion.id,
          body: {
            variable: {
              name: 'test',
            },
            data: [
              {
                payload: '',
              },
            ],
          },
          position: 1,
          question_group_id: 'test',
          settings: {
            text_limit: 250,
          },
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
            <TextboxQuestion {...defaultProps} />
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
            <TextboxQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
