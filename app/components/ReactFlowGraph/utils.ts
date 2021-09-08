import {
  FlowElement,
  FlowTransform,
  isEdge,
  isNode,
  Node,
} from 'react-flow-renderer';
import dagre from 'dagre';
import isEqual from 'lodash/isEqual';

import { isNanOrInfinite } from 'utils/mathUtils';

// Example: https://reactflow.dev/examples/layouting/
export const layoutElements = (
  elements: FlowElement[],
  renderedNodes: Node[],
  getNodeVerticalDistanceRatio: (type?: string) => number,
  nodeTopMargin: number,
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
          height: height * getNodeVerticalDistanceRatio(type),
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
      y: y - height / 2 + nodeTopMargin, // "+ nodeTopMargin" - to make space for question node labels
    };

    panAreaWidth = Math.max(panAreaWidth, position.x + width);
    panAreaHeight = Math.max(
      panAreaHeight,
      position.y + height / getNodeVerticalDistanceRatio(el.type),
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
  defaultZoom: number,
  defaultMinZoom?: number,
): number => {
  const zoomToFitWholeWidth = containerWidth / panAreaWidth;
  const zoomToFitWholeHeight = containerHeight / panAreaHeight;
  const minZoom = Math.min(zoomToFitWholeWidth, zoomToFitWholeHeight);

  if (minZoom > defaultZoom) {
    return defaultZoom;
  }

  if (defaultMinZoom === undefined) return minZoom;

  if (minZoom < defaultMinZoom) {
    return defaultMinZoom;
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

export const calculateTransformToFitNodeInView = (
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
