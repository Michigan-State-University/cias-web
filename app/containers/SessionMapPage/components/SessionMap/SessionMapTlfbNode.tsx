import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { NodeProps } from 'react-flow-renderer';

import { TlfbNodeData } from '../../types';
import { SESSION_MAP_COLORS } from '../../constants';
import messages from '../../messages';

import SessionMapInteractiveNodeContainer from './SessionMapInteractiveNodeContainer';
import { SessionMapScreenInfo } from './SessionMapScreenInfo';

const SessionMapTlfbNode = ({
  id,
  data,
  type: nodeType,
}: NodeProps<TlfbNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const { tlfbQuestion } = data;
  const { type, body } = tlfbQuestion;

  return (
    <SessionMapInteractiveNodeContainer
      nodeType={nodeType}
      nodeId={id}
      nodeData={data}
      displaySourceHandle
      label={formatMessage(messages.tlfbAssessment)}
      briefInfo={formatMessage(messages.tlfb)}
      backgroundColor={SESSION_MAP_COLORS.questionNodeBackground}
      backgroundOpacity={1}
      borderStyle="solid"
    >
      <SessionMapScreenInfo
        id={id}
        type={type}
        typeText={formatMessage(messages.timelineFollowback)}
        infoText={body.data[0].payload.head_question}
      />
    </SessionMapInteractiveNodeContainer>
  );
};

export default memo(SessionMapTlfbNode);
