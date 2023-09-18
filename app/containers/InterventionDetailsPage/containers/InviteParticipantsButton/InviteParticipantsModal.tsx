import { FC } from 'react';

import Modal, { Props as ModalComponentProps } from 'components/Modal/Modal';

import { ShareBox, ShareBoxType } from 'containers/ShareBox';
import { useIntl } from 'react-intl';
import messages from './messages';

export type Props = {
  organizationId: Nullable<string>;
} & Pick<ModalComponentProps, 'visible' | 'onClose'>;

export const InviteParticipantsModal: FC<Props> = ({
  visible,
  onClose,
  organizationId,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={formatMessage(messages.inviteParticipantsModalTitle)}
    >
      <ShareBox
        type={ShareBoxType.INTERVENTION}
        organizationId={organizationId}
      />
    </Modal>
  );
};
