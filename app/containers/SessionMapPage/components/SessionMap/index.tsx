import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { NodeTypesType } from 'react-flow-renderer';

import { QuestionGroup } from 'models/QuestionGroup';
import { Question } from 'models/Question';
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
  edgePriorities,
  SESSION_MAP_ID,
} from '../../constants';
import {
  sortQuestionsByGroupAndPosition,
  createMapNodes,
  createMapEdges,
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
  userSessionNodesIds: string[];
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
  userSessionNodesIds,
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

  useEffect(() => {
    if (userSessionNodesIds.length) setSelectedNodesIds(userSessionNodesIds);
  }, [userSessionNodesIds]);

  const nodesSelectableOnClick = useMemo(
    () => !userSessionNodesIds.length,
    [userSessionNodesIds],
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
        selectedNodesIds,
        handleSelectedChange,
        nodesSelectableOnClick,
      ),
      ...createMapEdges(
        sortedQuestions,
        selectedNodesIds,
        nodesSelectableOnClick,
      ),
    ],
    [
      sortedQuestions,
      showDetailsId,
      handleShowDetailsChange,
      showDetailedInfo,
      sessions,
      selectedNodesIds,
      handleSelectedChange,
      nodesSelectableOnClick,
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
        <ReactFlowArrowHead
          type={SessionMapHeadType.GRAYED_OUT}
          color={sessionMapColors.grayedOut}
        />
      </ReactFlowGraph>
    </>
  );
};

export default memo(SessionMap);
