import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { ConversationCreatedDTO } from 'models/LiveChat';

import Row from 'components/Row';
import StyledInput from 'components/Input/StyledInput';
import { Button } from 'components/Button';
import Column from 'components/Column';
import { Text } from 'components/Text';

import i18nMessages from '../messages';

export type Props = {
  onCreateConversation: (
    conversationCreatedDTO: ConversationCreatedDTO,
  ) => void;
};

export const CreateConversationForm = ({ onCreateConversation }: Props) => {
  const { formatMessage } = useIntl();

  const [userId, setUserId] = useState('');

  const createConversation = () => {
    onCreateConversation({ userId });
  };

  return (
    <Row mb={16} gap={16} align="end" flexWrap="wrap" maxWidth="100%">
      <Column width={320} align="start">
        <Text mb={4}>{formatMessage(i18nMessages.userId)}</Text>
        <StyledInput
          value={userId}
          onBlur={setUserId}
          transparent={false}
          width="100%"
          maxWidth={320}
          // @ts-ignore
          style={{ padding: 12 }}
        />
      </Column>
      {/* @ts-ignore */}
      <Button
        color="primary"
        px={20}
        width="auto"
        disabled={!userId}
        onClick={createConversation}
      >
        {formatMessage(i18nMessages.createConversation)}
      </Button>
    </Row>
  );
};
