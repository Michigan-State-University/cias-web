import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { sessionReducer } from 'global/reducers/session';
import { localStateReducer } from 'global/reducers/localState';
import { interventionsReducer } from 'global/reducers/interventions';
import { interventionReducer } from 'global/reducers/intervention';

import { createTestStore } from 'utils/testUtils/storeUtils';
import CopyChooser from '../index';

const mockSingleGroup = (suffix = 1) => ({
  id: `group-test-id-${suffix}`,
  title: `Group test title ${suffix}`,
  subtitle: `Test subtitle ${suffix}`,
});

const mockIntervention = (suffix = 1) => ({
  id: `intervention-test-id-${suffix}`,
  name: `Intervention test title ${suffix}`,
});

const mockSession = (suffix = 1) => ({
  id: `session-test-id-${suffix}`,
  name: `Intervention test title ${suffix}`,
  intervention_id: mockIntervention().id,
});

describe('<CopyChooser />', () => {
  let store;
  const initialState = {
    interventions: {
      interventions: [mockIntervention()],
    },
    copyModal: {
      sessions: [mockSession()],
      questionGroups: [mockSingleGroup()],
    },
    session: {
      session: mockSession(),
    },
    intervention: { intervention: { ...mockIntervention() } },
  };

  beforeAll(() => {
    store = createTestStore(initialState);
    store.injectedReducers = {
      session: sessionReducer,
      localState: localStateReducer,
      interventions: interventionsReducer,
      intervention: interventionReducer,
    };
  });

  const props = {
    onClick: jest.fn(),
  };

  it('should match the snapshot', () => {
    const renderedComponent = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CopyChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CopyChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(spy).not.toHaveBeenCalled();
  });
});
