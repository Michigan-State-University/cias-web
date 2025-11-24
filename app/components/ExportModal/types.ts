import { useSelector } from 'react-redux';

export type ExportModalFile = {
  filename: string;
  generatedAt: string;
  url: string;
};

export type ExportModalState = {
  title: string;
  description: string;
  fileGeneratedDescription: string;
  generateButtonTitle: string;
  file: Nullable<ExportModalFile>;
  onExport: (
    onSuccess: () => void,
    startDate?: Date | null,
    endDate?: Date | null,
    timezone?: string,
  ) => void;
  exportLoaderSelector: Parameters<typeof useSelector>[0];
};
