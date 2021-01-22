/**
 *
 * Tests for SessionSchedule
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';

import configureStore from 'configureStore';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SCHEDULE_OPTIONS } from 'global/reducers/intervention';
import SessionSchedule from '../index';

describe('<SessionSchedule />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  const exactDateProps = {
    selectedScheduleOption: SCHEDULE_OPTIONS.exactDate,
    scheduleAt: new Date(2018, 11, 24, 10, 33, 30, 0),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <SessionSchedule {...exactDateProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <SessionSchedule {...exactDateProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});