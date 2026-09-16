/**
 *
 * Tests for CsvFileReader
 *
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';
import CsvFileReader from '../index';

const defaultProps = {
  icon: 'image.svg',
  onUpload: jest.fn(),
  showError: jest.fn(),
};

describe('<CsvFileReader />', () => {
  const reducer = (state) => state;
  const initialState = {};
  let store;
  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => ({
      cancel: () => {},
      toPromise: () => Promise.resolve(),
    });
    store.injectedReducers = {};
    store.injectedSagas = {};
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CsvFileReader {...defaultProps}>Upload CSV</CsvFileReader>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CsvFileReader {...defaultProps}>Upload CSV</CsvFileReader>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should open the file reader', () => {
    const { getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CsvFileReader {...defaultProps}>Upload CSV</CsvFileReader>
        </IntlProvider>
      </Provider>,
    );
    const row = getByText('Upload CSV');
    fireEvent.click(row);
  });
});
