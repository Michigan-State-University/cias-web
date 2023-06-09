import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import createModalForTests from 'utils/createModalForTests';

import { initialState as initialData } from 'global/reducers/textMessages/reducer';

import {
  TextMessagesBuilder,
  TextMessageScheduleFrequency,
  TextMessageScheduleOption,
  TextMessageType,
} from 'models/TextMessage';

import TextMessagingPage from '../index';

describe('<TextMessagingPage />', () => {
  beforeEach(() => {
    createModalForTests();
  });
  const defaultProps = {
    match: {
      params: { sessionId: 'text-session', interventionId: 'testIntervention' },
    },
  };

  const initialState = {
    textMessages: {
      ...initialData,
      textMessages: [
        new TextMessagesBuilder()
          .withId('text-message-plan-1')
          .withName('Text message plan 1')
          .withSchedule(
            TextMessageScheduleOption.DAYS_AFTER_FILL,
            '3',
            TextMessageScheduleFrequency.ONCE,
            '',
            'var1 + var2',
          )
          .withType(TextMessageType.NORMAL)
          .build(),
        new TextMessagesBuilder()
          .withId('text-message-plan-2')
          .withName('Text message plan 2')
          .withSchedule(
            TextMessageScheduleOption.AFTER_FILL,
            '3',
            TextMessageScheduleFrequency.ONCE_WEEK,
            '',
            'var1 + var2',
          )
          .withType(TextMessageType.ALERT)
          .build(),
      ],
    },
  };
  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <TextMessagingPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <TextMessagingPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
