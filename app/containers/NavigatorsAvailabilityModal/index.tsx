import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useRoleManager } from 'models/User/RolesManager';

import { ModalType, useModal } from 'components/Modal';

import messages from './messages';
import NavigatorsAvailabilityModalUI from './NavigatorsAvailabilityModalUI';

const NavigatorsAvailabilityModal = () => {
  const { formatMessage } = useIntl();

  const { mustSetNavigatorsAvailability } = useRoleManager();

  const saveNavigatorsAvailability = () => {};

  const { openModal, Modal } = useModal({
    type: ModalType.Modal,
    props: {
      visible: true,
      title: formatMessage(messages.navigatorsAvailabilityDialogTitle),
      titleProps: {
        fontSize: 20,
        lineHeight: 1,
      },
      confirmAction: saveNavigatorsAvailability,
      disableClose: true,
      hideCloseButton: true,
      maxWidth: 458,
      px: 32,
      py: 32,
    },
    modalContentRenderer: NavigatorsAvailabilityModalUI,
  });

  useEffect(() => {
    if (mustSetNavigatorsAvailability) {
      openModal(true);
    }
  }, [mustSetNavigatorsAvailability]);

  return <Modal />;
};

export default NavigatorsAvailabilityModal;
