/**
 *
 * Tests for InterventionListItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import InterventionListItem from '../index';

describe('<InterventionListItem />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <InterventionListItem
            intervention={{ id: '1', name: 'Intervention', problem_id: '1' }}
            index={0}
          />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <InterventionListItem
              intervention={{ id: '1', name: 'Intervention', problem_id: '1' }}
              index={0}
            />
          </MemoryRouter>
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
