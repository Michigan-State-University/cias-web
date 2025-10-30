import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  BarcodeFormat,
} from '@zxing/library';
import { useIntl } from 'react-intl';
import Button from 'components/Button';
import Box from 'components/Box';
import messages from './messages';

export type AztecQRScannerProps = {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
};

const AztecQRScanner: React.FC<AztecQRScannerProps> = ({
  onScan,
  onError,
  disabled = false,
}) => {
  const { formatMessage } = useIntl();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const scanningIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.AZTEC]);

    codeReaderRef.current = new BrowserMultiFormatReader(hints);

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  useEffect(
    () => () => {
      stopCamera();
    },
    [],
  );

  const stopCamera = useCallback(() => {
    setIsCameraActive(false);
    setIsScanning(false);

    if (scanningIntervalRef.current) {
      cancelAnimationFrame(scanningIntervalRef.current);
      scanningIntervalRef.current = null;
    }

    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
  }, []);

  const scanFrame = useCallback(async () => {
    if (!webcamRef.current || !codeReaderRef.current || !isScanning) {
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) {
      scanningIntervalRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    try {
      const result = await codeReaderRef.current.decodeFromImageUrl(imageSrc);

      if (result) {
        const decodedText = result.getText();
        stopCamera();
        onScan(decodedText);
        return;
      }
    } catch (err) {
      // Continue scanning if no code found or decode failed
      // Silently ignore decode errors during continuous scanning
    }

    scanningIntervalRef.current = requestAnimationFrame(scanFrame);
  }, [isScanning, onScan, stopCamera]);

  useEffect(() => {
    if (isScanning && isCameraActive) {
      scanningIntervalRef.current = requestAnimationFrame(scanFrame);
    }

    return () => {
      if (scanningIntervalRef.current) {
        cancelAnimationFrame(scanningIntervalRef.current);
      }
    };
  }, [isScanning, isCameraActive, scanFrame]);

  const handleStartCamera = useCallback(() => {
    setScanError(null);
    setIsCameraActive(true);
  }, []);

  const handleStopCamera = useCallback(() => {
    stopCamera();
    setScanError(null);
  }, [stopCamera]);

  const handleUserMedia = useCallback(() => {
    setIsScanning(true);
  }, []);

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
      setIsCameraActive(false);
      setIsScanning(false);

      const cameraError = new Error(userFriendlyMessage);
      onError(cameraError);
    },
    [formatMessage, onError],
  );

  return (
    <Box>
      {!isCameraActive && (
        <Box mb={20}>
          <Button
            onClick={handleStartCamera}
            disabled={disabled}
            color="primary"
          >
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
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: 'environment', // Use rear camera on mobile
                width: { ideal: 1280 },
                height: { ideal: 720 },
              }}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              style={{
                width: '100%',
                maxWidth: '640px',
                height: 'auto',
                border: '2px solid #ccc',
                borderRadius: '8px',
              }}
            />
          </Box>

          {isScanning && (
            <Box mb={10} color="text.secondary">
              {formatMessage(messages.scanningInProgress)}
            </Box>
          )}

          <Box>
            <Button onClick={handleStopCamera} color="secondary">
              {formatMessage(messages.stopCameraButton)}
            </Button>
          </Box>
        </Box>
      )}

      {scanError && (
        <Box mt={20} color="error.main">
          {scanError}
        </Box>
      )}
    </Box>
  );
};

export default AztecQRScanner;
