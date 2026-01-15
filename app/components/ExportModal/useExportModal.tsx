import { useMemo } from 'react';

import { ModalProps, ModalType, useModal } from 'components/Modal';

import { ExportModalContent } from './ExportModalContent';
import { ExportModalState } from './types';

export const useExportModal = ({ title, ...state }: ExportModalState) => {
  const props: ModalProps<ExportModalState>['props'] = useMemo(
    () => ({
      title,
      width: 500,
      height: 700,
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
    openModal: () => openModal({ title, ...state }),
    ...rest,
  };
};
