/**
 *
 * Tests for DateQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { DEFAULT_LOCALE } from 'i18n';

import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import DateQuestion from '../DateQuestion';

let capturedLayoutOnChange = null;

jest.mock('../../layouts/DateQuestionLayout', () => (props) => {
  capturedLayoutOnChange = props.onChange;
  return null;
});

describe('<DateQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
    formatMessage,
    showError: jest.fn(),
  };

  let store;
  beforeAll(() => {
    store = createTestStore();
  });

  beforeEach(() => {
    mockedFunctions.selectAnswer.mockClear();
    capturedLayoutOnChange = null;
  });

  const defaultProps = {
    question: {
      body: {
        variable: { name: 'my_date_var' },
      },
    },
    answerBody: [],
    ...mockedFunctions,
  };

  const renderComponent = (props = defaultProps) =>
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <DateQuestion {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('dispatches the locally-clicked calendar day via toDateString', () => {
    // The fix's core invariant: a Date constructed from local components
    // (which is what react-datepicker passes to onChange) must serialize to
    // the same local calendar day, regardless of system timezone. Date#toDateString
    // reads local components and never touches UTC, so the round-trip is stable.
    renderComponent();

    const clickedLocalDate = new Date(2026, 4, 11, 0, 0, 0);
    capturedLayoutOnChange(clickedLocalDate);

    const expectedValue = clickedLocalDate.toDateString();
    expect(mockedFunctions.selectAnswer).toHaveBeenCalledWith([
      { var: 'my_date_var', value: expectedValue },
    ]);

    // Sanity-check the round-trip: re-parsing must recover the same local Y/M/D.
    const reparsed = new Date(expectedValue);
    expect(reparsed.getFullYear()).toBe(2026);
    expect(reparsed.getMonth()).toBe(4); // May (0-indexed)
    expect(reparsed.getDate()).toBe(11);
  });

  it('ignores null/undefined onChange events', () => {
    renderComponent();

    capturedLayoutOnChange(null);
    capturedLayoutOnChange(undefined);

    expect(mockedFunctions.selectAnswer).not.toHaveBeenCalled();
  });
});
