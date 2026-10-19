/**
 *
 * Tests for SettingsTab
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { singleQuestion } from 'models/Session/QuestionTypes';
import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import SettingsTab from '../SettingsTab';
import { updateSettings } from '../../../actions';

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

  describe('"Fire report if get this far" toggle', () => {
    const autofinishOffStore = createTestStore({
      session: { session: { autofinishEnabled: false } },
    });

    const renderWithTimerSetting = (props = {}) =>
      render(
        <Provider store={autofinishOffStore}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter>
              <SettingsTab
                {...defaultProps}
                settings={{
                  ...defaultProps.settings,
                  start_autofinish_timer: false,
                }}
                {...props}
              />
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );

    const getTimerSwitch = (container) =>
      container.querySelector('input#start_autofinish_timer');

    it('Should be editable when autofinish is off in the session', () => {
      const { container } = renderWithTimerSetting();

      expect(getTimerSwitch(container)).toBeEnabled();
    });

    it('Should dispatch the setting update when toggled', () => {
      const dispatchSpy = jest.spyOn(autofinishOffStore, 'dispatch');
      const { container } = renderWithTimerSetting();

      fireEvent.click(getTimerSwitch(container));

      expect(dispatchSpy).toHaveBeenCalledWith(
        updateSettings('start_autofinish_timer', true),
      );
      dispatchSpy.mockRestore();
    });

    it('Should be disabled when question editing is disabled', () => {
      const { container } = renderWithTimerSetting({ disabled: true });

      expect(getTimerSwitch(container)).toBeDisabled();
    });
  });
});
