import React, { memo, useCallback, useMemo, useState } from 'react';

import { NodeTypesType } from 'react-flow-renderer';

import { Question } from 'global/types/question';
import { QuestionGroup } from 'global/types/questionGroup';
import { SessionDto } from 'models/Session/SessionDto';

import {
  ReactFlowGraph,
  ReactFlowGraphProps,
  ReactFlowArrowHead,
} from 'components/ReactFlowGraph';

import {
  SessionMapHeadType,
  defaultZoom,
  defaultMaxZoom,
  sessionMapColors,
  detailedInfoZoomThreshold,
  SessionMapNodeType,
  defaultMinZoom,
  questionNodeLabelOffset,
  scrollbarsThickness,
  scrollbarsMargin,
} from '../../constants';
import {
  sortQuestionsByGroupAndPosition,
  createMapNodes,
  createMapEdges,
  getNodeVerticalDistanceRatio,
} from './utils';
import SessionMapSessionNode from './SessionMapSessionNode';
import SessionMapQuestionNode from './SessionMapQuestionNode';

const nodeTypes: NodeTypesType = {
  [SessionMapNodeType.QUESTION]: SessionMapQuestionNode,
  [SessionMapNodeType.SESSION]: SessionMapSessionNode,
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
  const [selectedQuestionsIds, setSelectedQuestionsIds] = useState<string[]>(
    [],
  );

  const unselectQuestion = (questionId: string) => {
    setSelectedQuestionsIds(
      selectedQuestionsIds.filter((id) => id !== questionId),
    );
  };

  const selectQuestion = (questionId: string) => {
    setSelectedQuestionsIds([...selectedQuestionsIds, questionId]);
  };

  const handleSelectedChange = useCallback(
    (selected: boolean, questionId: string) => {
      if (selected) {
        selectQuestion(questionId);
      } else {
        unselectQuestion(questionId);
      }
    },
    [selectedQuestionsIds, setSelectedQuestionsIds],
  );

  const handleShowDetailsChange = useCallback(
    (showDetails: boolean, questionId: string) => {
      onShowDetailsIdChange(showDetails ? questionId : '');
    },
    [onShowDetailsIdChange],
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
        selectedQuestionsIds,
        handleSelectedChange,
      ),
      ...createMapEdges(sortedQuestions),
    ],
    [
      sortedQuestions,
      showDetailsId,
      handleShowDetailsChange,
      showDetailedInfo,
      sessions,
      selectedQuestionsIds,
      handleSelectedChange,
    ],
  );

  const sessionMapGraphProps: ReactFlowGraphProps = {
    defaultMinZoom,
    defaultMaxZoom,
    defaultZoom,
    zoom,
    onZoomChange,
    minZoom,
    onMinZoomChange,
    elements,
    nodeTypes,
    getNodeVerticalDistanceRatio,
    nodeTopMargin: questionNodeLabelOffset,
    pickedNodeId: showDetailsId,
    nodesDraggable: false,
    nodesConnectable: false,
    scrollbarsThickness,
    scrollbarsMargin,
  };

  return (
    <>
      <ReactFlowGraph {...sessionMapGraphProps}>
        <ReactFlowArrowHead
          type={SessionMapHeadType.BASE}
          color={sessionMapColors.edgeBase}
        />
        <ReactFlowArrowHead
          type={SessionMapHeadType.SELECTED}
          color={sessionMapColors.selected}
        />
      </ReactFlowGraph>
    </>
  );
};

export default memo(SessionMap);
