import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import Tab from '../Tab';

describe('<Tab />', () => {
  const defaultProps = {
    text: '1',
    onClick: jest.fn(),
    activeTab: '1',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Tab {...defaultProps} label="label" />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render and match the snapshot for a label', () => {
    const {
      container: { firstChild },
    } = render(<Tab {...defaultProps} label="label" />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should render as links and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <Tab {...defaultProps} renderAsLink={<Link to="/url1">Url1</Link>} />
      </MemoryRouter>,
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('should render null for no label', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <Tab {...defaultProps} />
      </MemoryRouter>,
    );

    expect(firstChild).toEqual(null);
  });

  it('Should call on click', () => {
    const { getByText } = render(<Tab {...defaultProps} label="label" />);
    const label = getByText('label');
    fireEvent.click(label);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
