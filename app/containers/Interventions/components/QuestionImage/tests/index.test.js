import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import QuestionImage from '../index';

let store;
const reducer = state => state;
const testId = 'test-id';
const initialState = {
  questions: {
    selectedQuestion: testId,
    questions: [{ id: testId, image_url: null }],
  },
};
beforeAll(() => {
  store = createStore(reducer, initialState);
  store.runSaga = () => {};
  store.injectedReducers = {};
  store.injectedSagas = {};
});

describe('<QuestionImage />', () => {
  it('should match the snapshot without file', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionImage />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot with file', () => {
    const newState = {
      questions: {
        selectedQuestion: testId,
        questions: [{ id: testId, image_url: 'mokc_url.png' }],
      },
    };
    store = createStore(reducer, newState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};

    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionImage />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
