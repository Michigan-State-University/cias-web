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
import { QuestionNodeData } from '../../types';
import {
  questionNodeLabelOffset,
  sessionMapColors,
  nodeThinBorderWidth,
  nodeThickBorderWidth,
  nodeVerticalNonContentWidth,
  nodeHorizontalNonContentWidth,
} from '../../constants';
import { getNodeDimensions, getNodeOpacity } from './utils';
import SessionMapQuestionNodeDetailedInfo from './SessionMapQuestionNodeDetailedInfo';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';

const SessionMapQuestionNode = ({
  id,
  data: {
    question,
    showDetails,
    onShowDetailsChange,
    showDetailedInfo,
    questionIndex,
    selected,
    onSelectedChange,
    selectableOnClick,
  },
  type: nodeType,
}: NodeProps<QuestionNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const { type } = question;

  const nodeDimensions = useMemo(() => getNodeDimensions(nodeType), [nodeType]);

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () =>
      nodeRef?.current?.firstElementChild?.clientHeight ??
      nodeDimensions.height - 2 * nodeVerticalNonContentWidth,
    [nodeRef.current?.firstElementChild?.clientHeight],
  );

  const handleClick = () =>
    selectableOnClick && onSelectedChange(!selected, id);

  const screenNo = questionIndex + 1;

  const borderWidth = useMemo(
    () =>
      showDetails || selected ? nodeThickBorderWidth : nodeThinBorderWidth,
    [showDetails, selected],
  );

  const borderColor = useMemo(() => {
    if (showDetails) return sessionMapColors.nodeDetailsShown;
    if (selected) return sessionMapColors.selected;
    return sessionMapColors.nodeBase;
  }, [showDetails, selected]);

  const opacity = getNodeOpacity(selectableOnClick, selected);

  return (
    <Row align="center" height={nodeDimensions.height}>
      {showDetailedInfo && (
        <Row
          position="absolute" // to make edge handles stay vertically centered on the tile
          top={-1 * questionNodeLabelOffset}
          height={questionNodeLabelOffset}
          width={nodeDimensions.width}
          justify="center"
          cursor="default"
          opacity={opacity}
        >
          <Text fontSize={14} fontWeight="bold">
            {formatMessage(messages.screenNo, { no: screenNo })}
          </Text>
        </Row>
      )}
      <Box
        py={nodeVerticalNonContentWidth - borderWidth}
        px={nodeHorizontalNonContentWidth - borderWidth}
        width={nodeDimensions.width}
        bg={themeColors.highlight}
        border={`${borderWidth}px solid ${borderColor}`}
        cursor={selectableOnClick ? 'pointer' : 'default'}
        opacity={opacity}
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
            minHeight={detailedInfoHeight}
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
    </Row>
  );
};

export default memo(SessionMapQuestionNode);
