/**
 *
 * Tests for InterventionSchedule
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';

import configureStore from 'configureStore';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SCHEDULE_OPTIONS } from 'global/reducers/problem';
import InterventionSchedule from '../index';

describe('<InterventionSchedule />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  const daysAfterFillProps = {
    selectedScheduleOption: SCHEDULE_OPTIONS.daysAfterFill,
    scheduleAt: '1',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <InterventionSchedule {...daysAfterFillProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <InterventionSchedule {...daysAfterFillProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
