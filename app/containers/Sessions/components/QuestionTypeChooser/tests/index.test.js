import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import { SessionTypes } from 'models/Session';
import QuestionTypeChooser from '../index';

describe('<QuestionTypeChooser />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionTypeChooser
            onClick={jest.fn()}
            sessionType={SessionTypes.CLASSIC_SESSION}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionTypeChooser
            onClick={jest.fn()}
            sessionType={SessionTypes.CLASSIC_SESSION}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot while being open', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionTypeChooser
            onClick={jest.fn()}
            sessionType={SessionTypes.CLASSIC_SESSION}
          />
        </IntlProvider>
      </Provider>,
    );

    const button = getByText('+ Add new screen');
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
  });
});
