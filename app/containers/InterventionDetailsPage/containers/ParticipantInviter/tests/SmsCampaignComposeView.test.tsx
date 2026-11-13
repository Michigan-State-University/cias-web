/**
 * A campaign cannot be taken back once the backend starts sending, so the submit
 * button asks first - for the invitation and for the manual reminder alike. What
 * matters is that nothing reaches the store until the confirmation is accepted,
 * and that the count shown is the upper bound the participant list allows
 * (see `utils/smsCampaignRecipients`).
 */
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { MODAL_PORTAL_ID } from 'containers/App/constants';

import { SmsCampaignComposableKind, SmsCampaignKind } from 'models/SmsCampaign';

import {
  createSmsCampaignRequest,
  initialState as smsCampaignsInitialState,
} from 'global/reducers/smsCampaigns';

import { MANUAL_REMINDER_INTERVAL_HOURS } from 'utils/smsCampaignRecipients';
import { createTestStore } from 'utils/testUtils/storeUtils';

import Modal from 'components/Modal';
import modalMessages from 'components/Modal/messages';

import { SmsCampaignComposeView } from '../SmsCampaignComposeView';
import messages from '../messages';

const INTERVENTION_ID = 'int-1';
const INVITED_AT = '2026-10-30T12:00:00.000Z';

// Taken from the message descriptors, so a copy edit cannot silently turn
// these queries into "element not found".
const SUBMIT_LABEL = {
  [SmsCampaignKind.INVITATION]:
    messages.smsCampaignSendInvitationSubmit.defaultMessage,
  [SmsCampaignKind.MANUAL_REMINDER]:
    messages.smsCampaignSendReminderSubmit.defaultMessage,
};
const CANCEL_LABEL = modalMessages.cancel.defaultMessage;

const meta = {
  personalLinkExpectedLength: 34,
  trackedLinkExpectedLength: 36,
  gsm7SegmentLengths: [160, 153],
  ucs2SegmentLengths: [70, 67],
  maxBodyLength: 1600,
  maxSegments: 24,
  maxReminderDaysAfter: 30,
};

const phone = { iso: 'US', prefix: '+1', number: '5551234567' };

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const participant = (id: string, overrides = {}) => ({
  id,
  active: true,
  phone,
  smsInvitationSentAt: null,
  lastReminderSentAt: null,
  ...overrides,
});

const predefinedParticipants = [
  participant('pp-1'),
  participant('pp-2'),
  participant('pp-3', { smsInvitationSentAt: INVITED_AT }),
  participant('pp-4', { active: false }),
  participant('pp-5', { phone: null }),
  participant('pp-6', {
    smsInvitationSentAt: INVITED_AT,
    lastReminderSentAt: hoursAgo(MANUAL_REMINDER_INTERVAL_HOURS + 6),
  }),
  participant('pp-7', {
    smsInvitationSentAt: INVITED_AT,
    lastReminderSentAt: hoursAgo(1),
  }),
];

const buildStore = (participants: unknown = predefinedParticipants) => {
  const store = createTestStore({
    intervention: { predefinedParticipants: participants },
    smsCampaigns: { ...smsCampaignsInitialState, meta },
  });
  jest.spyOn(store, 'dispatch');
  return store;
};

type RenderOptions = {
  store?: any;
  kind?: SmsCampaignComposableKind;
  /** Wraps the view the way the participant inviter really does. */
  wrapper?: (view: ReactElement) => ReactElement;
};

const renderView = ({
  store = buildStore(),
  kind = SmsCampaignKind.INVITATION,
  wrapper = (view) => view,
}: RenderOptions = {}) =>
  render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        {wrapper(
          <SmsCampaignComposeView
            interventionId={INTERVENTION_ID}
            kind={kind}
            onBack={jest.fn()}
          />,
        )}
      </IntlProvider>
    </Provider>,
  );

const createActions = (store: any) =>
  store.dispatch.mock.calls
    .map(([action]: [any]) => action)
    .filter(
      (action: any) => action?.type === createSmsCampaignRequest.toString(),
    );

const fillBodyAndSubmit = async (
  kind: SmsCampaignComposableKind = SmsCampaignKind.INVITATION,
  body = 'Please join our study.',
) => {
  await userEvent.type(screen.getByRole('textbox'), body);
  await userEvent.click(
    screen.getByRole('button', { name: SUBMIT_LABEL[kind] }),
  );
};

const confirmationDialog = () => within(screen.getAllByRole('dialog').at(-1)!);

