/**
 *
 * Tests for BranchingLayout
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import { browserHistory } from 'react-router-dom';

import BranchingLayout from '../index';

describe('<BranchingLayout />', () => {
  let store;
  let props;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    props = { formula: { patterns: [] } };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BranchingLayout {...props} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <BranchingLayout {...props} />
        </Provider>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
