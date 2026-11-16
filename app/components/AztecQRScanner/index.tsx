import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  BarcodeFormat,
  Result,
} from '@zxing/library';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import Button from 'components/Button';
import Box from 'components/Box';
import Text from 'components/Text';

import { AztecQRScannerProps } from './types';
import messages from './messages';
import { StyledWebcam } from './styled';

const TIME_BETWEEN_SCANS_MS = 500;
const TIME_BETWEEN_DECODING_ATTEMPTS_MS = 150;

// How long we let somebody struggle before pointing at the manual entry tab.
const SCAN_HINT_DELAY_MS = 20000;

const videoConstraints: MediaTrackConstraints = {
  facingMode: 'environment', // Use rear camera on mobile
  width: { ideal: 1280 },
  height: { ideal: 720 },
};

// Browsers report the failure kind in `DOMException.name`; `message` is
// free-form text that differs between engines. react-webcam reports a missing
// getUserMedia API as a plain string.
const getCameraErrorMessage = (error: Error | string) => {
  if (typeof error === 'string') return messages.cameraNotFoundError;

  switch (error.name) {
    case 'NotFoundError':
    case 'DevicesNotFoundError':
    case 'OverconstrainedError':
    case 'ConstraintNotSatisfiedError':
      return messages.cameraNotFoundError;
    case 'NotReadableError':
    case 'TrackStartError':
    case 'AbortError':
      return messages.cameraInUseError;
    default:
      return messages.cameraPermissionError;
  }
};

const AztecQRScanner: React.FC<AztecQRScannerProps> = ({
  onScan,
  onError,
  disabled = false,
}) => {
  const { formatMessage } = useIntl();

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<Nullable<string>>(null);
  const [showHint, setShowHint] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const codeReaderRef = useRef<Nullable<BrowserMultiFormatReader>>(null);
  const hintTimeoutRef = useRef<Nullable<ReturnType<typeof setTimeout>>>(null);
  const onScanRef = useRef(onScan);
  // Guards against a decode callback that is already queued when we stop.
  const hasReportedRef = useRef(false);
  const launchButtonRef = useRef<HTMLButtonElement>(null);
  const stopButtonRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<Nullable<'launch' | 'stop'>>(null);

  useEffect(() => {
    const target = pendingFocusRef.current;
    if (!target) return;
    pendingFocusRef.current = null;
    (target === 'stop' ? stopButtonRef : launchButtonRef).current?.focus();
  }, [isCameraActive]);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  const getCodeReader = useCallback(() => {
    if (!codeReaderRef.current) {
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.AZTEC]);

      const codeReader = new BrowserMultiFormatReader(
        hints,
        TIME_BETWEEN_SCANS_MS,
      );
      codeReader.timeBetweenDecodingAttempts =
        TIME_BETWEEN_DECODING_ATTEMPTS_MS;

      codeReaderRef.current = codeReader;
    }

    return codeReaderRef.current;
  }, []);

  const clearHintTimeout = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    clearHintTimeout();
    codeReaderRef.current?.stopContinuousDecode();
    setIsCameraActive(false);
    setIsScanning(false);
    setShowHint(false);
  }, [clearHintTimeout]);

  useEffect(
    () => () => {
      clearHintTimeout();
      codeReaderRef.current?.reset();
    },
    [clearHintTimeout],
  );

  const handleStartCamera = useCallback(() => {
    hasReportedRef.current = false;
    pendingFocusRef.current = 'stop';
    setScanError(null);
    setShowHint(false);
    setIsCameraActive(true);
  }, []);

  const handleStopCamera = useCallback(() => {
    pendingFocusRef.current = 'launch';
    stopCamera();
    setScanError(null);
  }, [stopCamera]);

  const handleUserMedia = useCallback(() => {
    const video = webcamRef.current?.video;

    if (!video) return;

    setIsScanning(true);

    hintTimeoutRef.current = setTimeout(
      () => setShowHint(true),
      SCAN_HINT_DELAY_MS,
    );

    getCodeReader().decodeFromVideoElementContinuously(
      video,
      (result: Nullable<Result>) => {
        if (!result || hasReportedRef.current) return;

        hasReportedRef.current = true;
        stopCamera();
        onScanRef.current(result.getText());
      },
    );
  }, [getCodeReader, stopCamera]);

  const handleUserMediaError = useCallback(
    (error: Error | string) => {
      setScanError(formatMessage(getCameraErrorMessage(error)));
      pendingFocusRef.current = 'launch';
      stopCamera();

      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      }
    },
    [formatMessage, onError, stopCamera],
  );

  return (
    <Box>
      {!isCameraActive && (
        <Box mb={20}>
          <Button
            ref={launchButtonRef}
            onClick={handleStartCamera}
            disabled={disabled}
            width="100%"
          >
            {formatMessage(messages.startCameraButton)}
          </Button>
        </Box>
      )}

      {isCameraActive && (
        <Box>
          <Box mb={20}>
            <StyledWebcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
            />
          </Box>

          <Box aria-live="polite">
            {isScanning && (
              <Text mb={10} color={colors.grey}>
                {formatMessage(messages.scanningInProgress)}
              </Text>
            )}

            {showHint && (
              <Text mb={10} color={colors.grey}>
                {formatMessage(messages.scanTakingTooLong)}
              </Text>
            )}
          </Box>

          <Box>
            <Button
              ref={stopButtonRef}
              onClick={handleStopCamera}
              inverted
              width="100%"
            >
              {formatMessage(messages.stopCameraButton)}
            </Button>
          </Box>
        </Box>
      )}

      {scanError && (
        <Text mt={20} color={themeColors.warning} role="alert">
          {scanError}
        </Text>
      )}
    </Box>
  );
};

export default AztecQRScanner;
