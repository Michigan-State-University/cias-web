import React, { memo, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { NodeProps } from 'react-flow-renderer';

import { finishQuestion } from 'models/Session/QuestionTypes';

import { themeColors } from 'theme';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import { ReactFlowNodeHandles } from 'components/ReactFlowGraph';

import messages from '../../messages';
import { QuestionTileData } from '../../types';
import {
  nodeWidth,
  questionNodeLabelOffset,
  sessionMapColors,
} from '../../constants';
import SessionMapQuestionNodeDetailedInfo from './SessionMapQuestionNodeDetailedInfo';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';

const getBorder = (detailsShown: boolean, selected: boolean) => {
  if (detailsShown) return `3px solid ${sessionMapColors.nodeDetailsShown}`;
  return selected
    ? `3px solid ${sessionMapColors.selected}`
    : `1px solid ${sessionMapColors.nodeBase}`;
};

const SessionMapQuestionNode = ({
  id,
  data: {
    question,
    showDetails,
    onShowDetailsChange,
    showDetailedInfo,
    index,
    selected,
    onSelectedChange,
  },
}: NodeProps<QuestionTileData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const { type } = question;

  const border = useMemo(
    () => getBorder(showDetails, selected),
    [showDetails, selected],
  );

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () => nodeRef?.current?.firstElementChild?.clientHeight ?? 0,
    [nodeRef.current],
  );

  const handleClick = () => onSelectedChange(!selected, id);

  const screenNo = index + 1;

  const thickBorder = showDetails || selected;

  return (
    <>
      {showDetailedInfo && (
        <Row
          position="absolute" // to make edge handles stay vertically centered on the tile
          top={-1 * questionNodeLabelOffset}
          height={questionNodeLabelOffset}
          width={nodeWidth}
          justify="center"
          cursor="default"
        >
          <Text fontSize={14} fontWeight="bold">
            {formatMessage(messages.screenNo, { no: screenNo })}
          </Text>
        </Row>
      )}
      <Box
        py={thickBorder ? 16 : 18}
        px={thickBorder ? 22 : 24}
        width={nodeWidth}
        maxHeight={146} // workaround to make dagre layout question nodes with ellipsis text correctly, update if necessary
        bg={themeColors.highlight}
        border={border}
        cursor="pointer"
        ref={nodeRef}
        onClick={handleClick}
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
            info={formatMessage(messages.screenNo, { no: screenNo })}
          />
        )}
      </Box>
      <ReactFlowNodeHandles
        nodeId={id}
        showSourceHandle={type !== finishQuestion.id}
        sourceHandleColor={
          selected ? sessionMapColors.selected : sessionMapColors.edgeBase
        }
      />
    </>
  );
};

export default memo(SessionMapQuestionNode);
