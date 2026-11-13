import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import {
  SmsCampaign,
  SmsCampaignKind,
  SmsCampaignLinkType,
  SmsCampaignStatus,
} from 'models/SmsCampaign';

import { initialState as smsCampaignsInitialState } from 'global/reducers/smsCampaigns';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { SmsCampaignsList } from '../SmsCampaignsList';

const INTERVENTION_ID = 'int-1';

const campaign = (overrides: Partial<SmsCampaign> = {}): SmsCampaign => ({
  id: 'campaign-1',
  kind: SmsCampaignKind.INVITATION,
  status: SmsCampaignStatus.SENT,
  scheduledAt: '2026-11-02T10:00:00.000Z',
  sentAt: '2026-11-02T10:00:00.000Z',
  acceptedCount: 2,
  failedCount: 0,
  recipientsCount: 2,
  scheduledAtProvisional: false,
  body: 'Invitation text',
  links: [],
  ...overrides,
});

const buildStore = (campaigns: SmsCampaign[]) =>
  createTestStore({
    smsCampaigns: { ...smsCampaignsInitialState, campaigns },
  });

const renderList = (campaigns: SmsCampaign[]) =>
  render(
    <Provider store={buildStore(campaigns)}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SmsCampaignsList interventionId={INTERVENTION_ID} />
      </IntlProvider>
    </Provider>,
  );

it('keeps the text hidden until the campaign is opened', () => {
  renderList([campaign()]);

  expect(screen.queryByText('Invitation text')).not.toBeInTheDocument();
});

it('shows the text of the campaign that was opened', async () => {
  renderList([campaign()]);

  await userEvent.click(screen.getByLabelText('Show the message'));

  expect(screen.getByText('Invitation text')).toBeInTheDocument();
});

it('hides the text again when the campaign is closed', async () => {
  renderList([campaign()]);

  await userEvent.click(screen.getByLabelText('Show the message'));
  await userEvent.click(screen.getByLabelText('Hide the message'));

  expect(screen.queryByText('Invitation text')).not.toBeInTheDocument();
});

it('opens a reminder without closing the invitation, because the two texts differ', async () => {
  renderList([
    campaign(),
    campaign({
      id: 'campaign-2',
      kind: SmsCampaignKind.SCHEDULED_REMINDER,
      body: 'Reminder text',
    }),
  ]);

  const [first, second] = screen.getAllByLabelText('Show the message');
  await userEvent.click(first);
  await userEvent.click(second);

  expect(screen.getByText('Invitation text')).toBeInTheDocument();
  expect(screen.getByText('Reminder text')).toBeInTheDocument();
});

it('shows the links of the opened campaign', async () => {
  renderList([
    campaign({
      body: 'Open ::survey::',
      links: [
        {
          url: 'https://example.test/survey',
          variable: 'survey',
          linkType: SmsCampaignLinkType.WEBSITE,
        },
      ],
    }),
  ]);

  await userEvent.click(screen.getByLabelText('Show the message'));

  expect(screen.getByText('https://example.test/survey')).toBeInTheDocument();
});
