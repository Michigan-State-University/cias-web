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

  const [firstMessageContent, setFirstMessageContent] = useState('');
  const [interventionId, setInterventionId] = useState('');

  const createConversation = () => {
    onCreateConversation({ firstMessageContent, interventionId });
  };

  return (
    <Row mb={16} gap={16} align="end" flexWrap="wrap" maxWidth="100%">
      <Column width={250} align="start">
        <Text mb={4}>{formatMessage(i18nMessages.firstMessage)}</Text>
        <StyledInput
          value={firstMessageContent}
          onBlur={setFirstMessageContent}
          transparent={false}
          width="100%"
          maxWidth={250}
          // @ts-ignore
          style={{ padding: 12 }}
        />
      </Column>
      <Column width={250} align="start">
        <Text mb={4}>{formatMessage(i18nMessages.interventionId)}</Text>
        <StyledInput
          value={interventionId}
          onBlur={setInterventionId}
          transparent={false}
          width="100%"
          maxWidth={250}
          // @ts-ignore
          style={{ padding: 12 }}
        />
      </Column>
      {/* @ts-ignore */}
      <Button
        color="primary"
        px={20}
        width="auto"
        disabled={!firstMessageContent || !interventionId}
        onClick={createConversation}
      >
        {formatMessage(i18nMessages.createConversation)}
      </Button>
    </Row>
  );
};
