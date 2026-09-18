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

const TIME_BETWEEN_SCANS_MS = 500;
const TIME_BETWEEN_DECODING_ATTEMPTS_MS = 150;

// How long we let somebody struggle before pointing at the manual entry tab.
const SCAN_HINT_DELAY_MS = 20000;

const videoConstraints: MediaTrackConstraints = {
  facingMode: 'environment', // Use rear camera on mobile
  width: { ideal: 1280 },
  height: { ideal: 720 },
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
    setScanError(null);
    setShowHint(false);
    setIsCameraActive(true);
  }, []);

  const handleStopCamera = useCallback(() => {
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
        if (!result) return;

        stopCamera();
        onScanRef.current(result.getText());
      },
    );
  }, [getCodeReader, stopCamera]);

  const handleUserMediaError = useCallback(
    (error: Error | string) => {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      let userFriendlyMessage = formatMessage(messages.cameraPermissionError);

      if (
        errorMessage.includes('Permission denied') ||
        errorMessage.includes('NotAllowedError')
      ) {
        userFriendlyMessage = formatMessage(messages.cameraPermissionError);
      } else if (
        errorMessage.includes('NotFoundError') ||
        errorMessage.includes('no device')
      ) {
        userFriendlyMessage = formatMessage(messages.cameraNotFoundError);
      } else if (errorMessage.includes('NotReadableError')) {
        userFriendlyMessage = formatMessage(messages.cameraInUseError);
      }

      setScanError(userFriendlyMessage);
      stopCamera();

      onError(new Error(userFriendlyMessage));
    },
    [formatMessage, onError, stopCamera],
  );

  return (
    <Box>
      {!isCameraActive && (
        <Box mb={20}>
          <Button onClick={handleStartCamera} disabled={disabled} width="100%">
            {formatMessage(messages.startCameraButton)}
          </Button>
        </Box>
      )}

      {isCameraActive && (
        <Box>
          <Box mb={20}>
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              style={{
                width: '100%',
                maxWidth: '640px',
                height: 'auto',
                border: `2px solid ${colors.linkWater}`,
                borderRadius: '8px',
              }}
            />
          </Box>

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

          <Box>
            <Button onClick={handleStopCamera} inverted width="100%">
              {formatMessage(messages.stopCameraButton)}
            </Button>
          </Box>
        </Box>
      )}

      {scanError && (
        <Text mt={20} color={themeColors.warning}>
          {scanError}
        </Text>
      )}
    </Box>
  );
};

export default AztecQRScanner;
