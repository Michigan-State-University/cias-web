import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { NodeProps } from 'react-flow-renderer';

import { finishQuestion } from 'models/Session/QuestionTypes';

import messages from '../../messages';
import { QuestionNodeData } from '../../types';

import { SessionMapInteractiveNodeContainer } from './SessionMapInteractiveNodeContainer';
import { SESSION_MAP_COLORS } from '../../constants';
import { SessionMapScreenInfo } from './SessionMapScreenInfo';

const SessionMapQuestionNode = ({
  id,
  data,
  type: nodeType,
}: NodeProps<QuestionNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const { question, showDetails, onShowDetailsChange, questionIndex } = data;
  const { type, subtitle } = question;

  const screenNo = questionIndex + 1;

  const label = formatMessage(messages.screenNo, { no: screenNo });

  return (
    <SessionMapInteractiveNodeContainer
      nodeType={nodeType}
      nodeId={id}
      nodeData={data}
      showDetails={showDetails}
      onShowDetailsChange={onShowDetailsChange}
      displaySourceHandle={type !== finishQuestion.id}
      label={label}
      briefInfo={label}
      backgroundColor={SESSION_MAP_COLORS.questionNodeBackground}
      backgroundOpacity={1}
      borderStyle="solid"
    >
      <SessionMapScreenInfo id={id} type={type} infoText={subtitle} />
    </SessionMapInteractiveNodeContainer>
  );
};

export default memo(SessionMapQuestionNode);
