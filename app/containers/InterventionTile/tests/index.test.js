/**
 *
 * Tests for InterventionTile
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import { DEFAULT_LOCALE } from 'i18n';

import { Roles } from 'models/User/RolesManager';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { intlProviderConfig } from 'containers/AppLanguageProvider';

import InterventionTile from '../index';

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

describe('<InterventionTile />', () => {
  let store;
  let modalContainer;
  let mainAppContainer;
  const initialState = {
    auth: {
      user: {
        roles: [Roles.Admin],
      },
    },
  };

  beforeAll(() => {
    store = createTestStore(initialState);
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <InterventionTile {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
