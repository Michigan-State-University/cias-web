/**
 *
 * Tests for SessionListItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

import { withDroppable } from 'utils/testUtils/dndUtils';

import { intlProviderConfig } from 'containers/AppLanguageProvider';

import SessionListItem from '../index';

describe('<SessionListItem />', () => {
  let store;
  let modalContainer;

  const props = {
    intervention: { id: 1 },
    session: {
      id: '1',
      name: 'Intervention',
      interventionId: '1',
      settings: {
        formula: true,
      },
      formula: {
        patterns: [],
        payload: '',
      },
      schedule: '',
      scheduleAt: '',
    },
    index: 0,
    nextSessionName: 'test-2',
    sharingPossible: true,
  };

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
        <Provider store={store}>
          <MemoryRouter>
            {withDroppable(<SessionListItem {...props} />)}
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <MemoryRouter>
            {withDroppable(<SessionListItem {...props} />)}
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
