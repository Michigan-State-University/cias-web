import React, { memo, useCallback, useMemo, useState } from 'react';

import { NodeTypesType } from 'react-flow-renderer';

import { Question } from 'global/types/question';
import { QuestionGroup } from 'global/types/questionGroup';
import { SessionDto } from 'models/Session/SessionDto';
import { Answer } from 'models/Answer';

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
  edgePriorities,
  SESSION_MAP_ID,
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
  answers: Nullable<Answer[]>;
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
  answers,
}: Props): JSX.Element => {
  const [selectedNodesIds, setSelectedNodesIds] = useState<string[]>([]);

  const unselectNode = (nodeId: string) => {
    setSelectedNodesIds(selectedNodesIds.filter((id) => id !== nodeId));
  };

  const selectNode = (nodeId: string) => {
    setSelectedNodesIds([...selectedNodesIds, nodeId]);
  };

  const handleSelectedChange = useCallback(
    (selected: boolean, nodeId: string) => {
      if (selected) {
        selectNode(nodeId);
      } else {
        unselectNode(nodeId);
      }
    },
    [selectedNodesIds, setSelectedNodesIds],
  );

  const nodesSelectable = useMemo(() => !answers, [answers]);

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
        selectedNodesIds,
        handleSelectedChange,
        nodesSelectable,
      ),
      ...createMapEdges(sortedQuestions, selectedNodesIds),
    ],
    [
      sortedQuestions,
      showDetailsId,
      handleShowDetailsChange,
      showDetailedInfo,
      sessions,
      selectedNodesIds,
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
    edgePriorities,
  };

  return (
    <>
      <ReactFlowGraph {...sessionMapGraphProps} id={SESSION_MAP_ID}>
        <ReactFlowArrowHead
          type={SessionMapHeadType.BASE}
          color={sessionMapColors.edgeBase}
        />
        <ReactFlowArrowHead
          type={SessionMapHeadType.HIGHLIGHTED}
          color={sessionMapColors.selectedLight}
        />
        <ReactFlowArrowHead
          type={SessionMapHeadType.DIRECT_CONNECTION}
          color={sessionMapColors.selected}
        />
      </ReactFlowGraph>
    </>
  );
};

export default memo(SessionMap);
