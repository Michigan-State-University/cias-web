/**
 * The gate is nothing but its placement, and nothing else in the suite fails if the two route
 * wrappers are unwired — so this pins them.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { Roles } from 'models/User/RolesManager';

import App from '../index';

const GATE_ID = 'test-link-token-gate';

jest.mock('containers/TestLinkTokenGate', () => {
  // eslint-disable-next-line global-require
  const ReactModule = require('react');

  return {
    __esModule: true,
    default: ({ interventionId }) =>
      ReactModule.createElement('div', {
        'data-testid': 'test-link-token-gate',
        'data-intervention-id': interventionId ?? '',
      }),
  };
});

const store = createTestStore({
  auth: {
    user: {
      firstName: 'first-name',
      lastName: 'last-name',
      roles: [Roles.Participant],
    },
  },
});

const renderAppAt = (path) =>
  render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );

describe('test link gating of the two landing routes', () => {
  it('wraps the invite page in the gate, scoped to the route’s intervention', () => {
    renderAppAt('/interventions/intervention-1/invite');

    const gate = screen.getByTestId(GATE_ID);

    expect(gate).toBeInTheDocument();
    expect(gate).toHaveAttribute('data-intervention-id', 'intervention-1');
  });

  it('wraps the fill page in the gate, scoped to the route’s intervention', () => {
    renderAppAt('/interventions/intervention-2/sessions/session-9/fill');

    const gate = screen.getByTestId(GATE_ID);

    expect(gate).toBeInTheDocument();
    expect(gate).toHaveAttribute('data-intervention-id', 'intervention-2');
  });

  it('leaves an ungated route alone', () => {
    renderAppAt('/reports');

    expect(screen.queryByTestId(GATE_ID)).not.toBeInTheDocument();
  });
});
