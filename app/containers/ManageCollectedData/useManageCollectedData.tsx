import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import { InterventionStatus } from 'models/Intervention';
import { canManageCollectedData } from 'models/Status/statusPermissions';

import globalMessages from 'global/i18n/globalMessages';

import { SELECT_MODAL_WIDTH, useSelectModal } from 'components/SelectModal';
import { ConfirmationModalProps, ModalType, useModal } from 'components/Modal';
import Column from 'components/Column';
import Text from 'components/Text';

import messages from './messages';
import { createSelectModalOptions } from './utils';
import { ManageCollectedDataOptionId } from './types';

export const useManageCollectedData = (
  interventionStatus: InterventionStatus,
) => {
  const { formatMessage } = useIntl();

  const handleSelectModalClose = (optionId?: ManageCollectedDataOptionId) => {
    if (!optionId) return;

    switch (optionId) {
      case ManageCollectedDataOptionId.CLEAR_DATA: {
        openClearDataConfirmationModal(true);
        break;
      }
      case ManageCollectedDataOptionId.DELETE_REPORTS: {
        break;
      }
      default: {
        break;
      }
    }
  };

  const { openModal: openSelectModal, Modal: SelectModal } = useSelectModal(
    formatMessage(messages.manageCollectedData),
    handleSelectModalClose,
  );

  const selectModalOptions = useMemo(
    () => createSelectModalOptions(formatMessage),
    [],
  );

  const handleOpenSelectModal = useCallback(
    () => openSelectModal(selectModalOptions),
    [openSelectModal, selectModalOptions],
  );

  const clearPersonalData = () => {
    closeClearDataConfirmationModal();
  };

  const clearDataConfirmationModalProps: ConfirmationModalProps['props'] =
    useMemo(
      () => ({
        title: formatMessage(messages.clearDataTitle),
        description: null,
        content: (
          <Column>
            <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
              {formatMessage(globalMessages.areYouSure)}
            </Text>
            <Text mt={16} fontSize={15} lineHeight={1.5}>
              {formatMessage(messages.clearDataConfirmationContent)}
            </Text>
            <Text mt={32} fontSize={15} lineHeight={1.5} opacity={0.8}>
              {formatMessage(messages.clearDataConfirmationNote)}
            </Text>
          </Column>
        ),
        contentStyles: { py: 55 },
        confirmationButtonText: formatMessage(
          messages.clearDataConfirmationButtonTitle,
        ),
        cancelButtonText: formatMessage(globalMessages.back),
        confirmAction: clearPersonalData,
        closeOnConfirm: false,
        onClose: handleOpenSelectModal,
        width: SELECT_MODAL_WIDTH,
        isMobile: true,
        hideCloseButton: true,
      }),
      [clearPersonalData, handleOpenSelectModal],
    );

  const {
    openModal: openClearDataConfirmationModal,
    Modal: ClearDataConfirmationModal,
    closeModal: closeClearDataConfirmationModal,
  } = useModal({
    type: ModalType.ConfirmationModal,
    props: clearDataConfirmationModalProps,
  });

  const ManageCollectedDataOption = useMemo(
    () => ({
      id: 'manageCollectedData',
      label: formatMessage(messages.manageCollectedData),
      icon: BinIcon,
      action: handleOpenSelectModal,
      color: colors.bluewood,
      disabled: !canManageCollectedData(interventionStatus),
    }),
    [handleOpenSelectModal, interventionStatus],
  );

  return {
    ManageCollectedDataOption,
    ManageCollectedDataModals: [
      <SelectModal key="selectManageCollectedDataModal" />,
      <ClearDataConfirmationModal key="clearDataConfirmationModal" />,
    ],
  };
};
