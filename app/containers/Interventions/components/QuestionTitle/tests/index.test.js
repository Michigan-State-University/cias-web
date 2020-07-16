import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import QuestionTitle from '../index';
import { DEFAULT_LOCALE } from '../../../../../i18n';

describe('<QuestionTitle />', () => {
  let store;

  const reducer = state => state;
  const initialState = {
    editInterventionPage: {
      questions: [
        {
          title: 'Example title',
        },
      ],
      selectedQuestion: 0,
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
