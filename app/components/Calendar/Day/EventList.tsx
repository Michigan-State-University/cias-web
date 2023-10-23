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
  wrap?: boolean;
};

const EventList = ({ events, textColor, wrap }: EventListProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      {events.map(({ name, id }) => (
        <Box
          key={id}
          display="flex"
          align="center"
          marginBlockStart={events.length > 1 ? 8 : 0}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {/* @ts-ignore */}
          <Circle bg={colors.azureBlue} size="5px" doNotShrink />
          <StyledText
            marginInlineStart={4}
            color={textColor}
            wrap={wrap}
            ellipsis
          >
            {name || formatMessage(messages.defaultEventName)}
          </StyledText>
        </Box>
      ))}
    </>
  );
};

export default EventList;
