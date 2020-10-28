/**
 * Test useKeyPress
 */

import useKeyPress from 'utils/useKeyPress';

import { renderHook } from 'utils/renderHook';
import { fireEvent } from 'react-testing-library';

describe('useKeyPress test', () => {
  const A_KEY_CODE = 65;
  const S_KEY_CODE = 83;

  it('should not invoke onKeyPress on start', () => {
    const onKeyPress = jest.fn();
    renderHook(() => useKeyPress('a', onKeyPress));

    expect(onKeyPress).not.toHaveBeenCalled();
  });

  it('should invoke onKeyPress when pressed the right key', () => {
    const onKeyPress = jest.fn();
    const { component } = renderHook(() => useKeyPress(A_KEY_CODE, onKeyPress));

    fireEvent.keyUp(component.container, { keyCode: A_KEY_CODE });

    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('should not invoke onKeyPress when pressed the wrong key', () => {
    const onKeyPress = jest.fn();
    const { component } = renderHook(() => useKeyPress(A_KEY_CODE, onKeyPress));

    fireEvent.keyUp(component.container, { keyCode: S_KEY_CODE });

    expect(onKeyPress).toHaveBeenCalledTimes(0);
  });
});
