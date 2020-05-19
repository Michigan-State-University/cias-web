/**
 *
 * Tests for CreateInterventionPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import CreateInterventionPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

describe('<CreateInterventionPage />', () => {
  let store;
  let dispatch;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    dispatch = jest.fn();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CreateInterventionPage dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CreateInterventionPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
