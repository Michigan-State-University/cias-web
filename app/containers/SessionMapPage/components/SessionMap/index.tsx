import React, { memo, useCallback, useMemo } from 'react';

import { NodeTypesType } from 'react-flow-renderer';

import { Question } from 'global/types/question';
import { QuestionGroup } from 'global/types/questionGroup';
import { SessionDto } from 'models/Session/SessionDto';

import ReactFlowGraph from 'components/ReactFlowGraph';

import {
  CustomArrowHeadType,
  defaultZoom,
  defaultMaxZoom,
  sessionMapColors,
  detailedInfoZoomThreshold,
  NodeType,
  defaultMinZoom,
  questionNodeLabelOffset,
} from '../../constants';
import {
  sortQuestionsByGroupAndPosition,
  createMapNodes,
  createMapEdges,
  getNodeVerticalDistanceRatio,
} from './utils';
import SessionMapSessionNode from './SessionMapSessionNode';
import SessionMapCustomArrowHead from './SessionMapCustomArrowHead';
import SessionMapQuestionNode from './SessionMapQuestionNode';

const nodeTypes: NodeTypesType = {
  [NodeType.QUESTION]: SessionMapQuestionNode,
  [NodeType.SESSION]: SessionMapSessionNode,
};

type Props = {
  questions: Question[];
  questionGroups: QuestionGroup[];
  sessions: SessionDto[];
  showDetailsId: string;
  onShowDetailsIdChange: (showDetailsId: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom: number;
  onMinZoomChange: (minZoom: number) => void;
};

const SessionMap = ({
  questions,
  questionGroups,
  sessions,
  showDetailsId,
  onShowDetailsIdChange,
  zoom,
  onZoomChange,
  minZoom,
  onMinZoomChange,
}: Props): JSX.Element => {
  const handleShowDetailsChange = useCallback(
    (showDetails: boolean, questionId: string) => {
      onShowDetailsIdChange(showDetails ? questionId : '');
    },
    [],
  );

  const showDetailedInfo = useMemo(
    () => zoom > detailedInfoZoomThreshold,
    [zoom],
  );

  const sortedQuestions = useMemo(
    () => sortQuestionsByGroupAndPosition(questionGroups, questions),
    [questions, questionGroups],
  );

  const elements = useMemo(
    () => [
      ...createMapNodes(
        sortedQuestions,
        showDetailsId,
        handleShowDetailsChange,
        showDetailedInfo,
        sessions,
      ),
      ...createMapEdges(sortedQuestions),
    ],
    [sortedQuestions, showDetailsId, showDetailedInfo],
  );

  return (
    <>
      <ReactFlowGraph
        defaultMinZoom={defaultMinZoom}
        defaultMaxZoom={defaultMaxZoom}
        defaultZoom={defaultZoom}
        zoom={zoom}
        onZoomChange={onZoomChange}
        minZoom={minZoom}
        onMinZoomChange={onMinZoomChange}
        elements={elements}
        nodeTypes={nodeTypes}
        getNodeVerticalDistanceRatio={getNodeVerticalDistanceRatio}
        nodeTopMargin={questionNodeLabelOffset}
        pickedNodeId={showDetailsId}
      >
        <SessionMapCustomArrowHead
          id={`react-flow__${CustomArrowHeadType.BASE}`}
          color={sessionMapColors.edgeBase}
        />
        <SessionMapCustomArrowHead
          id={`react-flow__${CustomArrowHeadType.SELECTED}`}
          color={sessionMapColors.selected}
        />
      </ReactFlowGraph>
    </>
  );
};

export default memo(SessionMap);
