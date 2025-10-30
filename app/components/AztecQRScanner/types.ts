export type AztecQRScannerProps = {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
};

export type ScanError = {
  message: string;
  type: 'camera' | 'decode' | 'permission';
};
