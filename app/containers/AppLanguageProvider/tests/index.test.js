import React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from 'configureStore';

import ConnectedAppLanguageProvider from '../index';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<ConnectedLanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore(browserHistory, {});
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ConnectedAppLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedAppLanguageProvider>
      </Provider>,
    );
    expect(queryByText(messages.someMessage.defaultMessage)).not.toBeNull();
  });
});
