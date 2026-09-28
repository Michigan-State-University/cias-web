import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { TestLinkTab } from '../TestLinkTab';

const OWNER_ID = 'user-1';
const INTERVENTION_ID = 'int-1';

const intervention = {
  id: INTERVENTION_ID,
  userId: OWNER_ID,
  hasCollaborators: false,
  currentEditor: null,
  sessions: [{ id: 's-1', name: 'Session 1', languageCode: 'en' }],
};

const buildStore = (currentUserId = OWNER_ID) => {
  const state = {
    auth: { user: { id: currentUserId, roles: ['researcher'] } },
    intervention: {
      intervention,
      cache: { intervention: null },
      loaders: { generateTestLink: {} },
      errors: { generateTestLink: {} },
    },
  };

  return {
    dispatch: jest.fn(),
    getState: () => state,
    subscribe: () => () => {},
    replaceReducer: () => {},
  } as any;
};

const defaultProps = {
  isModularIntervention: false,
  isReportingIntervention: false,
  interventionId: INTERVENTION_ID,
  interventionLanguageCode: 'en',
  sessionOptions: [{ value: 's-1', label: 'Session 1' }],
  healthClinicOptions: [],
};

const renderTab = (store: any, props = {}) =>
  render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestLinkTab {...defaultProps} {...props} />
      </IntlProvider>
    </Provider>,
  );

describe('<TestLinkTab />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderTab(buildStore());
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = renderTab(buildStore());
    expect(container).toMatchSnapshot();
  });

  it('renders the session test-link control and the caveat', () => {
    renderTab(buildStore());

    expect(
      screen.getByText('Copy test link to this session'),
    ).toBeInTheDocument();
    expect(screen.getByText(/private or incognito window/)).toBeInTheDocument();
  });

  it('renders nothing for a user who cannot manage the intervention', () => {
    renderTab(buildStore('someone-else'));

    expect(
      screen.queryByText('Copy test link to this session'),
    ).not.toBeInTheDocument();
  });

  it('renders the intervention-level control too on a modular intervention', () => {
    renderTab(buildStore(), { isModularIntervention: true });

    expect(
      screen.getByText('Copy test link to this intervention'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Copy test link to this session'),
    ).toBeInTheDocument();
  });
});
