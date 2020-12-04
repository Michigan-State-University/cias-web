/**
 *
 * Tests for SingleInterventionPanel
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
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
    id: 'test-id',
    status: 'draft',
    created_at: '2020-09-30T10:00:00',
    updated_at: '2020-09-30T10:00:00',
    user: {
      email: 'test@test.com',
      first_name: 'UserFirstName',
      last_name: 'UserLastName',
    },
  },
  sessions: [{}, {}, {}],
  link: '#',
};

describe('<SingleTile />', () => {
  let store;
  let modalContainer;
  let mainAppContainer;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
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