const confirmButton = (
  kind: SmsCampaignComposableKind = SmsCampaignKind.INVITATION,
) => confirmationDialog().getByRole('button', { name: SUBMIT_LABEL[kind] });

const cancelButton = () =>
  confirmationDialog().getByRole('button', { name: CANCEL_LABEL });

describe('SmsCampaignComposeView - send confirmation', () => {
  // The modal renders through a portal; without its target it renders nothing.
  beforeEach(() => {
    const portal = document.createElement('div');
    portal.setAttribute('id', MODAL_PORTAL_ID);
    document.body.appendChild(portal);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not create the campaign until the confirmation is accepted', async () => {
    const store = buildStore();
    renderView({ store });

    await fillBodyAndSubmit();

    expect(
      screen.getByText(/The message will be sent to up to 2 participants/),
    ).toBeInTheDocument();
    expect(createActions(store)).toHaveLength(0);

    await userEvent.click(confirmButton());

    const [action] = createActions(store);
    expect(action).toBeDefined();
    expect(action.payload.data).toMatchObject({
      kind: SmsCampaignKind.INVITATION,
      body: 'Please join our study.',
    });
  });

  it('creates nothing when the confirmation is cancelled', async () => {
    const store = buildStore();
    renderView({ store });

    await fillBodyAndSubmit();
    await userEvent.click(cancelButton());

    expect(createActions(store)).toHaveLength(0);
    expect(
      screen.queryByText(/The message will be sent to up to/),
    ).not.toBeInTheDocument();
  });

  it('drops the number when the participant list has not been loaded', async () => {
    renderView({ store: buildStore(null) });

    await fillBodyAndSubmit();

    expect(
      screen.getByText(
        /The message will be sent to every active participant with a phone number/,
      ),
    ).toBeInTheDocument();
  });

  it('asks before a manual reminder, counting only participants past the cooldown', async () => {
    const store = buildStore();
    renderView({ store, kind: SmsCampaignKind.MANUAL_REMINDER });

    await fillBodyAndSubmit(SmsCampaignKind.MANUAL_REMINDER, 'Just a nudge.');

    expect(
      screen.getByText(/The message will be sent to up to 2 participants/),
    ).toBeInTheDocument();
    expect(createActions(store)).toHaveLength(0);

    await userEvent.click(confirmButton(SmsCampaignKind.MANUAL_REMINDER));

    const [action] = createActions(store);
    expect(action.payload.data).toMatchObject({
      kind: SmsCampaignKind.MANUAL_REMINDER,
      body: 'Just a nudge.',
    });
  });

  describe('inside the participant inviter modal', () => {
    const insideModal = (onOuterClose: jest.Mock) => (view: ReactElement) => (
      <Modal visible onClose={onOuterClose} title="Invite participants">
        {view}
      </Modal>
    );

    const renderInsideModal = (store = buildStore()) => {
      const onOuterClose = jest.fn();
      renderView({ store, wrapper: insideModal(onOuterClose) });
      return onOuterClose;
    };

    it('keeps the inviter open and the draft intact when the confirmation is cancelled', async () => {
      const store = buildStore();
      const onOuterClose = renderInsideModal(store);

      await fillBodyAndSubmit();
      await userEvent.click(cancelButton());

      expect(onOuterClose).not.toHaveBeenCalled();
      expect(createActions(store)).toHaveLength(0);
      expect(screen.getByRole('textbox')).toHaveValue('Please join our study.');
    });

    it('keeps the inviter open when the campaign is confirmed', async () => {
      const store = buildStore();
      const onOuterClose = renderInsideModal(store);

      await fillBodyAndSubmit();
      await userEvent.click(confirmButton());

      expect(onOuterClose).not.toHaveBeenCalled();
      expect(createActions(store)).toHaveLength(1);
    });

    /**
     * `Modal` registers its Escape handler on `document`, so EVERY open modal
     * reacts to the same key press - closing the inviter underneath along with
     * the confirmation. This pins the current behaviour; nothing is sent.
     */
    it('closes the inviter too when Escape is pressed over the confirmation', async () => {
      const store = buildStore();
      const onOuterClose = renderInsideModal(store);

      await fillBodyAndSubmit();
      // `useKeyPress` listens for `keyup` and reads the legacy `keyCode`.
      fireEvent.keyUp(document, { key: 'Escape', keyCode: 27, which: 27 });

      expect(createActions(store)).toHaveLength(0);
      expect(onOuterClose).toHaveBeenCalled();
    });
  });
});
