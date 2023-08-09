import { useMemo } from 'react';

import { ModalProps, ModalType, useModal } from 'components/Modal';

import { SelectModalContent } from './SelectModalContent';
import { SelectModalOption } from './types';
import { SELECT_MODAL_WIDTH } from './constants';

export const useSelectModal = <Key extends string | number>(
  title: string,
  onClose: (key?: Key) => void,
) => {
  const props: ModalProps<SelectModalOption<Key>[], Key>['props'] = useMemo(
    () => ({
      title,
      width: SELECT_MODAL_WIDTH,
      maxWidth: SELECT_MODAL_WIDTH,
      onClose,
    }),
    [title, onClose],
  );

  return useModal<SelectModalOption<Key>[], Key>({
    type: ModalType.Modal,
    props,
    modalContentRenderer: SelectModalContent,
  });
};
