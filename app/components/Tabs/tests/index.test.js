import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Tabs from '../index';

describe('<Tabs />', () => {
  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Tabs>
          <div label="Tab1">
            <span>Tab1 Content</span>
          </div>
          <div label="Tab2">
            <span>Tab2 Content</span>
          </div>
        </Tabs>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
