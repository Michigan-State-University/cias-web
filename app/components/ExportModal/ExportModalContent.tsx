import { useSelector } from 'react-redux';

import { ModalContentRendererProps } from 'components/Modal';
import Column from 'components/Column';
import Text from 'components/Text';
import { Button } from 'components/Button';

import { ExportModalState } from './types';
import { ExportedFilePanel } from './ExportedFilePanel';

export const ExportModalContent = ({
  modalState: {
    description,
    fileGeneratedDescription,
    generateButtonTitle,
    file,
    onExport,
    exportLoaderSelector,
  },
  closeModal,
}: ModalContentRendererProps<ExportModalState>) => {
  const handleExport = () => onExport(closeModal);

  const loading = useSelector(exportLoaderSelector) as boolean;

  return (
    <Column gap={40} align="center" justify="center" flex={1}>
      <Text fontSize={15} lineHeight={1.35} textAlign="center">
        {file ? fileGeneratedDescription : description}
      </Text>
      {!file && (
        <Button width="auto" px={32} onClick={handleExport} loading={loading}>
          {generateButtonTitle}
        </Button>
      )}
      <ExportedFilePanel
        loading={loading}
        file={file}
        onExport={handleExport}
      />
    </Column>
  );
};
