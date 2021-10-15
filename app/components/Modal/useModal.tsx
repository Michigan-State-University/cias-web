import React, { useState, useCallback, ReactNode, useMemo } from 'react';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ModalType } from './types';
import Modal, { Props as ModalComponentProps } from './Modal';
import ConfirmationModal, {
  Props as ConfirmationModalComponentProps,
} from './ConfirmationModal';

type Props<T> = SpecificModalProps<T>;

type SpecificModalProps<T> = ModalProps<T> | ConfirmationModalProps;

type ModalProps<T = boolean> = {
  type: ModalType.Modal;
  props: Omit<ModalComponentProps, 'children'>;
  modalContentRenderer: (props: {
    closeModal: () => void;
    modalState: Nullable<T | boolean>;
  }) => ReactNode;
};

type ConfirmationModalProps = {
  type: ModalType.ConfirmationModal;
  props: Omit<ConfirmationModalComponentProps, 'children'>;
};

export const useModal = <T,>({ type, props, ...restProps }: Props<T>) => {
  const [modalState, setModalState] = useState<T | boolean>();

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
