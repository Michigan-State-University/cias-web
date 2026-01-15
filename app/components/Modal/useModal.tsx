import React, { FC, useCallback, useMemo, useState } from 'react';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ModalType } from './types';
import Modal, { Props as ModalComponentProps } from './Modal';
import ConfirmationModal, {
  Props as ConfirmationModalComponentProps,
} from './ConfirmationModal';

export type ModalContentRendererProps<
  ModalState = boolean,
  CloseData = ModalState,
> = {
  closeModal: (data?: CloseData) => void;
  modalState: ModalState;
};

export type ModalContentRenderer<
  ModalState = boolean,
  CloseData = ModalState,
> = FC<ModalContentRendererProps<ModalState, CloseData>>;

export type ModalProps<ModalState = boolean, CloseData = ModalState> = {
  type: ModalType.Modal;
  props: Omit<ModalComponentProps, 'children' | 'onClose' | 'visible'> & {
    onClose?: (data?: CloseData) => void;
  };
  modalContentRenderer: ModalContentRenderer<ModalState, CloseData>;
};

export type ConfirmationModalProps<ModalState = boolean> = {
  type: ModalType.ConfirmationModal;
  props: Omit<
    ConfirmationModalComponentProps<ModalState>,
    'children' | 'onClose' | 'modalState' | 'visible'
  >;
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
    if (props.onClose) {
      if (type === ModalType.Modal) props.onClose(data);
      // @ts-ignore
      if (type === ModalType.ConfirmationModal) props.onClose();
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
    if (!isModalVisible) return null;

    switch (type) {
      case ModalType.ConfirmationModal:
        return (
          <ConfirmationModal
            {...(props as ConfirmationModalComponentProps<ModalState>)}
            {...sharedProps}
            modalState={modalState}
          />
        );
      case ModalType.Modal:
        const { modalContentRenderer } = restProps as ModalProps<
          ModalState,
          CloseData
        >;
        return (
          <Modal {...(props as ModalComponentProps)} {...sharedProps}>
            {modalContentRenderer({
              closeModal,
              modalState: modalState as ModalState,
            })}
          </Modal>
        );
      default:
        return null;
    }
  }, [isModalVisible, props]);

  return { modalState, openModal, closeModal, Modal: renderModal };
};
