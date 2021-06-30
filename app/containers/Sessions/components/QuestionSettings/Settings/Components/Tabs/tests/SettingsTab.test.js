/**
 *
 * Tests for SettingsTab
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { singleQuestion } from 'models/Session/QuestionTypes';
import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import SettingsTab from '../SettingsTab';

describe('<SettingsTab />', () => {
  const mockFunctions = {
    formatMessage,
    onQuestionToggle: jest.fn(),
    changeTypeQuestion: jest.fn(),
  };

  const defaultProps = {
    settings: {
      image: false,
      proceed_button: true,
      required: true,
      subtitle: true,
      title: true,
      video: false,
      narrator_skippable: false,
    },
    type: singleQuestion.id,
    id: 'test',
    disabled: false,
    ...mockFunctions,
  };

  const store = createTestStore({});

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <SettingsTab {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <SettingsTab {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
