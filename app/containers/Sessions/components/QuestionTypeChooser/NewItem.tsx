import React from 'react';
import { FormattedMessage } from 'react-intl';

import HoverableBox from 'components/Box/HoverableBox';
import Row from 'components/Row';
import Text from 'components/Text';
import { colors } from 'theme';

import messages from './messages';
import { DotCircle } from './styled';

type Props = {
  handleClick: () => void;
  title: string;
  color: string;
  isGroup?: boolean;
};

const NewItem = ({ handleClick, title, isGroup, color }: Props) => (
  <HoverableBox onClick={handleClick} padding={8}>
    <Row justify="between">
      <Row align="center">
        <DotCircle mr={18} bg={color} />
        <Text fontWeight="medium">{title || isGroup}</Text>
      </Row>
      {isGroup && (
        <Text color={colors.surfieGreen}>
          <FormattedMessage {...messages.createsGroup} />
        </Text>
      )}
    </Row>
  </HoverableBox>
);

export default NewItem;
