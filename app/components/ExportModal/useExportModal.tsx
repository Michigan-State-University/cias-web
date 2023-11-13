import { useMemo } from 'react';

import { ModalProps, ModalType, useModal } from 'components/Modal';

import { ExportModalContent } from './ExportModalContent';
import { ExportModalState } from './types';

export const useExportModal = ({
  title,
  description,
  file,
  onExport,
  exportLoaderSelector,
}: ExportModalState) => {
  const props: ModalProps<ExportModalState>['props'] = useMemo(
    () => ({
      title,
      width: 450,
      height: 526,
      stretchContent: true,
    }),
    [title],
  );

  const { openModal, ...rest } = useModal<ExportModalState>({
    type: ModalType.Modal,
    props,
    modalContentRenderer: ExportModalContent,
  });

  return {
    openModal: () =>
      openModal({ title, description, file, onExport, exportLoaderSelector }),
    ...rest,
  };
};
