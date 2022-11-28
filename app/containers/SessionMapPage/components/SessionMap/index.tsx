import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { NodeTypesType } from 'react-flow-renderer';

import { QuestionGroup } from 'models/QuestionGroup';
import { QuestionDTO } from 'models/Question';
import { Session } from 'models/Session';

import {
  ReactFlowGraph,
  ReactFlowGraphProps,
  ReactFlowArrowHead,
} from 'components/ReactFlowGraph';

import {
  SessionMapHeadType,
  DEFAULT_ZOOM,
  DEFAULT_MAX_ZOOM,
  SESSION_MAP_COLORS,
  DETAILED_INFO_ZOOM_THRESHOLD,
  SessionMapNodeType,
  DEFAULT_MIN_ZOOM,
  NODE_LABEL_OFFSET,
  SCROLLBAR_THICKNESS,
  SCROLLBAR_MARGIN,
  EDGE_PRIORITIES,
  SESSION_MAP_ID,
  SESSION_MAP_NODE_DIMENSIONS,
} from '../../constants';
import {
  sortAndFilterQuestions,
  createMapNodes,
  createMapEdges,
  collapseQuestionsWithoutBranching,
} from './utils';
import SessionMapSessionNode from './SessionMapSessionNode';
import SessionMapQuestionNode from './SessionMapQuestionNode';
import SessionMapCollapseNode from './SessionMapCollapseNode';
import SessionMapTlfbNode from './SessionMapTlfbNode';

const nodeTypes: NodeTypesType = {
  [SessionMapNodeType.QUESTION]: SessionMapQuestionNode,
  [SessionMapNodeType.SESSION]: SessionMapSessionNode,
  [SessionMapNodeType.TLFB]: SessionMapTlfbNode,
  [SessionMapNodeType.COLLAPSE]: SessionMapCollapseNode,
};

type Props = {
  questions: QuestionDTO[];
  questionGroups: QuestionGroup[];
  sessions: Session[];
  showDetailsId: string;
  onShowDetailsIdChange: (showDetailsId: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom: number;
  onMinZoomChange: (minZoom: number) => void;
  userSessionNodesIds: string[];
  showWithBranchingOnly: boolean;
  onIsBranchingChange: (isBranching: boolean) => void;
  onlyRenderVisibleElements: boolean;
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
  showWithBranchingOnly,
  onIsBranchingChange,
  onlyRenderVisibleElements,
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
    () => zoom > DETAILED_INFO_ZOOM_THRESHOLD,
    [zoom],
  );

  const sortedQuestions = useMemo(
    () => sortAndFilterQuestions(questionGroups, questions),
    [questions, questionGroups],
  );

  const [nodes, edges] = useMemo(
    () => [
      createMapNodes(
        sortedQuestions,
        showDetailsId,
        handleShowDetailsChange,
        showDetailedInfo,
        sessions,
        selectedNodesIds,
        handleSelectedChange,
        nodesSelectableOnClick,
      ),
      createMapEdges(
        sortedQuestions,
        selectedNodesIds,
        nodesSelectableOnClick,
        sessions,
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

  const isBranching = useMemo(
    () => edges.length !== nodes.length - 1,
    [nodes, edges],
  );

  useEffect(() => {
    onIsBranchingChange(isBranching);
  }, [isBranching]);

  const elements = useMemo(() => {
    if (showWithBranchingOnly) {
      return collapseQuestionsWithoutBranching(nodes, edges);
    }

    return [...nodes, ...edges];
  }, [showWithBranchingOnly, nodes, edges]);

  const sessionMapGraphProps: ReactFlowGraphProps = {
    defaultMinZoom: DEFAULT_MIN_ZOOM,
    defaultMaxZoom: DEFAULT_MAX_ZOOM,
    defaultZoom: DEFAULT_ZOOM,
    zoom,
    onZoomChange,
    minZoom,
    onMinZoomChange,
    elements,
    nodeTypes,
    nodeTopMargin: NODE_LABEL_OFFSET,
    nodeDimensions: SESSION_MAP_NODE_DIMENSIONS,
    pickedNodeId: showDetailsId,
    nodesDraggable: false,
    nodesConnectable: false,
    scrollbarsThickness: SCROLLBAR_THICKNESS,
    scrollbarsMargin: SCROLLBAR_MARGIN,
    edgePriorities: EDGE_PRIORITIES,
    onlyRenderVisibleElements,
  };

  return (
    <>
      <ReactFlowGraph {...sessionMapGraphProps} id={SESSION_MAP_ID}>
        <ReactFlowArrowHead
          type={SessionMapHeadType.BASE}
          color={SESSION_MAP_COLORS.edgeBase}
        />
        <ReactFlowArrowHead
          type={SessionMapHeadType.HIGHLIGHTED}
          color={SESSION_MAP_COLORS.selectedLight}
        />
        <ReactFlowArrowHead
          type={SessionMapHeadType.DIRECT_CONNECTION}
          color={SESSION_MAP_COLORS.selected}
        />
        <ReactFlowArrowHead
          type={SessionMapHeadType.GRAYED_OUT}
          color={SESSION_MAP_COLORS.grayedOut}
        />
      </ReactFlowGraph>
    </>
  );
};

export default memo(SessionMap);
