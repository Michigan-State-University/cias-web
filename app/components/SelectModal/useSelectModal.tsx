import { useMemo } from 'react';

import { ModalProps, ModalType, useModal } from 'components/Modal';

import { SelectModalContent } from './SelectModalContent';
import { SelectModalOption } from './types';
import { SELECT_MODAL_WIDTH } from './constants';

export const useSelectModal = (title: string) => {
  const props: ModalProps<SelectModalOption[], string>['props'] = useMemo(
    () => ({
      title,
      width: SELECT_MODAL_WIDTH,
      maxWidth: SELECT_MODAL_WIDTH,
    }),
    [title],
  );

  return useModal({
    type: ModalType.Modal,
    props,
    modalContentRenderer: SelectModalContent,
  });
};
