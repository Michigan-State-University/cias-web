/**
 *
 * Tests for TeamsList
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { Roles } from 'models/User/RolesManager';
import {
  TeamListReducer,
  initialState as init,
} from 'global/reducers/teamList';
import createModalForTests from 'utils/createModalForTests';
import { createTestStore } from 'utils/testUtils/storeUtils';

import { TeamBuilder } from 'models/Teams/TeamBuilder';
import TeamsList from '../index';

describe('<TeamsList />', () => {
  const initialState = (role) => ({
    auth: {
      user: { firstName: 'test', lastName: 'test', roles: [role] },
    },
    teamList: {
      ...init,
      teams: [
        new TeamBuilder()
          .withId('ta-1')
          .withName('Team 1')
          .withTeamAdmin({ name: 'TA 1', email: 'ta-1@test.pl', id: 'id-ta-1' })
          .build(),
        new TeamBuilder()
          .withId('ta-2')
          .withName('Team 2')
          .withTeamAdmin({ name: 'TA 2', email: 'ta-2@test.pl', id: 'id-ta-2' })
          .build(),
        new TeamBuilder()
          .withId('ta-3')
          .withName('Team 3')
          .withTeamAdmin({ name: 'TA 3', email: 'ta-3@test.pl', id: 'id-ta-3' })
          .build(),
      ],
    },
  });
  const storeAdmin = createTestStore(initialState(Roles.admin));

  beforeAll(() => {
    createModalForTests();
    storeAdmin.injectedReducers = {
      teamList: TeamListReducer,
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={storeAdmin}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <TeamsList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={storeAdmin}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <TeamsList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
