import { act, renderHook } from '@testing-library/react-hooks';

import {
  FAST_POLL_INTERVAL,
  FAST_POLL_PHASE,
  FIRST_POLL_DELAY,
  SLOW_POLL_INTERVAL,
  SLOW_SCAN_THRESHOLD,
  STEADY_POLL_INTERVAL,
  pollDelayForElapsed,
  useParticipantUploadScanPolling,
} from '../useParticipantUploadScanPolling';

describe('pollDelayForElapsed', () => {
  it.each([
    [0, FIRST_POLL_DELAY],
    [1_000, FAST_POLL_INTERVAL],
    [FAST_POLL_PHASE - 1, FAST_POLL_INTERVAL],
    [FAST_POLL_PHASE, STEADY_POLL_INTERVAL],
    [SLOW_SCAN_THRESHOLD - 1, STEADY_POLL_INTERVAL],
    [SLOW_SCAN_THRESHOLD, SLOW_POLL_INTERVAL],
  ])('waits %ims in, then %ims', (elapsed, expected) => {
    expect(pollDelayForElapsed(elapsed)).toEqual(expected);
  });

  it('never polls faster than the backend can change the status', () => {
    const delays = [0, 5_000, 20_000, 60_000, 300_000].map(pollDelayForElapsed);

    expect(Math.min(...delays)).toBeGreaterThanOrEqual(3_000);
  });
});

describe('useParticipantUploadScanPolling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not poll while nothing is pending', () => {
    const refresh = jest.fn();
    renderHook(() => useParticipantUploadScanPolling(false, refresh));

    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(refresh).not.toHaveBeenCalled();
  });

  it('polls while a file is pending, starting after the first delay', () => {
    const refresh = jest.fn();
    renderHook(() => useParticipantUploadScanPolling(true, refresh));

    expect(refresh).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(FIRST_POLL_DELAY);
    });
    expect(refresh).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(FAST_POLL_INTERVAL);
    });
    expect(refresh).toHaveBeenCalledTimes(2);
  });

  it('stops as soon as the file is no longer pending', () => {
    const refresh = jest.fn();
    const { rerender } = renderHook(
      ({ pending }) => useParticipantUploadScanPolling(pending, refresh),
      { initialProps: { pending: true } },
    );

    act(() => {
      jest.advanceTimersByTime(FIRST_POLL_DELAY);
    });
    expect(refresh).toHaveBeenCalledTimes(1);

    rerender({ pending: false });

    act(() => {
      jest.advanceTimersByTime(10 * FAST_POLL_INTERVAL);
    });
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('reports a slow scan once the wait stops being typical', () => {
    const { result } = renderHook(() =>
      useParticipantUploadScanPolling(true, jest.fn()),
    );

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(SLOW_SCAN_THRESHOLD + STEADY_POLL_INTERVAL);
    });

    expect(result.current).toBe(true);
  });

  it('keeps the schedule when the refresh callback is re-created each render', () => {
    const refresh = jest.fn();
    const { rerender } = renderHook(
      ({ pending }) =>
        useParticipantUploadScanPolling(pending, () => refresh()),
      { initialProps: { pending: true } },
    );

    act(() => {
      jest.advanceTimersByTime(FIRST_POLL_DELAY);
    });
    rerender({ pending: true });
    act(() => {
      jest.advanceTimersByTime(FAST_POLL_INTERVAL);
    });

    expect(refresh).toHaveBeenCalledTimes(2);
  });
});
