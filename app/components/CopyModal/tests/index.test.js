/**
 *
 * Tests for CopyModal
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { DEFAULT_LOCALE } from 'i18n';

import { InterventionStatus } from 'models/Intervention';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { sessionReducer } from 'global/reducers/session';
import { localStateReducer } from 'global/reducers/localState';
import { interventionsReducer } from 'global/reducers/interventions';
import { interventionReducer } from 'global/reducers/intervention';

import { copyModalReducer } from 'global/reducers/copyModalReducer';
import CopyModal from '../index';

describe('<CopyModal />', () => {
  const mockSingleGroup = (suffix = 1) => ({
    id: `group-test-id-${suffix}`,
    title: `Group test title ${suffix}`,
    subtitle: `Test subtitle ${suffix}`,
  });

  const mockIntervention = (suffix = 1) => ({
    id: `intervention-test-id-${suffix}`,
    name: `Intervention test title ${suffix}`,
    status: InterventionStatus.DRAFT,
  });

  const mockSession = (suffix = 1) => ({
    id: `session-test-id-${suffix}`,
    name: `Intervention test title ${suffix}`,
    intervention_id: mockIntervention().id,
  });
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
  };
  let modalContainer;
  let mainAppContainer;

  let store;
  const initialState = {
    interventions: {
      interventions: [mockIntervention()],
    },
    copyModal: {
      sessions: [mockSession()],
      questionGroups: [mockSingleGroup()],
      loaders: {
        sessions: false,
        questionGroups: false,
        interventions: false,
      },
      currentIds: {
        session: 1,
        intervention: 1,
      },
    },
    session: {
      session: mockSession(),
    },
    intervention: { intervention: { ...mockIntervention() } },
  };
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
  });
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

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CopyModal {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
