import {
  Edge,
  FlowElement,
  FlowTransform,
  isEdge,
  isNode,
  Node,
} from 'react-flow-renderer';
import dagre from 'dagre';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';
import { SessionDto } from 'models/Session/SessionDto';

import { isNanOrInfinite } from 'utils/mathUtils';

import { QuestionTileData, SessionTileData } from '../../types';
import {
  defaultMinZoom,
  defaultZoom,
  NodeType,
  sessionNodesVerticalDistanceRatio,
  questionNodesVerticalDistanceRatio,
  baseEdgeSharedAttributes,
  questionNodeLabelOffset,
} from '../../constants';

export const sortQuestionsByGroupAndPosition = (
  questionGroups: QuestionGroup[],
  questions: Question[],
): Question[] => {
  // sort all question groups itself by position
  const sortedQuestionGroups = questionGroups.sort((groupA, groupB) =>
    groupA.position <= groupB.position ? -1 : 1,
  );
  return sortedQuestionGroups.flatMap(({ id }) => {
    // questions belonging to current group
    const groupQuestions = questions.filter(
      ({ question_group_id }) => question_group_id === id,
    );
    // sort questions belonging to current group by position
    return groupQuestions.sort((questionA, questionB) =>
      questionA.position <= questionB.position ? -1 : 1,
    );
  });
};

const createQuestionNode = (
  question: Question,
  showDetails: boolean,
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void,
  showDetailedInfo: boolean,
  index: number,
): Node<QuestionTileData> => ({
  id: question.id,
  type: NodeType.QUESTION,
  position: { x: 0, y: 0 },
  data: {
    question,
    showDetails,
    onShowDetailsChange,
    showDetailedInfo,
    index,
  },
});

const createSessionNodeId = (questionId: string, sessionId: string): string =>
  `session-${sessionId}_FROM_${questionId}`;

const nodeExists = (nodes: Node[], nodeId: string): boolean =>
  Boolean(nodes.find(({ id }) => id === nodeId));

const createSessionNodesFromBranching = (
  question: Question,
  sessions: SessionDto[],
  showDetailedInfo: boolean,
): Node<SessionTileData>[] => {
  const nodes: Node<SessionTileData>[] = [];

  question.formula.patterns.forEach(({ target: targets }) =>
    targets.forEach(({ id: targetId, type }) => {
      if (!type.startsWith('Session')) return;

      const sessionIndex = sessions.findIndex(({ id }) => id === targetId);
      if (sessionIndex === -1) return;

      const sessionNodeId = createSessionNodeId(
        question.id,
        sessions[sessionIndex].id,
      );
      if (nodeExists(nodes, sessionNodeId)) return;

      nodes.push({
        id: sessionNodeId,
        type: NodeType.SESSION,
        position: { x: 0, y: 0 },
        data: {
          sessionIndex,
          showDetailedInfo,
        },
      });
    }),
  );

  return nodes;
};

export const createMapNodes = (
  questions: Question[],
  showDetailsId: string,
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void,
  showDetailedInfo: boolean,
  sessions: SessionDto[],
): Node<QuestionTileData | SessionTileData>[] =>
  questions.flatMap((question, index) => {
    const nodes: Node<QuestionTileData | SessionTileData>[] = [
      createQuestionNode(
        question,
        question.id === showDetailsId,
        onShowDetailsChange,
        showDetailedInfo,
        index,
      ),
    ];

    // creates a separate session node for each redirection from question to session
    nodes.push(
      ...createSessionNodesFromBranching(question, sessions, showDetailedInfo),
    );

    return nodes;
  });

const createEdgeId = (sourceId: string, targetId: string): string =>
  `${sourceId}_TO_${targetId}`;

const findQuestionPosition = (
  questions: Question[],
  questionId: string,
): number => questions.findIndex(({ id }) => id === questionId);

const edgeExists = (edges: Edge[], edgeId: string): boolean =>
  Boolean(edges.find(({ id }) => id === edgeId));

const createMapEdgesFromNextQuestions = (questions: Question[]): Edge[] =>
  questions.flatMap(({ id }, index) => {
    const nextNodeId = questions[index + 1]?.id;
    if (!nextNodeId) return [];
    // @ts-ignore
    return {
      id: createEdgeId(id, nextNodeId),
      source: id,
      target: nextNodeId,
      ...baseEdgeSharedAttributes,
    } as Edge;
  });

const createMapEdgesFromBranching = (
  questions: Question[],
  existingEdges: Edge[],
): Edge[] => {
  const edges = cloneDeep(existingEdges);
  // check every target of every pattern of every question
  questions.forEach(({ id: nodeId, formula: { patterns } }, questionIndex) =>
    patterns.forEach(({ target: targets }) =>
      targets.forEach(({ id: targetId, type }) => {
        if (!targetId) return;

        if (
          type.startsWith('Question') &&
          findQuestionPosition(questions, targetId) < questionIndex
        ) {
          return;
        }

        const targetNodeId = type.startsWith('Question')
          ? targetId
          : createSessionNodeId(nodeId, targetId);

        const edgeId = createEdgeId(nodeId, targetNodeId);

        if (edgeExists(edges, edgeId)) return;

        // @ts-ignore
        const edge = {
          id: edgeId,
          source: nodeId,
          target: targetNodeId,
          ...baseEdgeSharedAttributes,
        } as Edge;
        edges.push(edge);
      }),
    ),
  );
  return edges;
};

export const createMapEdges = (questions: Question[]): Edge[] => {
  const edges: Edge[] = createMapEdgesFromNextQuestions(questions);
  return createMapEdgesFromBranching(questions, edges);
};

