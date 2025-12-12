/**
 *
 * Tests for SessionCreateButton
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';

import createModalForTests from 'utils/createModalForTests';
import SessionCreateButton from '../index';
import configureStore from '../../../../../configureStore';

describe('<SessionCreateButton />', () => {
  let store;

  beforeAll(() => {
    store = configureStore(browserHistory, {});
    createModalForTests();
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <SessionCreateButton />
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
          <SessionCreateButton />
        </Provider>
      </IntlProvider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
