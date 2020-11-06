/**
 * Test useKeyPress
 */

import useKeyPress from 'utils/useKeyPress';

import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, waitFor } from '@testing-library/react';

describe('useKeyPress test', () => {
  const A_KEY_CODE = 65;
  const S_KEY_CODE = 83;

  it('should not invoke onKeyPress on start', async () => {
    const onKeyPress = jest.fn();
    renderHook(() => useKeyPress('a', onKeyPress));

    await waitFor(() => expect(onKeyPress).not.toHaveBeenCalled());
  });

  it('should invoke onKeyPress when pressed the right key', async () => {
    const onKeyPress = jest.fn();
    renderHook(() => useKeyPress(A_KEY_CODE, onKeyPress));

    fireEvent.keyUp(document, { keyCode: A_KEY_CODE });

    await waitFor(() => expect(onKeyPress).toHaveBeenCalledTimes(1));
  });

  it('should not invoke onKeyPress when pressed the wrong key', async () => {
    const onKeyPress = jest.fn();
    renderHook(() => useKeyPress(A_KEY_CODE, onKeyPress));

    fireEvent.keyUp(document, { keyCode: S_KEY_CODE });

    await waitFor(() => expect(onKeyPress).toHaveBeenCalledTimes(0));
  });
});
