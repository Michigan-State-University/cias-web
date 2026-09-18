import { defineMessages } from 'react-intl';

export const scope = 'app.components.AztecQRScanner';

export default defineMessages({
  startCameraButton: {
    id: `${scope}.startCameraButton`,
    defaultMessage: 'Launch Camera',
  },
  stopCameraButton: {
    id: `${scope}.stopCameraButton`,
    defaultMessage: 'Stop Camera',
  },
  scanningInProgress: {
    id: `${scope}.scanningInProgress`,
    defaultMessage: 'Position the Aztec code within the camera frame',
  },
  cameraPermissionError: {
    id: `${scope}.cameraPermissionError`,
    defaultMessage:
      'Camera access is required to scan QR codes. Please enable camera permissions in your browser settings.',
  },
  cameraNotFoundError: {
    id: `${scope}.cameraNotFoundError`,
    defaultMessage:
      'No camera was detected on your device. Please ensure your device has a camera or enter data manually.',
  },
  cameraInUseError: {
    id: `${scope}.cameraInUseError`,
    defaultMessage:
      'Camera is already in use by another application. Please close other applications using the camera and try again.',
  },
  scanTakingTooLong: {
    id: `${scope}.scanTakingTooLong`,
    defaultMessage:
      'Still no luck? Make sure the code is well lit and fills the frame, or switch to the "Enter Manually" tab.',
  },
});
