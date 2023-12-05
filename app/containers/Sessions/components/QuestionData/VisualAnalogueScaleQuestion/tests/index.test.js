import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { visualAnalogueScaleQuestion } from 'models/Session/QuestionTypes';
import { InterventionStatus } from 'models/Intervention';

import { createTestStore } from 'utils/testUtils/storeUtils';

import VisualAnalogueScaleQuestion from '../index';

const mockedFunctions = {
  updateLabel: jest.fn(),
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
        type: visualAnalogueScaleQuestion.id,
        body: {
          variable: {
            name: 'test',
          },
          data: [
            {
              payload: {
                start_value: '1',
                end_value: '100',
              },
            },
          ],
        },
        on: 1,
        question_group_id: 'test',
        settings: { show_number: true },
      },
    ],
    selectedQuestion: 'test',
  },
};

const store = createTestStore(initialState);

describe('<VisualAnalogueScaleQuestion />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <VisualAnalogueScaleQuestion {...defaultProps} />
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
            <VisualAnalogueScaleQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
