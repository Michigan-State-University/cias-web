/**
 * Test usePauseHelper
 */

import { renderHook, act } from '@testing-library/react-hooks';

import usePauseHelper from 'utils/animationsHelpers/usePauseHelper';
import { instantiateBlockForType } from 'models/Session/utils';
import { pauseType } from 'models/Narrator/BlockTypes';
import { DEFAULT_PAUSE_DURATION } from 'utils/constants';

describe('usePauseHelper test', () => {
  const pauseBlock = instantiateBlockForType(pauseType);
  let blocks;
  let dispatchUpdate;
  let currentData;
  let changeBlock;
  let getIdleAnimation;

  beforeEach(() => {
    blocks = [pauseBlock];
    dispatchUpdate = jest.fn();
    currentData = { pauseDuration: DEFAULT_PAUSE_DURATION };
    changeBlock = jest.fn();
    getIdleAnimation = jest.fn();

    getIdleAnimation.mockReturnValue({ animation: 'standStill' });
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return proper initial data', () => {
    const { result } = renderHook(() =>
      usePauseHelper(
        blocks,
        currentData,
        dispatchUpdate,
        changeBlock,
        getIdleAnimation,
      ),
    );

    const { getInitialPauseAnimation } = result.current;

    expect(getInitialPauseAnimation()).toEqual({
      animation: 'standStill',
      pauseDuration: DEFAULT_PAUSE_DURATION,
      type: pauseType,
    });
  });

  it('should pause character for a given duration and not change block until whole duration finishes', async () => {
    jest.useFakeTimers('modern');
    const { result } = renderHook(() =>
      usePauseHelper(
        blocks,
        currentData,
        dispatchUpdate,
        changeBlock,
        getIdleAnimation,
      ),
    );

    const hook = result.current;

    const { handlePauseBlock } = hook;

    const HALF_DURATION = (DEFAULT_PAUSE_DURATION / 2) * 1000;

    // advance half time
    await act(async () => {
      handlePauseBlock();
      jest.advanceTimersByTime(HALF_DURATION);
    });
    expect(changeBlock).not.toHaveBeenCalled();

    // advance almost all time
    await act(async () => {
      jest.advanceTimersByTime(HALF_DURATION - 1);
    });
    expect(changeBlock).not.toHaveBeenCalled();

    // advance remaining time
    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(changeBlock).toHaveBeenCalled();
  });
});
