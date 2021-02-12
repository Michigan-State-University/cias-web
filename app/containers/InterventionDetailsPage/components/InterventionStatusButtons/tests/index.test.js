/**
 *
 * Tests for InterventionStatusButtons
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';

import { Roles } from 'models/User/UserRoles';

import InterventionStatusButtons from '../index';

const statuses = ['draft', 'published', 'closed'];

describe('<InterventionStatusButtons />', () => {
  let modalContainer;
  let store;
  const reducer = state => state;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
  });

  const initialState = {
    auth: {
      user: { firstName: 'test', lastName: 'test', roles: [Roles.admin] },
    },
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InterventionStatusButtons />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    statuses.forEach(status => {
      const {
        container: { firstChild: renderedComponent },
      } = render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <InterventionStatusButtons status={status} />
          </IntlProvider>
        </Provider>,
      );
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
