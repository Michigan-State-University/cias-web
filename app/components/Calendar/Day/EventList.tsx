import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';

import { EventData } from 'models/Tlfb';

import { colors } from 'theme';

import Box from 'components/Box';
import Circle from 'components/Circle';

import messages from '../messages';
import { StyledText } from './styled';

export type EventListProps = {
  events: EventData[];
  textColor?: CSSProperties['color'];
};

export const EventList = ({ events, textColor }: EventListProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      {events.map(({ name, id }) => (
        <Box key={id} display="flex" align="center" mt={8}>
          {/* @ts-ignore */}
          <Circle bg={colors.azureBlue} size="5px" />
          <StyledText ml={4} color={textColor}>
            {name || formatMessage(messages.defaultEventName)}
          </StyledText>
        </Box>
      ))}
    </>
  );
};
