import { useIntl } from 'react-intl';

import { ModalType, useModal } from 'components/Modal';
import { Props as ConfirmationModalProps } from 'components/Modal/ConfirmationModal';

import messages from './messages';
import { HenryFordBranchingInfoType } from './types';

export const useHenryFordBranchingInfoModal = (
  type: HenryFordBranchingInfoType,
  confirmAction: ConfirmationModalProps['confirmAction'],
) => {
  const { formatMessage } = useIntl();

  return useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.description),
      content: formatMessage(messages.content, { type }),
      confirmationButtonText: formatMessage(messages.okay),
      confirmationButtonStyles: {
        width: 'auto',
        padding: '0 30px',
      },
      confirmationButtonColor: 'primary',
      icon: 'info',
      hideCloseButton: true,
      hideCancelButton: true,
      disableClose: true,
      confirmAction,
    },
  });
};
