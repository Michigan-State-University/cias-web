import {
  Edge,
  FlowElement,
  FlowTransform,
  isEdge,
  isNode,
  Node,
} from 'react-flow-renderer';
import dagre from 'dagre';
import { isEqual } from 'lodash';

import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';

import { finishQuestion } from 'models/Session/QuestionTypes';

import { isNanOrInfinite } from 'utils/mathUtils';

import { QuestionTileData } from '../../types';
import {
  CustomArrowHeadType,
  defaultMinZoom,
  defaultZoom,
  sessionMapColors,
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

export const createMapNodesFromQuestions = (
  questions: Question[],
  showDetailsId: string,
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void,
  showDetailedInfo: boolean,
): Node<QuestionTileData>[] =>
  questions.map((question, index) => ({
    id: question.id,
    type: 'question',
    position: { x: 0, y: 0 },
    data: {
      question,
      showDetails: question.id === showDetailsId,
      onShowDetailsChange,
      showDetailedInfo,
      index,
    },
  }));

export const createMapEdgesFromQuestions = (questions: Question[]): Edge[] =>
  questions.flatMap((question, index) => {
    if (question.type === finishQuestion.id) return [];
    const nextNodeId = questions[index + 1]?.id;
    if (!nextNodeId) return [];
    // @ts-ignore
    return {
      id: `${question.id}-${nextNodeId}`,
      source: question.id,
      target: nextNodeId,
      arrowHeadType: CustomArrowHeadType.BASE,
      style: {
        strokeWidth: 2,
        stroke: sessionMapColors.edgeBase,
      },
    } as Edge;
  });

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
        } = renderedNode;
        dagreGraph.setNode(el.id, { width, height });
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

    const { x, y, width, height } = dagreGraph.node(el.id);
    // shift the dagre node position (anchor=center center) to the top left
    // so it matches the react flow node anchor point (top left).
    const position = {
      x: x - width / 2,
      y: y - height / 2,
    };

    panAreaWidth = Math.max(panAreaWidth, position.x + width);
    panAreaHeight = Math.max(panAreaHeight, position.y + height);

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
