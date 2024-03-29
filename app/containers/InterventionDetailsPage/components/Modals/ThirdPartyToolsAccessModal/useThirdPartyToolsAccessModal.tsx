import React from 'react';
import { useIntl } from 'react-intl';

import { ModalType, useModal } from 'components/Modal';
import { Intervention } from 'models/Intervention';

import messages from './messages';
import { ThirdPartyToolsAccessModal } from './ThirdPartyToolsAccessModal';

export const useThirdPartyToolsAccessModal = () => {
  const { formatMessage } = useIntl();

  const {
    openModal: openThirdPartyToolsAccessModal,
    Modal: ThirdPartyToolsModal,
  } = useModal<Intervention>({
    type: ModalType.Modal,
    modalContentRenderer: (props: {
      closeModal: () => void;
      modalState: Intervention;
    }) => <ThirdPartyToolsAccessModal {...props} />,
    props: {
      title: formatMessage(messages.thirdPartyToolsAccessModalTitle),
      height: 740,
      maxWidth: '100%',
      width: 542,
      padding: 32,
    },
  });

  return { openThirdPartyToolsAccessModal, ThirdPartyToolsModal };
};
