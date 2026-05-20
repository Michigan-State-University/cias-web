/**
 *
 * Tests for DateQuestionLayout
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_LOCALE } from 'i18n';
import { createTestStore } from 'utils/testUtils/storeUtils';

import DateQuestionLayout from '../DateQuestionLayout';

let capturedInputValue;

jest.mock('components/Input/ApprovableInput', () => (props) => {
  capturedInputValue = props.value;
  return null;
});

describe('<DateQuestionLayout />', () => {
  let store;
  beforeAll(() => {
    store = createTestStore();
  });

  beforeEach(() => {
    capturedInputValue = undefined;
  });

  const renderLayout = (answerBody) =>
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <DateQuestionLayout
              onChange={jest.fn()}
              answerBody={answerBody}
              disabled={false}
            />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );

  it('renders without console errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderLayout({ value: 'Mon May 11 2026' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('parses the historical toDateString() format as the same local calendar day', () => {
    // The write side stores Date#toDateString output (e.g. "Mon May 11 2026").
    // The read side must reconstruct a Date with the same local Y/M/D in any
    // timezone — never going through UTC, which would shift the day.
    renderLayout({ value: 'Mon May 11 2026' });

    expect(capturedInputValue).toBeInstanceOf(Date);
    expect(capturedInputValue.getFullYear()).toBe(2026);
    expect(capturedInputValue.getMonth()).toBe(4); // May (0-indexed)
    expect(capturedInputValue.getDate()).toBe(11);
  });

  it('parses ISO yyyy-MM-dd values (from the 2026-04-10 → fix-deploy window) as local', () => {
    // Between 2026-04-10 and the CIAS-4180 fix, the write side stored
    // "yyyy-MM-dd". Parsing those rows with Date.parse would yield UTC
    // midnight (the original bug). The ISO regex branch builds a Date from
    // local components instead, keeping the picker on the correct day.
    renderLayout({ value: '2026-05-11' });

    expect(capturedInputValue).toBeInstanceOf(Date);
    expect(capturedInputValue.getFullYear()).toBe(2026);
    expect(capturedInputValue.getMonth()).toBe(4); // May (0-indexed)
    expect(capturedInputValue.getDate()).toBe(11);
  });

  it('passes null when answerBody has no value', () => {
    renderLayout(undefined);
    expect(capturedInputValue).toBeNull();
  });

  it('passes null when answerBody.value is an empty string', () => {
    renderLayout({ value: '' });
    expect(capturedInputValue).toBeNull();
  });

  it('passes null for an unparseable value (instead of an Invalid Date)', () => {
    renderLayout({ value: 'not-a-date-at-all' });
    expect(capturedInputValue).toBeNull();
  });
});
