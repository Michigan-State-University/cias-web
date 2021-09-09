import React, { useState, useCallback, ReactNode, useMemo } from 'react';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ModalType } from './types';
import Modal, { Props as ModalComponentProps } from './Modal';
import ConfirmationModal, {
  Props as ConfirmationModalComponentProps,
} from './ConfirmationModal';

type Props = {
  modalContentRenderer: (props: { closeModal: () => void }) => ReactNode;
} & SpecificModalProps;

type SpecificModalProps = ModalProps | ConfirmationModalProps;

type ModalProps = {
  type: ModalType.Modal;
  props: ModalComponentProps;
};

type ConfirmationModalProps = {
  type: ModalType.ConfirmationModal;
  props: ConfirmationModalComponentProps;
};

export const useModal = <T,>({ modalContentRenderer, type, props }: Props) => {
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
      default:
        return (
          <Modal {...(props as ModalComponentProps)} {...sharedProps}>
            {modalContentRenderer({ closeModal })}
          </Modal>
        );
    }
  }, [isModalVisible, props]);

  return { modalState, openModal, closeModal, Modal: renderModal };
};
