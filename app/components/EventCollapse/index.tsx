import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Collapse from 'components/Collapse';
import arrowDown from 'assets/svg/arrow-down-grey.svg';
import arrowUp from 'assets/svg/arrow-up-grey.svg';

import { colors } from 'theme';
import messages from './messages';
import { ContentContainer } from './styled';

type EventCollapseType = {
  title: string;
  eventName: string;
  onInputBlur: (value: string) => void;
};

export const EventCollapse = ({
  title,
  onInputBlur,
  eventName = '',
}: EventCollapseType) => {
  const [opened, setOpen] = useState(false);
  const [eventNameValue, setEventNameValue] = useState(eventName);

  const updateEvent = () => onInputBlur(eventNameValue);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Collapse
      label={title}
      isOpened={opened}
      onToggle={toggleOpen}
      bgOpacity={0}
      disabled
      onHideImg={arrowDown}
      onShowImg={arrowUp}
      dragHandleProps={{
        color: colors.bluewood,
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '16px',
        width: '100%',
      }}
      containerProps={{
        bg: colors.periwinkleGray,
        bgOpacity: 0.2,
        borderRadius: 5,
      }}
    >
      <ContentContainer>
        <Divider mb={16} />
        <Text mb={8}>
          <FormattedMessage {...messages.eventNameLabel} />
        </Text>
        <Input
          width="100%"
          onBlur={updateEvent}
          value={eventNameValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventNameValue(e.target.value)
          }
        />
      </ContentContainer>
    </Collapse>
  );
};

export default EventCollapse;
