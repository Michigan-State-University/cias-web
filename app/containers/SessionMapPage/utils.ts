import { Edge, FlowElement, isEdge, isNode, Node } from 'react-flow-renderer';
import dagre from 'dagre';

import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';

import { finishQuestion } from 'models/Session/QuestionTypes';

import { QuestionTileData } from './types';
import {
  CustomArrowHeadType,
  defaultMinZoom,
  defaultZoom,
  sessionMapColors,
} from './constants';
import { isNanOrInfinite } from '../../utils/mathUtils';

export const sortQuestionsByGroupAndPosition = (
  questionGroups: QuestionGroup[],
  questions: Question[],
): Question[] =>
  questionGroups.flatMap(({ id }) =>
    questions.filter(({ question_group_id }) => question_group_id === id),
  );

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
    const nextNodeId = questions[index + 1].id;
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
