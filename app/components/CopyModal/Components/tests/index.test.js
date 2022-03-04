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
import { copyModalReducer } from 'global/reducers/copyModalReducer';

import { draft } from 'models/Status/StatusTypes';

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
  status: draft,
});

const mockSession = (suffix = 1) => ({
  id: `session-test-id-${suffix}`,
  name: `Intervention test title ${suffix}`,
  intervention_id: mockIntervention().id,
});

describe('<CopyChooser />', () => {
  let store;
  const initialState = {
    copyModal: {
      sessions: [mockSession()],
      questionGroups: [mockSingleGroup()],
      loaders: {
        questionGroups: false,
        sessions: false,
        interventions: false,
      },
      currentIds: {
        intervention: 1,
        session: 1,
      },
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
      copyModal: copyModalReducer,
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
