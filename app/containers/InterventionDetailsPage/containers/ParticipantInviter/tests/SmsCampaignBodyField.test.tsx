/**
 * The counter already tells the user a message went UCS-2; this field tells
 * them which characters did it, and offers to undo the ones that were never
 * meant to be there (typographic punctuation pasted from a text editor).
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { SmsEncoding } from 'utils/smsBodyLength';

import { SmsCampaignBodyField, Props } from '../SmsCampaignBodyField';

const FIX_BUTTON = 'Replace with GSM-7 equivalents';
// Spelled out, a non-breaking space is indistinguishable from a space here.
const NBSP = String.fromCodePoint(0x00a0);
const WARNING = 'This message will be sent as Unicode';
const NO_FIX_HINT = /no safe equivalent/;
const FIXABLE_HINT = /These can be swapped/;

const counter = {
  length: 20,
  segments: 1,
  encoding: SmsEncoding.UCS2,
  lengthExceeded: false,
  segmentsExceeded: false,
};

const renderField = (props: Partial<Props> = {}) => {
  const onBodyChange = jest.fn();

  render(
    <IntlProvider locale={DEFAULT_LOCALE}>
      <SmsCampaignBodyField
        label="Message"
        body=""
        onBodyChange={onBodyChange}
        links={[]}
        onLinksChange={jest.fn()}
        counter={counter}
        maxLength={1600}
        dataCyPrefix="body"
        {...props}
      />
    </IntlProvider>,
  );

  return { onBodyChange };
};

it('says nothing when the body fits GSM-7', () => {
  renderField({ body: 'Hello, see you tomorrow!' });

  expect(screen.queryByText(WARNING)).not.toBeInTheDocument();
  expect(screen.queryByText(FIX_BUTTON)).not.toBeInTheDocument();
});

it('lists each fixable character once', () => {
  renderField({ body: '„Hello” – „again”' });

  expect(screen.getByText(WARNING)).toBeInTheDocument();
  expect(screen.getAllByText('„')).toHaveLength(1);
  expect(screen.getByText('”')).toBeInTheDocument();
  expect(screen.getByText('–')).toBeInTheDocument();
});

// A message written in a non-GSM alphabet would otherwise list every letter
// it contains, which names the alphabet rather than a mistake.
it('names no characters at all for a body written in Arabic', () => {
  renderField({ body: 'تعال غدا' });

  expect(screen.getByText(WARNING)).toBeInTheDocument();
  expect(screen.getByText(NO_FIX_HINT)).toBeInTheDocument();
  expect(screen.queryByText(FIXABLE_HINT)).not.toBeInTheDocument();
  expect(screen.queryByText('ت')).not.toBeInTheDocument();
});

it('names only the fixable character in a mixed Polish body', () => {
  renderField({ body: 'Środowa wizyta – jutro' });

  expect(screen.getByText('–')).toBeInTheDocument();
  expect(screen.queryByText('Ś')).not.toBeInTheDocument();
});

it('names a character that has no glyph to point at', () => {
  renderField({ body: `see you${NBSP}tomorrow` });

  expect(screen.getByText('blank space')).toBeInTheDocument();
});

it('replaces the fixable characters on click, keeping the rest', async () => {
  const { onBodyChange } = renderField({
    body: `Życzę zdrowia – do${NBSP}jutra…`,
  });

  await userEvent.click(screen.getByText(FIX_BUTTON));

  expect(onBodyChange).toHaveBeenCalledWith('Życzę zdrowia - do jutra...');
});

it('says why an emoji gets no fix either', () => {
  renderField({ body: 'See you \ud83d\ude42' });

  expect(screen.queryByText(FIX_BUTTON)).not.toBeInTheDocument();
  expect(screen.getByText(NO_FIX_HINT)).toBeInTheDocument();
});

it('offers no fix when only diacritics force UCS-2, and says why', () => {
  renderField({ body: 'Życzę zdrowia' });

  expect(screen.getByText(WARNING)).toBeInTheDocument();
  expect(screen.queryByText('Ż')).not.toBeInTheDocument();
  expect(screen.queryByText(FIX_BUTTON)).not.toBeInTheDocument();
  expect(screen.getByText(NO_FIX_HINT)).toBeInTheDocument();
});

it('keeps quiet about diacritics when every character is fixable', () => {
  renderField({ body: 'Hello – see you…' });

  expect(screen.getByText(FIX_BUTTON)).toBeInTheDocument();
  expect(screen.queryByText(NO_FIX_HINT)).not.toBeInTheDocument();
});

it('shows the button and the hint together for a mixed body', () => {
  renderField({ body: 'Środowa wizyta – jutro' });

  expect(screen.getByText(FIX_BUTTON)).toBeInTheDocument();
  expect(screen.getByText(NO_FIX_HINT)).toBeInTheDocument();
});
