import React, { MouseEvent, useState } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Input from 'components/Input';
import Text from 'components/Text';
import Row from 'components/Row';
import { ImageButton } from 'components/Button';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import messages from './messages';
import { ContentContainer } from './styled';

export type EventInputType = {
  eventName: string;
  onInputBlur: (value: string) => void;
  onDelete: () => void;
};

export const EventInput = ({
  onInputBlur,
  eventName = '',
  onDelete,
}: EventInputType) => {
  const [eventNameValue, setEventNameValue] = useState(eventName);

  const { formatMessage } = useIntl();

  const updateEvent = () => onInputBlur(eventNameValue);

  const handleDelete = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <ContentContainer>
      <Text mb={8}>{formatMessage(messages.eventNameLabel)}</Text>
      <Row gap="12px">
        <Input
          width="100%"
          onBlur={updateEvent}
          value={eventNameValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventNameValue(e.target.value)
          }
          placeholder={formatMessage(messages.eventNamePlaceholder)}
        />
        <ImageButton
          src={binNoBg}
          onClick={handleDelete}
          title={`${formatMessage(messages.delete)} ${eventName}`}
          fill={colors.coolGrey}
        />
      </Row>
    </ContentContainer>
  );
};

export default EventInput;
