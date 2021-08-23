import React, { memo, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { NodeProps } from 'react-flow-renderer';

import { finishQuestion } from 'models/Session/QuestionTypes';

import { themeColors } from 'theme';
import Box from 'components/Box';

import messages from '../messages';
import { QuestionTileData } from '../types';
import { sessionMapColors } from '../constants';
import SessionMapNodeHandles from './SessionMapNodeHandles';
import SessionMapQuestionNodeDetailedInfo from './SessionMapQuestionNodeDetailedInfo';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';

const getBorder = (detailsShown: boolean) =>
  detailsShown
    ? `3px solid ${sessionMapColors.nodeDetailsShown}`
    : `1px solid ${sessionMapColors.nodeBase}`;

const SessionMapQuestionNode = ({
  data: { question, showDetails, onShowDetailsChange, showDetailedInfo, index },
}: NodeProps<QuestionTileData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const { id, type } = question;

  const border = useMemo(() => getBorder(showDetails), [showDetails]);

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () => nodeRef?.current?.firstElementChild?.clientHeight ?? 0,
    [nodeRef.current],
  );

  return (
    <>
      <Box
        py={showDetails ? 16 : 18}
        px={showDetails ? 22 : 24}
        width={210}
        maxHeight={146} // workaround to make dagre layout question nodes with ellipsis text correctly, update if necessary
        bg={themeColors.highlight}
        border={border}
        cursor="default"
        ref={nodeRef}
      >
        {showDetailedInfo && (
          <SessionMapQuestionNodeDetailedInfo
            question={question}
            showDetails={showDetails}
            onShowDetailsChange={onShowDetailsChange}
          />
        )}
        {!showDetailedInfo && (
          <SessionMapNodeBriefInfo
            height={detailedInfoHeight}
            info={formatMessage(messages.screenNo, { no: index + 1 })}
          />
        )}
      </Box>
      <SessionMapNodeHandles
        nodeId={id}
        showSourceHandle={type !== finishQuestion.id}
      />
    </>
  );
};
export default memo(SessionMapQuestionNode);
