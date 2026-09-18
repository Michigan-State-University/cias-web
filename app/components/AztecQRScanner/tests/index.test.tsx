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
          onClick: () =>
            onUserMediaError(new Error('NotAllowedError: Permission denied')),
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
    const { getByText, getByTestId, onScan } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);

    const onDecode = mockDecodeContinuously.mock.calls[0][1];
    act(() => onDecode(decodedResult('<PtID>Z394</PtID>')));

    expect(onScan).toHaveBeenCalledTimes(1);
    expect(onScan).toHaveBeenCalledWith('<PtID>Z394</PtID>');
    expect(mockStopContinuousDecode).toHaveBeenCalled();
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

  it('stops decoding when the camera is closed by hand', () => {
    const { getByText, getByTestId } = renderScanner();

    startCamera(getByText);
    emitStreamReady(getByTestId);
    fireEvent.click(getByText(messages.stopCameraButton.defaultMessage));

    expect(mockStopContinuousDecode).toHaveBeenCalled();
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

  it('cannot be started while disabled', () => {
    const { getByText, queryByTestId } = renderScanner({ disabled: true });

    startCamera(getByText);

    expect(queryByTestId('emit-user-media')).not.toBeInTheDocument();
  });
});
