/**
 * `Tabs` selects which child to render by comparing a **translated label string**
 * (`components/Tabs/index.js:70`), so a component-level test of `TestLinkTab` stays green even when
 * its content cannot be reached from the modal at all. The first test below drives the real `Tabs`
 * with the real label, and is the only thing that fails if that coupling breaks.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { ParticipantListView } from '../ParticipantListView';

const OWNER_ID = 'user-1';
const INTERVENTION_ID = 'int-1';

const EMAIL_TAB = 'E-mail participants';
const TEST_PARTICIPANTS_TAB = 'Test participants';

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
  interventionName: 'Intervention 1',
  interventionLanguageCode: 'en',
  invitingPossible: true,
  copyingInvitationLinkPossible: true,
  creatingPredefinedParticipantsPossible: true,
  sessionOptions: [{ value: 's-1', label: 'Session 1' }],
  healthClinicOptions: [],
  normalizedSessions: {},
  normalizedHealthClinicsInfos: {},
  onInvite: jest.fn(),
  onUploadEmails: jest.fn(),
  onManage: jest.fn(),
};

const renderView = (store: any, props = {}) => {
  const setActiveTab = jest.fn();
  const utils = render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ParticipantListView
          {...defaultProps}
          activeTab={EMAIL_TAB}
          setActiveTab={setActiveTab}
          {...props}
        />
      </IntlProvider>
    </Provider>,
  );
  return { ...utils, setActiveTab };
};

describe('<ParticipantListView /> — test participants tab', () => {
  it('renders the test-link content when its tab is the active one', () => {
    renderView(buildStore(), { activeTab: TEST_PARTICIPANTS_TAB });

    expect(
      screen.getByText('Copy test link to this session'),
    ).toBeInTheDocument();
  });

  it('offers the tab button to a researcher who can mint', () => {
    renderView(buildStore());

    expect(screen.getByText(TEST_PARTICIPANTS_TAB)).toBeInTheDocument();
  });

  it('hides the tab button from a user who cannot manage the intervention', () => {
    renderView(buildStore('someone-else'));

    expect(screen.queryByText(TEST_PARTICIPANTS_TAB)).not.toBeInTheDocument();
  });

  it('hides the tab button when link invitations are not possible', () => {
    renderView(buildStore(), { copyingInvitationLinkPossible: false });

    expect(screen.queryByText(TEST_PARTICIPANTS_TAB)).not.toBeInTheDocument();
  });

  it('falls back to the first tab when the active test tab becomes unavailable', () => {
    const { setActiveTab } = renderView(buildStore('someone-else'), {
      activeTab: TEST_PARTICIPANTS_TAB,
    });

    expect(setActiveTab).toHaveBeenCalledWith(EMAIL_TAB);
  });

  it('does not reset the tab while the test tab is still available', () => {
    const { setActiveTab } = renderView(buildStore(), {
      activeTab: TEST_PARTICIPANTS_TAB,
    });

    expect(setActiveTab).not.toHaveBeenCalled();
  });
});
