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

import InterventionListItem from '../index';

describe('<InterventionListItem />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <InterventionListItem
          intervention={{ id: '1', name: 'Intervention', problem_id: '1' }}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <MemoryRouter>
          <InterventionListItem
            intervention={{ id: '1', name: 'Intervention', problem_id: '1' }}
            index={0}
          />
        </MemoryRouter>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
