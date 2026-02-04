import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import BlockTypeChooser from '../index';

describe('<BlockTypeChooser />', () => {
  let store;

  beforeAll(() => {
    store = configureStore(browserHistory, {});
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BlockTypeChooser onClick={jest.fn()} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BlockTypeChooser onClick={jest.fn()} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot while being open', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BlockTypeChooser onClick={jest.fn()} />
        </IntlProvider>
      </Provider>,
    );

    const button = getByText('+ Add block');
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
  });
});
