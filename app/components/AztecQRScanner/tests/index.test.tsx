/**
 *
 * Tests for AztecQRScanner
 *
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import AztecQRScanner from '../index';
import messages from '../messages';

const mockStopContinuousDecode = jest.fn();
const mockReset = jest.fn();
const mockDecodeContinuously = jest.fn();
let mockUserMediaError: Error | string = new Error('Permission denied');

const domError = (name: string, message: string) => {
  const error = new Error(message);
  error.name = name;
  return error;
};

jest.mock('@zxing/library', () => ({
  BrowserMultiFormatReader: jest.fn().mockImplementation(() => ({
    decodeFromVideoElementContinuously: mockDecodeContinuously,
    stopContinuousDecode: mockStopContinuousDecode,
    reset: mockReset,
    timeBetweenDecodingAttempts: 0,
  })),
  DecodeHintType: { POSSIBLE_FORMATS: 'POSSIBLE_FORMATS' },
  BarcodeFormat: { AZTEC: 'AZTEC' },
  Result: class {},
}));

jest.mock('react-webcam', () => {
  // jest.mock factories are hoisted above the imports, so React has to be
  // pulled in here rather than closed over.
  // eslint-disable-next-line global-require
  const ReactMock = require('react');

  return ReactMock.forwardRef(
    (
      { onUserMedia, onUserMediaError }: Record<string, any>,
      ref: React.Ref<any>,
    ) => {
      const videoRef = ReactMock.useRef(null);

      ReactMock.useImperativeHandle(ref, () => ({
        get video() {
          return videoRef.current;
        },
      }));

      return ReactMock.createElement('div', null, [
        ReactMock.createElement('video', { key: 'v', ref: videoRef }),
        ReactMock.createElement('button', {
          key: 'ok',
          type: 'button',
          'data-testid': 'emit-user-media',
          onClick: () => onUserMedia({}),
        }),
        ReactMock.createElement('button', {
          key: 'err',
          type: 'button',
          'data-testid': 'emit-user-media-error',
          onClick: () => onUserMediaError(mockUserMediaError),
        }),
      ]);
    },
  );
});

const renderScanner = (props: Record<string, any> = {}) => {
  const onScan = jest.fn();
  const onError = jest.fn();

  const utils = render(
    <IntlProvider locale={DEFAULT_LOCALE}>
      <AztecQRScanner onScan={onScan} onError={onError} {...props} />
    </IntlProvider>,
  );

  return { ...utils, onScan, onError };
};

const startCamera = (getByText: any) =>
  fireEvent.click(getByText(messages.startCameraButton.defaultMessage));

const emitStreamReady = (getByTestId: any) =>
  fireEvent.click(getByTestId('emit-user-media'));

const decodedResult = (text: string) => ({ getText: () => text });

describe('<AztecQRScanner />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUserMediaError = domError('NotAllowedError', 'Permission denied');
  });

  it('does not open the camera until asked to', () => {
    const { queryByTestId, getByText } = renderScanner();

    expect(queryByTestId('emit-user-media')).not.toBeInTheDocument();
    expect(
      getByText(messages.startCameraButton.defaultMessage),
    ).toBeInTheDocument();
  });

  it('decodes off the video element rather than a screenshot', () => {
    const { getByText, getByTestId } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);

    expect(mockDecodeContinuously).toHaveBeenCalledTimes(1);
    expect(mockDecodeContinuously.mock.calls[0][0]).toBeInstanceOf(
      HTMLVideoElement,
    );
  });

  it('reports a decoded code once and stops scanning', () => {
    const { getByText, getByTestId, queryByTestId, onScan } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);

    const onDecode = mockDecodeContinuously.mock.calls[0][1];
    act(() => onDecode(decodedResult('<PtID>Z394</PtID>')));

    // A frame already queued when we stopped must not report a second time.
    act(() => onDecode(decodedResult('<PtID>Z394</PtID>')));

    expect(onScan).toHaveBeenCalledTimes(1);
    expect(onScan).toHaveBeenCalledWith('<PtID>Z394</PtID>');
    expect(mockStopContinuousDecode).toHaveBeenCalled();
    // The webcam (and with it the MediaStream) is unmounted.
    expect(queryByTestId('emit-user-media')).not.toBeInTheDocument();
    expect(
      getByText(messages.startCameraButton.defaultMessage),
    ).toBeInTheDocument();
  });

  // ZXing reports a NotFoundException for every frame without a code, which is
  // nearly all of them - those must not surface to the user as a scan.
  it('ignores frames that hold no code', () => {
    const { getByText, getByTestId, onScan, onError } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);

    const onDecode = mockDecodeContinuously.mock.calls[0][1];
    act(() => onDecode(null, new Error('NotFoundException')));

    expect(onScan).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('explains a denied camera permission and reports it', () => {
    const { getByText, getByTestId, onError } = renderScanner();

    startCamera(getByText);
    fireEvent.click(getByTestId('emit-user-media-error'));

    expect(
      getByText(messages.cameraPermissionError.defaultMessage),
    ).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['NotFoundError', 'Requested device not found', 'cameraNotFoundError'],
    ['OverconstrainedError', '', 'cameraNotFoundError'],
    ['NotReadableError', 'Could not start video source', 'cameraInUseError'],
    ['AbortError', 'Starting videoinput failed', 'cameraInUseError'],
    ['NotAllowedError', 'Permission denied', 'cameraPermissionError'],
    ['SecurityError', 'The request is not allowed', 'cameraPermissionError'],
  ] as const)(
    'classifies a %s camera error by its name',
    (name, message, expectedMessageKey) => {
      mockUserMediaError = domError(name, message);
      const { getByText, getByTestId, onError } = renderScanner();

      startCamera(getByText);
      fireEvent.click(getByTestId('emit-user-media-error'));

      expect(
        getByText(messages[expectedMessageKey].defaultMessage),
      ).toBeInTheDocument();
      expect(onError).toHaveBeenCalledTimes(1);
    },
  );

  it('treats an unsupported getUserMedia as no camera', () => {
    mockUserMediaError = 'getUserMedia not supported';
    const { getByText, getByTestId, onError } = renderScanner();

    startCamera(getByText);
    fireEvent.click(getByTestId('emit-user-media-error'));

    expect(
      getByText(messages.cameraNotFoundError.defaultMessage),
    ).toBeInTheDocument();
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('releases the camera when closed by hand', () => {
    const { getByText, getByTestId, queryByTestId } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);
    fireEvent.click(getByText(messages.stopCameraButton.defaultMessage));

    expect(mockStopContinuousDecode).toHaveBeenCalled();
    expect(queryByTestId('emit-user-media')).not.toBeInTheDocument();
  });

  it('releases the camera after a permission error', () => {
    const { getByText, getByTestId, queryByTestId } = renderScanner();

    startCamera(getByText);
    fireEvent.click(getByTestId('emit-user-media-error'));

    expect(queryByTestId('emit-user-media')).not.toBeInTheDocument();
  });

  it('scans again after a relaunch', () => {
    const { getByText, getByTestId, onScan } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);
    act(() => mockDecodeContinuously.mock.calls[0][1](decodedResult('A')));

    startCamera(getByText);
    emitStreamReady(getByTestId);
    act(() => mockDecodeContinuously.mock.calls[1][1](decodedResult('B')));

    expect(onScan.mock.calls).toEqual([['A'], ['B']]);
  });

  it('points at manual entry once scanning drags on', () => {
    jest.useFakeTimers();

    const { getByText, getByTestId, queryByText } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);

    expect(
      queryByText(messages.scanTakingTooLong.defaultMessage),
    ).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(20000);
    });

    expect(
      getByText(messages.scanTakingTooLong.defaultMessage),
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('releases the reader on unmount', () => {
    const { unmount, getByText, getByTestId } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);
    unmount();

    expect(mockReset).toHaveBeenCalled();
  });

  it('keeps keyboard focus on the Launch/Stop controls', () => {
    const { getByText } = renderScanner();

    startCamera(getByText);
    expect(getByText(messages.stopCameraButton.defaultMessage)).toHaveFocus();

    fireEvent.click(getByText(messages.stopCameraButton.defaultMessage));
    expect(getByText(messages.startCameraButton.defaultMessage)).toHaveFocus();
  });

  it('returns focus to Launch after a camera error', () => {
    const { getByText, getByTestId } = renderScanner();

    startCamera(getByText);
    fireEvent.click(getByTestId('emit-user-media-error'));

    expect(getByText(messages.startCameraButton.defaultMessage)).toHaveFocus();
    expect(
      getByText(messages.cameraPermissionError.defaultMessage),
    ).toHaveAttribute('role', 'alert');
  });

  it('cannot be started while disabled', () => {
    const { getByText, queryByTestId } = renderScanner({ disabled: true });

    startCamera(getByText);

    expect(queryByTestId('emit-user-media')).not.toBeInTheDocument();
  });
});
