import { useMemo } from 'react';

import { ModalProps, ModalType, useModal } from 'components/Modal';

import { SelectModalContent } from './SelectModalContent';
import { SelectModalOption } from './types';
import { SELECT_MODAL_WIDTH } from './constants';

export const useSelectModal = <Id extends string | number>(
  title: string,
  onClose: (id?: Id) => void,
) => {
  const props: ModalProps<SelectModalOption<Id>[], Id>['props'] = useMemo(
    () => ({
      title,
      width: SELECT_MODAL_WIDTH,
      maxWidth: SELECT_MODAL_WIDTH,
      onClose,
    }),
    [title, onClose],
  );

  return useModal<SelectModalOption<Id>[], Id>({
    type: ModalType.Modal,
    props,
    modalContentRenderer: SelectModalContent,
  });
};
