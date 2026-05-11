import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import { SessionTypes } from 'models/Session';

import QuestionTypeChooser from '../index';

describe('<QuestionTypeChooser /> for RA session', () => {
  let store;

  beforeAll(() => {
    store = configureStore(browserHistory, {});
  });

  const renderOpen = (sessionType) => {
    const result = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionTypeChooser onClick={jest.fn()} sessionType={sessionType} />
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(result.getByText('+ Add new screen'));
    return result;
  };

  it('shows only Single answer, Number, and Date for RA sessions', () => {
    const { getByText, queryByText } = renderOpen(SessionTypes.RA_SESSION);

    expect(getByText('Single answer')).toBeTruthy();
    expect(getByText('Number')).toBeTruthy();
    expect(getByText('Date')).toBeTruthy();

    expect(queryByText('Multi answer')).toBeNull();
    expect(queryByText('Free Response')).toBeNull();
    expect(queryByText('Slider')).toBeNull();
    expect(queryByText('Information Only')).toBeNull();
    expect(queryByText('Phone')).toBeNull();
    expect(queryByText('Grid')).toBeNull();
  });

  it('does not show TLFB group for RA sessions', () => {
    const { queryByText } = renderOpen(SessionTypes.RA_SESSION);

    expect(queryByText('Timeline Followback')).toBeNull();
  });

  it('shows the full Classic list for Classic sessions', () => {
    const { getByText } = renderOpen(SessionTypes.CLASSIC_SESSION);

    expect(getByText('Single answer')).toBeTruthy();
    expect(getByText('Number')).toBeTruthy();
    expect(getByText('Date')).toBeTruthy();
    expect(getByText('Multi answer')).toBeTruthy();
    expect(getByText('Free Response')).toBeTruthy();
    expect(getByText('Slider')).toBeTruthy();
    expect(getByText('Information Only')).toBeTruthy();
  });
});
