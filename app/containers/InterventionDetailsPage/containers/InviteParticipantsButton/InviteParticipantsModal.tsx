import { FC } from 'react';
import { useIntl } from 'react-intl';

import Modal, { Props as ModalComponentProps } from 'components/Modal/Modal';
import Column from 'components/Column';

import messages from './messages';
import {
  INVITE_PARTICIPANTS_MODAL_HEIGHT,
  INVITE_PARTICIPANTS_MODAL_WIDTH,
} from './constants';

export type Props = {
  organizationId: Nullable<string>;
} & Pick<ModalComponentProps, 'visible' | 'onClose'>;

export const InviteParticipantsModal: FC<Props> = ({ visible, onClose }) => {
  const { formatMessage } = useIntl();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={formatMessage(messages.inviteParticipantsModalTitle)}
      width={INVITE_PARTICIPANTS_MODAL_WIDTH}
      height={INVITE_PARTICIPANTS_MODAL_HEIGHT}
      pt={24}
      px={24}
      pb={16}
      titleProps={{
        lineHeight: '36px',
      }}
      stretchContent
      contentContainerProps={{
        mt: 20,
      }}
    >
      <Column height="100%"></Column>
    </Modal>
  );
};
