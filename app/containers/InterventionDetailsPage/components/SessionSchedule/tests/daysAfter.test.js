/**
 *
 * Tests for SessionSchedule
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import configureStore from 'configureStore';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SessionSchedule as SessionScheduleEnum } from 'models/Session';
import { InterventionSharedTo } from 'models/Intervention';

import { DEFAULT_LOCALE } from 'i18n';

import { intlProviderConfig } from 'containers/LanguageProvider';

import SessionSchedule from '../index';

describe('<SessionSchedule />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  const daysAfterProps = {
    selectedScheduleOption: SessionScheduleEnum.DAYS_AFTER,
    schedulePayload: '1',
    sharedTo: InterventionSharedTo.REGISTERED,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
        <Provider store={store}>
          <SessionSchedule {...daysAfterProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
        <Provider store={store}>
          <SessionSchedule {...daysAfterProps} />
        </Provider>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
