/**
 *
 * Tests for SessionListItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

import { withDroppable } from 'utils/testUtils/dndUtils';

import SessionListItem from '../index';

describe('<SessionListItem />', () => {
  let store;

  const props = {
    session: {
      id: '1',
      name: 'Intervention',
      intervention_id: '1',
      settings: {
        formula: true,
      },
      formula: {
        patterns: [],
        payload: '',
      },
      schedule: '',
      schedule_at: '',
    },
    index: 0,
    nextSessionName: 'test-2',
    sharingPossible: true,
  };

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
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
