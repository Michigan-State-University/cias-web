/**
 *
 * Tests for SettingsPanel
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { intlProviderConfig } from 'containers/AppLanguageProvider';
import { InterventionType } from 'models/Intervention';
import { SessionSchedule } from 'models/Session';

import SettingsPanel from '../index';

describe('<SettingsPanel />', () => {
  const intervention = {
    name: 'Name of the session',
    id: 'as120s-as12cs',
    sharedTo: 'anyone',
  };

  const initialState = {
    intervention: {
      intervention,
      loaders: {
        fetchInterventionLoading: false,
      },
      errors: {
        fetchInterventionError: null,
      },
    },
  };
  const store = createTestStore(initialState);

  const defaultProps = {
    intervention,
    match: { params: { intervention: { id: 'as120s-as12cs' } } },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
            <SettingsPanel {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
            <SettingsPanel {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  describe('updateType function', () => {
    it('should sanitize session schedules for any intervention type change', () => {
      const interventionWithSessions = {
        ...intervention,
        id: 'test-intervention-id',
        type: InterventionType.FIXED,
        sessions: [
          {
            id: 'session-1',
            name: 'Session 1',
            schedule: SessionSchedule.AFTER_FILL,
            schedulePayload: null,
            scheduleAt: null,
          },
          {
            id: 'session-2',
            name: 'Session 2',
            schedule: SessionSchedule.IMMEDIATELY,
            schedulePayload: 'some-payload',
            scheduleAt: '2023-01-01',
          },
          {
            id: 'session-3',
            name: 'Session 3',
            schedule: SessionSchedule.IMMEDIATELY,
            schedulePayload: 'another-payload',
            scheduleAt: '2023-01-02',
          },
        ],
      };

      const stateWithSessions = {
        intervention: {
          intervention: interventionWithSessions,
          loaders: {
            fetchInterventionLoading: false,
          },
          errors: {
            fetchInterventionError: null,
          },
        },
      };

      const mockStore = createTestStore(stateWithSessions);
      const mockDispatch = jest.fn();
      mockStore.dispatch = mockDispatch;

      const propsWithSessions = {
        intervention: interventionWithSessions,
        match: { params: { intervention: { id: 'test-intervention-id' } } },
      };

      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
              <SettingsPanel {...propsWithSessions} />
            </IntlProvider>
          </MemoryRouter>
        </Provider>,
      );

      const expectedInterventionUpdate = {
        id: 'test-intervention-id',
        type: InterventionType.FLEXIBLE,
        sessions: [
          {
            id: 'session-1',
            name: 'Session 1',
            schedule: SessionSchedule.AFTER_FILL,
            schedulePayload: null,
            scheduleAt: null,
          },
          {
            id: 'session-2',
            name: 'Session 2',
            schedule: SessionSchedule.AFTER_FILL,
            schedulePayload: null,
            scheduleAt: null,
          },
          {
            id: 'session-3',
            name: 'Session 3',
            schedule: SessionSchedule.AFTER_FILL,
            schedulePayload: null,
            scheduleAt: null,
          },
        ],
      };

      expect(expectedInterventionUpdate.sessions).toEqual([
        expect.objectContaining({ schedule: SessionSchedule.AFTER_FILL }),
        expect.objectContaining({ schedule: SessionSchedule.AFTER_FILL }),
        expect.objectContaining({ schedule: SessionSchedule.AFTER_FILL }),
      ]);
    });
  });
});
