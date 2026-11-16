export type AztecQRScannerProps = {
  onScan: (decodedText: string) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
};
