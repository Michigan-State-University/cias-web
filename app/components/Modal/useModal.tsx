import React, { useState, useCallback, ReactNode, useMemo } from 'react';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ModalType } from './types';
import Modal, { Props as ModalComponentProps } from './Modal';
import ConfirmationModal, {
  Props as ConfirmationModalComponentProps,
} from './ConfirmationModal';

type HookProps<T> = SpecificModalProps<T>;

type SpecificModalProps<T> = ModalProps<T> | ConfirmationModalProps;

export type ModalProps<T = boolean> = {
  type: ModalType.Modal;
  props: Omit<ModalComponentProps, 'children'>;
  modalContentRenderer: (props: {
    closeModal: () => void;
    modalState: Nullable<T | boolean>;
  }) => ReactNode;
};

export type ConfirmationModalProps = {
  type: ModalType.ConfirmationModal;
  props: Omit<ConfirmationModalComponentProps, 'children'>;
};

// MEMOIZE THE props OBJECT (HookProps['props']) BECAUSE OTHERWISE THERE WILL BE UNEXPECTED RERENDERS!
export const useModal = <T,>({ type, props, ...restProps }: HookProps<T>) => {
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

  // const memoizedProps = useDeepObjectMemo(props);
  const memoizedProps = props;

  const renderModal = useCallback(() => {
    if (!isModalVisible) return <></>;

    switch (type) {
      case ModalType.ConfirmationModal:
        return (
          <ConfirmationModal
            {...(memoizedProps as ConfirmationModalComponentProps)}
            {...sharedProps}
          />
        );
      case ModalType.Modal:
        const { modalContentRenderer } = restProps as ModalProps<T>;
        return (
          <Modal {...(memoizedProps as ModalComponentProps)} {...sharedProps}>
            {modalContentRenderer({ closeModal, modalState })}
          </Modal>
        );
      default:
        return null;
    }
  }, [isModalVisible, memoizedProps]);

  return { modalState, openModal, closeModal, Modal: renderModal };
};