const getVerticalDistanceRatio = (nodeType?: string): number =>
  nodeType === NodeType.SESSION
    ? sessionNodesVerticalDistanceRatio
    : questionNodesVerticalDistanceRatio;

// Example: https://reactflow.dev/examples/layouting/
export const layoutElements = (
  elements: FlowElement[],
  renderedNodes: Node[],
): {
  layoutedElements: FlowElement[];
  panAreaWidth: number;
  panAreaHeight: number;
} => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });
  elements.forEach((el) => {
    if (isNode(el)) {
      const renderedNode = renderedNodes.find(({ id }) => id === el.id);
      if (renderedNode) {
        const {
          __rf: { width, height },
          type,
        } = renderedNode;

        dagreGraph.setNode(el.id, {
          width,
          height: height * getVerticalDistanceRatio(type),
        });
      } else {
        dagreGraph.setNode(el.id, { width: 0, height: 0 });
      }
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  let panAreaWidth = 0;
  let panAreaHeight = 0;
  const layoutedElements = elements.map((el) => {
    if (isEdge(el)) return el;

    const node = dagreGraph.node(el.id);
    const { x, y, width, height } = node;
    // shift the dagre node position (anchor=center center) to the top left
    // so it matches the react flow node anchor point (top left).
    const position = {
      x: x - width / 2,
      y: y - height / 2 + questionNodeLabelOffset, // "+ questionNodeLabelOffset" - to make top padding for question node labels
    };

    panAreaWidth = Math.max(panAreaWidth, position.x + width);
    panAreaHeight = Math.max(
      panAreaHeight,
      position.y + height / getVerticalDistanceRatio(el.type),
    );

    return {
      ...el,
      position,
    };
  });

  return { layoutedElements, panAreaWidth, panAreaHeight };
};

export const calculateMinZoom = (
  panAreaWidth: number,
  panAreaHeight: number,
  containerWidth: number,
  containerHeight: number,
): number => {
  const zoomToFitWholeWidth = containerWidth / panAreaWidth;
  const zoomToFitWholeHeight = containerHeight / panAreaHeight;
  const minZoom = Math.min(zoomToFitWholeWidth, zoomToFitWholeHeight);

  if (minZoom < defaultMinZoom) {
    return defaultMinZoom;
  }

  if (minZoom > defaultZoom) {
    return defaultZoom;
  }

  return minZoom;
};

export const calculateScrollbarSizeRatio = (
  panAreaSize: number,
  containerSize: number,
  zoom: number,
): number => {
  if (panAreaSize > containerSize) {
    if (panAreaSize * zoom <= containerSize) {
      return 0;
    }
    return containerSize / panAreaSize / zoom;
  }

  if (panAreaSize * zoom <= containerSize) {
    return 0;
  }

  if (zoom > 1) {
    return 1 / zoom;
  }

  return 0;
};

export const calculateScrollbarPositionRatio = (
  position: number,
  panAreaSize: number,
  zoom: number,
  containerSize: number,
): number => {
  const positionRatio = (-1 * position) / (panAreaSize * zoom - containerSize);
  return isNanOrInfinite(positionRatio) ? 0 : positionRatio;
};

export const calculateAxisTransform = (
  positionRatio: number,
  panAreaSize: number,
  zoom: number,
  containerSize: number,
): number => -1 * positionRatio * (panAreaSize * zoom - containerSize);

export const calculateTransformToFitViewInContainer = (
  panAreaWidth: number,
  panAreaHeight: number,
  { x, y, zoom }: FlowTransform,
  containerWidth: number,
  containerHeight: number,
): FlowTransform => {
  const viewWidth = panAreaWidth * zoom;
  const viewHeight = panAreaHeight * zoom;

  const viewRightEndPosition = -1 * x + containerWidth;
  const viewBottomEndPosition = -1 * y + containerHeight;

  const newX =
    viewWidth < viewRightEndPosition ? -1 * (viewWidth - containerWidth) : x;
  const newY =
    viewHeight < viewBottomEndPosition
      ? -1 * (viewHeight - containerHeight)
      : y;

  return {
    zoom,
    x: newX,
    y: newY,
  };
};

export const calculateTransformToFitElementInView = (
  element: Node,
  { x, y, zoom }: FlowTransform,
  containerWidth: number,
  containerHeight: number,
): FlowTransform => {
  const { position, __rf: ref } = element;
  const elementLeftEndPosition = position.x * zoom;
  const elementTopEndPosition = position.y * zoom;
  const elementRightEndPosition = (position.x + ref.width) * zoom;
  const elementBottomEndPosition = (position.y + ref.height) * zoom;

  const viewRightEndPosition = -1 * x + containerWidth;
  const viewBottomEndPosition = -1 * y + containerHeight;

  if (elementLeftEndPosition < -1 * x || elementTopEndPosition < -1 * y) {
    return {
      zoom,
      x: -1 * elementLeftEndPosition,
      y: -1 * elementTopEndPosition,
    };
  }

  if (
    elementRightEndPosition > viewRightEndPosition ||
    elementBottomEndPosition > viewBottomEndPosition
  ) {
    return {
      zoom,
      x: -1 * (elementRightEndPosition - containerWidth),
      y: -1 * (elementBottomEndPosition - containerHeight),
    };
  }

  return {
    zoom,
    x,
    y,
  };
};

export const areTransformsDifferent = (
  transformA: FlowTransform,
  transformB: FlowTransform,
): boolean => !isEqual(transformA, transformB);
