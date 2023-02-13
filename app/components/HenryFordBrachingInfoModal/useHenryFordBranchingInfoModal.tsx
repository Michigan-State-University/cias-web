import { useIntl } from 'react-intl';

import { ModalType, useModal } from 'components/Modal';
import { Props as ConfirmationModalProps } from 'components/Modal/ConfirmationModal';

import messages from './messages';
import { HenryFordBranchingInfoType } from './types';

export const useHenryFordBranchingInfoModal = <T,>(
  type: HenryFordBranchingInfoType,
  confirmAction: ConfirmationModalProps<T>['confirmAction'],
) => {
  const { formatMessage } = useIntl();

  return useModal<T>({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.description),
      content: formatMessage(messages.content, { type }),
      confirmationButtonText: formatMessage(messages.okay),
      confirmationButtonStyles: {
        width: 'auto',
        padding: '0 30px',
      },
      icon: 'info',
      hideCloseButton: true,
      hideCancelButton: true,
      disableClose: true,
      confirmAction,
    },
  });
};
