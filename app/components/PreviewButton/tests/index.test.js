/**
 *
 * Tests for PreviewButton
 *
 */

import React from 'react';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import configureStore from 'configureStore';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import PreviewButton from '../index';

describe('<PreviewButton />', () => {
  let store;
  const props = {
    to: '',
  };

  beforeAll(() => {
    store = configureStore(browserHistory, {});
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <PreviewButton {...props} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and match the snapshot of disabled button', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <PreviewButton {...props} previewDisabled />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
