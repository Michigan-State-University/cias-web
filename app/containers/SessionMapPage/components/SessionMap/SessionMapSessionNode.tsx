import React, { memo } from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import Text from 'components/Text';

import { SessionNodeData } from '../../types';
import { SESSION_MAP_COLORS } from '../../constants';
import messages from '../../messages';

import SessionMapInteractiveNodeContainer from './SessionMapInteractiveNodeContainer';

const SessionMapSessionNode = ({
  id,
  data,
  type: nodeType,
}: NodeProps<SessionNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const { sessionIndex } = data;

  const sessionNo = sessionIndex + 1;

  const briefInfo = formatMessage(messages.sessionNo, { no: sessionNo });

  return (
    <SessionMapInteractiveNodeContainer
      nodeType={nodeType}
      nodeId={id}
      nodeData={data}
      briefInfo={briefInfo}
      backgroundColor={SESSION_MAP_COLORS.sessionNodeBackground}
      backgroundOpacity={0.3}
      borderStyle="dashed"
    >
      <Text mb={12} fontSize={12} fontWeight="bold">
        {formatMessage(messages.redirectionTo, { no: sessionNo })}
      </Text>
      <Markup content={formatMessage(messages.switchSession)} noWrap />
    </SessionMapInteractiveNodeContainer>
  );
};

export default memo(SessionMapSessionNode);
