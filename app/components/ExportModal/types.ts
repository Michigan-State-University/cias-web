import { useSelector } from 'react-redux';

export type ExportModalFile = {
  filename: string;
  generatedAt: string;
  url: string;
};

export type ExportModalState = {
  title: string;
  description: string;
  file: Nullable<ExportModalFile>;
  onExport: (onSuccess: () => void) => void;
  exportLoaderSelector: Parameters<typeof useSelector>[0];
};
