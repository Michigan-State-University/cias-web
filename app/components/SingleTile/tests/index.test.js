/**
 *
 * Tests for SingleInterventionPanel
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import configureStore from 'configureStore';
import { Provider } from 'react-redux';
import SingleTile from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const defaultProps = {
  tileData: {
    name: 'Name',
    status: 'draft',
  },
  interventions: [{}, {}, {}],
  link: '#',
};

describe('<SingleTile />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <SingleTile {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <SingleTile {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
