import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import { useSelectModal } from 'components/SelectModal';

import messages from './messages';
import { createSelectModalOptions } from './utils';
import { ManageCollectedDataOptionId } from './types';

export const useManageCollectedData = () => {
  const { formatMessage } = useIntl();

  const handleSelectModalClose = (optionId?: ManageCollectedDataOptionId) => {
    if (!optionId) return;

    switch (optionId) {
      case ManageCollectedDataOptionId.CLEAR_DATA: {
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

  const ManageCollectedDataOption = useMemo(
    () => ({
      id: 'manageCollectedData',
      label: formatMessage(messages.manageCollectedData),
      icon: BinIcon,
      action: handleOpenSelectModal,
      color: colors.bluewood,
    }),
    [handleOpenSelectModal],
  );

  return {
    ManageCollectedDataOption,
    ManageCollectedDataModal: SelectModal,
  };
};
