import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { makeSelectIsUserLoggedIn } from 'global/reducers/auth';

import { useRoleManager } from 'models/User/RolesManager';

import { ModalType, useModal } from 'components/Modal';

import messages from './messages';
import NavigatorAvailabilityModalUI from './NavigatorAvailabilityModalUI';

const NavigatorsAvailabilityModal = () => {
  const { formatMessage } = useIntl();

  const isLoggedIn = useSelector(makeSelectIsUserLoggedIn());

  const { mustSetNavigatorAvailability } = useRoleManager();

  const { openModal, closeModal, Modal } = useModal({
    type: ModalType.Modal,
    props: {
      visible: true,
      title: formatMessage(messages.navigatorAvailabilityDialogTitle),
      titleProps: {
        fontSize: 20,
        lineHeight: 1,
      },
      disableClose: true,
      hideCloseButton: true,
      maxWidth: 458,
      px: 32,
      py: 32,
    },
    modalContentRenderer: NavigatorAvailabilityModalUI,
  });

  useEffect(() => {
    if (mustSetNavigatorAvailability) {
      openModal(true);
    }
  }, [mustSetNavigatorAvailability]);

  useEffect(() => {
    if (!isLoggedIn) {
      closeModal();
    }
  }, [isLoggedIn]);

  return <Modal />;
};

export default NavigatorsAvailabilityModal;
