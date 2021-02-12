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

import { createTestStore } from 'utils/testUtils/storeUtils';
import { sessionReducer } from 'global/reducers/session';
import { localStateReducer } from 'global/reducers/localState';
import { interventionsReducer } from 'global/reducers/interventions';

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
    },
    session: {
      session: mockSession(),
    },
  };
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
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
    };
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CopyModal {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
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
