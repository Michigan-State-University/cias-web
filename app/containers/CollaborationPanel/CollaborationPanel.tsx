import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors } from 'theme';

import { makeSelectIsCollaboratingIntervention } from 'global/reducers/intervention';

import Row from 'components/Row';
import Text from 'components/Text';

import messages from './messages';

export type Props = {};

const Component: React.FC<Props> = () => {
  const { formatMessage } = useIntl();

  const isCollaborating = useSelector(makeSelectIsCollaboratingIntervention());

  // TODO negate condition
  if (isCollaborating) return null;

  return (
    <Row
      justify="center"
      align="center"
      bg={colors.lightDivider}
      height={40}
      boxSizing="border-box"
      flexShrink={0}
    >
      <Text fontSize={15} lineHeight={1.5}>
        {formatMessage(messages.currentMode)}
      </Text>
    </Row>
  );
};

export const CollaborationPanel = memo(Component);
