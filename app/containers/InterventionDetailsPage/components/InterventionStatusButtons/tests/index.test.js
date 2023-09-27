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
import { Provider } from 'react-redux';

import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';

import { Roles } from 'models/User/RolesManager';
import {
  draft,
  INITIAL_STATUSES_FILTER_VALUE,
} from 'models/Status/StatusTypes';

import { createTestStore } from 'utils/testUtils/storeUtils';
import InterventionStatusButtons from '../index';

describe('<InterventionStatusButtons />', () => {
  let modalContainer;
  let store;

  const initialState = {
    auth: {
      user: { firstName: 'test', lastName: 'test', roles: [Roles.Admin] },
    },
  };

  const defaultProps = {
    csvGeneratedAt: '1/12/2021',
    csvLink: 'http://example.com',
  };

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');

    document.body.appendChild(modalContainer);

    store = createTestStore(initialState);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InterventionStatusButtons status={draft} {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    INITIAL_STATUSES_FILTER_VALUE.forEach((status) => {
      const { container } = render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <InterventionStatusButtons status={status} {...defaultProps} />
          </IntlProvider>
        </Provider>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
