import React, { useState, useCallback, useMemo, FC } from 'react';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ModalType } from './types';
import Modal, { Props as ModalComponentProps } from './Modal';
import ConfirmationModal, {
  Props as ConfirmationModalComponentProps,
} from './ConfirmationModal';

export type ModalContentRenderer<T> = FC<{
  closeModal: () => void;
  modalState: Nullable<T>;
}>;

export type ModalProps<T = boolean> = {
  type: ModalType.Modal;
  props: Omit<ModalComponentProps, 'children'>;
  modalContentRenderer: ModalContentRenderer<T>;
};

export type ConfirmationModalProps = {
  type: ModalType.ConfirmationModal;
  props: Omit<ConfirmationModalComponentProps, 'children'>;
};

export type HookProps<T> = ModalProps<T> | ConfirmationModalProps;

// MEMOIZE THE props OBJECT (HookProps['props']) BECAUSE OTHERWISE THERE WILL BE UNEXPECTED RERENDERS!
export const useModal = <
  T extends object | string | number | boolean = boolean,
>({
  type,
  props,
  ...restProps
}: HookProps<T>) => {
  const [modalState, setModalState] = useState<T>();

  const isModalVisible = useMemo(
    () => !isNullOrUndefined(modalState),
    [modalState],
  );

  const openModal = useCallback(
    (state: T) => {
      setModalState(state ?? true);
    },
    [setModalState],
  );

  const closeModal = useCallback(() => {
    setModalState(undefined);
  }, []);

  const sharedProps = useMemo(
    () => ({
      onClose: closeModal,
      visible: isModalVisible,
    }),
    [isModalVisible],
  );

  const renderModal = useCallback(() => {
    if (!isModalVisible) return <></>;

    switch (type) {
      case ModalType.ConfirmationModal:
        return (
          <ConfirmationModal
            {...(props as ConfirmationModalComponentProps)}
            {...sharedProps}
          />
        );
      case ModalType.Modal:
        const { modalContentRenderer } = restProps as ModalProps<T>;
        return (
          <Modal {...(props as ModalComponentProps)} {...sharedProps}>
            {modalContentRenderer({ closeModal, modalState })}
          </Modal>
        );
      default:
        return null;
    }
  }, [isModalVisible, props]);

  return { modalState, openModal, closeModal, Modal: renderModal };
};
