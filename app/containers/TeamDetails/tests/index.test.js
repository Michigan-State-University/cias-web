/**
 *
 * Tests for TeamDetails
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DEFAULT_LOCALE } from 'i18n';

import { initialState as authState } from 'global/reducers/auth';
import { createTestStore } from 'utils/testUtils/storeUtils';
import { TeamBuilder } from 'models/Teams/TeamBuilder';
import intlOutsideReact from 'utils/intlOutsideReact';
import { Roles } from 'models/User/RolesManager';
import { TeamDetails } from '../index';

describe('<TeamDetails />', () => {
  let props;
  const initialState = {
    auth: {
      ...authState,
      user: {
        id: '1',
        roles: [Roles.admin],
      },
    },
    teamList: {
      singleTeam: new TeamBuilder()
        .withId('ta-1')
        .withName('Team 1')
        .withTeamAdmin({ name: 'TA 1', email: 'ta-1@test.pl', id: 'id-ta-1' })
        .build(),
      loaders: { singleTeamLoading: false },
      errors: { singleTeamError: null },
    },
  };
  let store;

  beforeEach(() => {
    store = createTestStore(initialState);

    props = {
      user: initialState.auth.user,
      teamList: initialState.teamList,
      match: {
        params: {
          id: 'ta-1',
        },
      },
      fetchTeam: jest.fn(),
      intl: intlOutsideReact,
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <TeamDetails {...props} />
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
            <TeamDetails {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
