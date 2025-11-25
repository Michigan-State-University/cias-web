import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import Tabs from '../index';

const defaultTabs = (extraTabProps) => (
  <Tabs {...extraTabProps}>
    <div label="Tab1">
      <span>Tab1 Content</span>
    </div>
    <div label="Tab2">
      <span>Tab2 Content</span>
    </div>
  </Tabs>
);

describe('<Tabs />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(defaultTabs());
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(defaultTabs());
    expect(firstChild).toMatchSnapshot();
  });

  it('should render as links and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <Tabs>
          <div>
            <Link to="/url1">Url1</Link>
          </div>
          <div>
            <Link to="/url2">Url2</Link>
          </div>
        </Tabs>
      </MemoryRouter>,
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('should call function correctly', () => {
    const controlledSetTabActive = jest.fn();
    const { getByText } = render(
      defaultTabs({
        controlled: true,
        controlledTabActive: 'Tab2',
        controlledSetTabActive,
      }),
    );
    const tab = getByText('Tab1');
    fireEvent.click(tab);
    expect(controlledSetTabActive).toHaveBeenLastCalledWith('Tab1');
  });
});
