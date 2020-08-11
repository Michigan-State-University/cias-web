/**
 *
 * Tests for InterventionListBranching
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { browserHistory } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

import InterventionListBranching from '../index';

const defaultProps = {
  nextInterventionName: 'test-2',
};

describe('<InterventionListBranching />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <InterventionListBranching {...defaultProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Provider store={store}>
            <InterventionListBranching {...defaultProps} />
          </Provider>
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
