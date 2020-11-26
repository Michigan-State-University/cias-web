/**
 *
 * Tests for GridQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { gridQuestion } from 'models/Intervention/QuestionTypes';
import { draft } from 'models/Status/StatusTypes';

import GridQuestion from '../index';

describe('<GridQuestion />', () => {
  const mockedFunctions = {
    addRow: jest.fn(),
    addColumn: jest.fn(),
    updateRow: jest.fn(),
    updateColumn: jest.fn(),
    deleteRow: jest.fn(),
    deleteColumn: jest.fn(),
  };

  const defaultProps = {
    isNarratorTab: false,
    problemStatus: draft,
    ...mockedFunctions,
  };
  const initialState = {
    questions: {
      questions: [
        {
          id: 'test',
          title: 'test-title',
          subtitle: 'test-subtitle',
          type: gridQuestion.id,
          body: {
            data: [
              {
                payload: {
                  rows: [
                    {
                      variable: {
                        name: '11',
                      },
                      payload: 'test-row-1',
                    },
                    {
                      variable: {
                        name: '22',
                      },
                      payload: 'test-row-2',
                    },
                  ],
                  columns: [
                    {
                      variable: {
                        value: '1',
                      },
                      payload: 'test-col-1',
                    },
                    {
                      variable: {
                        value: '2',
                      },
                      payload: 'test-col-2',
                    },
                  ],
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
            <GridQuestion {...defaultProps} />
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
            <GridQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
