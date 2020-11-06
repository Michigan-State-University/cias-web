import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import QuestionTitle from '../index';
import { DEFAULT_LOCALE } from '../../../../../i18n';

describe('<QuestionTitle />', () => {
  let store;
  const testId = 'test-id';
  const reducer = state => state;
  const initialState = {
    questions: {
      questions: [
        {
          id: testId,
          title: 'Example title',
        },
      ],
      selectedQuestion: testId,
    },
  };

  const defaultProps = {
    updateTitle: jest.fn(),
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedSagas = {};
    store.injectedReducers = {};
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionTitle {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionTitle {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
