import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import 'jest-styled-components';

import QuestionSubtitle from '../index';

describe('<QuestionSubtitle />', () => {
  let store;
  const testId = 'test-id';
  const reducer = (state) => state;
  const initialState = {
    questions: {
      questions: [
        {
          id: testId,
          subtitle: 'Example subtitle',
        },
      ],
      selectedQuestion: testId,
    },
  };

  const defaultProps = {
    updateSubtitle: jest.fn(),
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => ({
      cancel: () => {},
      toPromise: () => Promise.resolve(),
    });
    store.injectedSagas = {};
    store.injectedReducers = {};
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionSubtitle {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionSubtitle {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
