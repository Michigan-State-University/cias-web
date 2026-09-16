/**
 *
 * Tests for SessionBranching
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { browserHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

import SessionBranching from '../index';

const defaultProps = {
  nextSessionName: 'test-2',
  session: {},
};

describe('<SessionBranching />', () => {
  let store;

  beforeAll(() => {
    store = configureStore(browserHistory, {});
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <SessionBranching {...defaultProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <SessionBranching {...defaultProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
