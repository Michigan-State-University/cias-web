import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { draft } from 'models/Status/StatusTypes';
import { urlQuestion } from 'models/Session/QuestionTypes';
import { createTestStore } from 'utils/testUtils/storeUtils';

import UrlQuestion from '../index';

const mockedFunctions = {
  updateUrl: jest.fn(),
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
        type: urlQuestion.id,
        body: {
          variable: { name: '' },
          data: [{ payload: 'www.google.com' }],
        },
        on: 1,
        question_group_id: 'test',
      },
    ],
    selectedQuestion: 'test',
  },
};

const store = createTestStore(initialState);

describe('<UrlQuestion />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UrlQuestion {...defaultProps} />
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
            <UrlQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
