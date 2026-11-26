import React from 'react';
import { screen } from '@testing-library/react';

import { SmsCampaignLink, SmsCampaignLinkType } from 'models/SmsCampaign';

import { testRender } from 'utils/testUtils';

import { SmsCampaignPreview } from '../SmsCampaignPreview';

const PERSONAL_LINK_HINT = /personal link is added at the end/;

const link: SmsCampaignLink = {
  url: 'https://example.test/survey',
  variable: 'survey',
  linkType: SmsCampaignLinkType.WEBSITE,
};

const renderPreview = (body: string, links: SmsCampaignLink[] = []) =>
  testRender(<SmsCampaignPreview body={body} links={links} dataCy="preview" />);

const byDataCy = (container: HTMLElement, value: string) =>
  container.querySelector(`[data-cy="${value}"]`);

it('shows the body that was sent', () => {
  renderPreview('See you on Monday!');

  expect(screen.getByText(/See you on Monday!/)).toBeInTheDocument();
});

it('keeps the line breaks of the body', () => {
  const { container } = renderPreview('First line\nSecond line');

  const paragraph = byDataCy(container, 'preview-body');
  expect(paragraph).toHaveTextContent('First line Second line');
  expect(paragraph).toHaveStyle({ whiteSpace: 'pre-wrap' });
});

it('says that the personal link is appended, because it is not part of the body', () => {
  renderPreview('Hello');

  expect(screen.getByText(PERSONAL_LINK_HINT)).toBeInTheDocument();
});

it('lists the tracked links of the campaign with their tokens', () => {
  const { container } = renderPreview('Open ::survey:: please', [link]);

  expect(byDataCy(container, 'preview-links')).toBeInTheDocument();
  expect(screen.getByText('https://example.test/survey')).toBeInTheDocument();
  expect(screen.getAllByText('::survey::').length).toBeGreaterThan(0);
});

it('has no link section when the campaign had no links', () => {
  const { container } = renderPreview('Hello');

  expect(byDataCy(container, 'preview-links')).not.toBeInTheDocument();
});
