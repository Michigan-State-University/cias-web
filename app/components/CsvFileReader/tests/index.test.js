/**
 *
 * Tests for CsvFileReader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'jest-styled-components';

import CsvFileReader from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const defaultProps = {
  icon: 'image.svg',
  onUpload: jest.fn(),
  showError: jest.fn(),
};

describe('<CsvFileReader />', () => {
  const reducer = state => state;
  const initialState = {};
  let store;
  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
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
});