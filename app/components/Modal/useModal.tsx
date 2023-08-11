import React, { FC, useCallback, useMemo, useState } from 'react';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ModalType } from './types';
import Modal, { Props as ModalComponentProps } from './Modal';
import ConfirmationModal, {
  Props as ConfirmationModalComponentProps,
} from './ConfirmationModal';

export type ModalContentRendererProps<ModalState, CloseData> = {
  closeModal: (data?: CloseData) => void;
  modalState: Nullable<ModalState>;
};

export type ModalContentRenderer<ModalState, CloseData> = FC<
  ModalContentRendererProps<ModalState, CloseData>
>;

export type ModalProps<ModalState = boolean, CloseData = ModalState> = {
  type: ModalType.Modal;
  props: Omit<ModalComponentProps, 'children' | 'onClose'> & {
    onClose?: (data?: CloseData) => void;
  };
  modalContentRenderer: ModalContentRenderer<ModalState, CloseData>;
};

export type ConfirmationModalProps = {
  type: ModalType.ConfirmationModal;
  props: Omit<ConfirmationModalComponentProps, 'children' | 'onClose'>;
};

export type HookProps<ModalState, CloseData> =
  | ModalProps<ModalState, CloseData>
  | ConfirmationModalProps;

// MEMOIZE THE props OBJECT (HookProps['props']) BECAUSE OTHERWISE THERE WILL BE UNEXPECTED RERENDERS!
export const useModal = <
  ModalState extends object | string | number | boolean = boolean,
  CloseData = ModalState,
>({
  type,
  props,
  ...restProps
}: HookProps<ModalState, CloseData>) => {
  const [modalState, setModalState] = useState<ModalState>();

  const isModalVisible = useMemo(
    () => !isNullOrUndefined(modalState),
    [modalState],
  );

  const openModal = useCallback(
    (state: ModalState) => {
      setModalState(state ?? true);
    },
    [setModalState],
  );

  const closeModal = useCallback((data?: CloseData) => {
    if (type === ModalType.Modal && props.onClose) {
      props.onClose(data);
    }
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
        const { modalContentRenderer } = restProps as ModalProps<
          ModalState,
          CloseData
        >;
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
