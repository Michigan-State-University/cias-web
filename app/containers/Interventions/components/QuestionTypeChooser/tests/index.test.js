import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import ScreenTypeChooser from '../index';

describe('<ScreenTypeChooser />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ScreenTypeChooser onClick={jest.fn()} />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
