import React, { useRef } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';

import { testRender } from 'utils/testUtils';

import Input from '../index';
import DateInput from '../DateInput';
import ApprovableInput from '../ApprovableInput';
import BadgeInput from '../BadgeInput';
import SearchInput from '../SearchInput';
import StyledInput from '../StyledInput';
import TextArea from '../TextArea';

const DateComponent = (props) => {
  const ref = useRef(null);
  return <DateInput ref={ref} {...props} />;
};

describe('<Input />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Input />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
  it('Should render with error and match the snapshot', () => {
    const { container } = render(<Input hasError transparent />);
    expect(container).toMatchSnapshot();
  });
});

describe('<DateInput />', () => {
  const defaultProps = {
    value: '',
    onClick: jest.fn(),
    width: 250,
    height: 50,
    placeholder: 'Placeholder',
    fontSize: 14,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<DateComponent {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const { container } = render(<DateComponent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe('<SearchInput />', () => {
  const defaultProps = {
    icon: 'img.png',
    value: '',
    onChange: jest.fn(),
    width: '100%',
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    testRender(<SearchInput {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const { container } = testRender(<SearchInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('Should invoke onCHange function', async () => {
    const newProps = {
      ...defaultProps,
      value: 'Value',
    };
    testRender(<SearchInput {...newProps} />);
    const img = document.querySelectorAll('img')[1];
    fireEvent.click(img);
    await waitFor(() =>
      expect(newProps.onChange).toHaveBeenCalledWith({ target: { value: '' } }),
    );
  });
});

describe('<BadgeInput />', () => {
  const defaultProps = {
    color: 'black',
    value: '',
    onChange: jest.fn(),
    placeholder: 'Placeholder',
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<BadgeInput {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const { container } = render(<BadgeInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe('<StyledInput />', () => {
  const defaultProps = {
    value: '',
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    placeholder: 'Placeholder',
    textAlign: 'left',
    width: '100%',
    type: 'singleline',
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<StyledInput {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot as singleline', () => {
    const { container } = render(<StyledInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('Should render and match the snapshot as textarea', () => {
    const { container } = render(
      <StyledInput {...defaultProps} type="multiline" />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should change input value for singleline', async () => {
    const { getByPlaceholderText, rerender } = render(
      <StyledInput {...defaultProps} autoSize />,
    );
    const input = getByPlaceholderText('Placeholder');
    fireEvent.change(input, { target: { value: 'Test' } });
    await waitFor(() => expect(input.value).toEqual('Test'));
    rerender(<StyledInput {...defaultProps} validator={jest.fn(() => true)} />);
    fireEvent.change(input, { target: { value: 'Test2' } });
    await waitFor(() => expect(input.value).toEqual('Test2'));
  });
  it('Should change input value for multiline', async () => {
    const { getByPlaceholderText, rerender } = render(
      <StyledInput {...defaultProps} type="multiline" />,
    );
    const input = getByPlaceholderText('Placeholder');
    fireEvent.change(input, { target: { value: 'Test' } });
    await waitFor(() => expect(input.value).toEqual('Test'));
    rerender(
      <StyledInput
        {...defaultProps}
        type="multiline"
        validator={jest.fn(() => true)}
      />,
    );
    fireEvent.change(input, { target: { value: 'Test2' } });
    await waitFor(() => expect(input.value).toEqual('Test2'));
  });
  it('Should invoke onFocus and onBlur for singleline', async () => {
    const { getByPlaceholderText, rerender } = render(
      <StyledInput {...defaultProps} autoSize maxWidth="none" />,
    );
    const input = getByPlaceholderText('Placeholder');
    rerender(<StyledInput {...defaultProps} value="Value" />);
    fireEvent.focus(input);
    await waitFor(() => expect(defaultProps.onFocus).toHaveBeenCalledTimes(1));
    fireEvent.blur(input);
    await waitFor(() =>
      expect(defaultProps.onBlur).toHaveBeenCalledWith('Value'),
    );
    jest.clearAllMocks();
  });
  it('Should invoke onFocus and onBlur for multiline', async () => {
    const { getByPlaceholderText, rerender } = render(
      <StyledInput {...defaultProps} type="multiline" />,
    );
    const input = getByPlaceholderText('Placeholder');

    rerender(<StyledInput {...defaultProps} value="Value" type="multiline" />);
    fireEvent.focus(input);
    await waitFor(() => expect(defaultProps.onFocus).toHaveBeenCalledTimes(1));
    fireEvent.blur(input);
    await waitFor(() =>
      expect(defaultProps.onBlur).toHaveBeenCalledWith('Value'),
    );
  });
});

describe('<TextArea />', () => {
  const defaultProps = {
    transparent: false,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<TextArea {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const { container } = render(<TextArea {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe('<ApprovableInput />', () => {
  const defaultProps = {
    value: '',
    validator: jest.fn(),
    onValidation: jest.fn(),
    placeholder: 'Placeholder',
    textAlign: 'left',
    keyboard: 'text',
    type: 'singleline',
    onCheck: jest.fn(),
    rows: '1',
    richText: false,
    autoSize: false,
    fontSize: 14,
    mr: 0,
    disabled: false,
    height: 50,
    width: 250,
    padding: 0,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ApprovableInput {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot as singleline', () => {
    const { container } = render(<ApprovableInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('Should change value of the singleline input', async () => {
    const { getByPlaceholderText, rerender } = render(
      <ApprovableInput {...defaultProps} validator={null} />,
    );

    const input = getByPlaceholderText('Placeholder');
    fireEvent.change(input, { target: { value: 'Test' } });
    await waitFor(() => expect(input.value).toEqual('Test'));

    rerender(
      <ApprovableInput {...defaultProps} validator={jest.fn(() => true)} />,
    );
    fireEvent.change(input, { target: { value: 'Test2' } });
    await waitFor(() => expect(input.value).toEqual('Test2'));
    fireEvent.focus(input);
    fireEvent.blur(input);
    await waitFor(() =>
      expect(defaultProps.onCheck).toHaveBeenCalledWith('Test2'),
    );
  });

  it('Should render and match the snapshot as multiline', () => {
    const { container } = render(
      <ApprovableInput {...defaultProps} type="multiline" />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should change value of the multiline input', async () => {
    const { getByPlaceholderText, rerender } = render(
      <ApprovableInput {...defaultProps} type="multiline" validator={null} />,
    );

    const input = getByPlaceholderText('Placeholder');
    fireEvent.change(input, { target: { value: 'Test' } });
    await waitFor(() => expect(input.value).toEqual('Test'));
    rerender(
      <ApprovableInput
        {...defaultProps}
        type="multiline"
        validator={jest.fn(() => true)}
      />,
    );

    fireEvent.change(input, { target: { value: 'Test2' } });
    await waitFor(() => expect(input.value).toEqual('Test2'));
    fireEvent.focus(input);
    fireEvent.blur(input);
    await waitFor(() =>
      expect(defaultProps.onCheck).toHaveBeenCalledWith('Test2'),
    );
  });
  it('Should render and match the snapshot as richText', () => {
    const { container } = render(
      <ApprovableInput {...defaultProps} richText />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render and match the snapshot as date input', () => {
    const { container } = render(
      <ApprovableInput {...defaultProps} type="date" />,
    );
    expect(container).toMatchSnapshot();
  });
});
