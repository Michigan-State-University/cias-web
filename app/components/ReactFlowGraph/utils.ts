import {
  Edge,
  FlowElement,
  FlowTransform,
  isEdge,
  isNode,
  Node,
} from 'react-flow-renderer';
import { layout, graphlib } from 'dagre';
import isEqual from 'lodash/isEqual';

import { isNanOrInfinite } from 'utils/mathUtils';

const calculateNodeDimensionsForLayout = (
  node: Node,
  renderedNodes: Node[],
  getNodeVerticalDistanceRatio: (type?: string) => number,
): { width: number; height: number } => {
  const renderedNode = renderedNodes.find(({ id }) => id === node.id);
  if (renderedNode) {
    const {
      __rf: { width, height },
      type,
    } = renderedNode;

    return {
      width,
      height: height * getNodeVerticalDistanceRatio(type),
    };
  }
  return { width: 0, height: 0 };
};

const createDagreGraphWithElements = (
  elements: FlowElement[],
  renderedNodes: Node[],
  getNodeVerticalDistanceRatio: (type?: string) => number,
): graphlib.Graph => {
  const dagreGraph = new graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });
  elements.forEach((el) => {
    if (isNode(el)) {
      const nodeDimensions = calculateNodeDimensionsForLayout(
        el,
        renderedNodes,
        getNodeVerticalDistanceRatio,
      );
      dagreGraph.setNode(el.id, nodeDimensions);
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  return dagreGraph;
};

const getLayoutedElementsAndPanAreaDimensions = (
  elements: FlowElement[],
  dagreGraph: graphlib.Graph,
  nodeTopMargin: number,
  getNodeVerticalDistanceRatio: (type?: string) => number,
): {
  layoutedElements: FlowElement[];
  panAreaWidth: number;
  panAreaHeight: number;
} => {
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
  const dagreGraph = createDagreGraphWithElements(
    elements,
    renderedNodes,
    getNodeVerticalDistanceRatio,
  );

  layout(dagreGraph);

  return getLayoutedElementsAndPanAreaDimensions(
    elements,
    dagreGraph,
    nodeTopMargin,
    getNodeVerticalDistanceRatio,
  );
};

// edges with higher priorities will be later in the elements array so they will
// be printed later so they will be over the edges with lower priorities
export const prioritizeEdges = (
  layoutedElements: FlowElement[],
  edgePriorities: Map<string, number>,
): FlowElement[] => {
  const edges: Edge[] = [];
  const nodes: Node[] = [];

  layoutedElements.forEach((element) => {
    if (isNode(element)) {
      nodes.push(element);
    } else {
      edges.push(element);
    }
  });

  edges.sort(({ arrowHeadType: typeA }, { arrowHeadType: typeB }) => {
    const priorityA = edgePriorities.get(typeA ?? '') ?? 0; // use 0 as a default priority
    const priorityB = edgePriorities.get(typeB ?? '') ?? 0;
    return priorityA - priorityB;
  });

  return [...nodes, ...edges];
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
  currentTransform: FlowTransform,
  containerWidth: number,
  containerHeight: number,
): FlowTransform => {
  const { x, y, zoom } = currentTransform;
  const { position, __rf: ref } = element;

  const elementLeftEndPosition = position.x * zoom;
  const elementTopEndPosition = position.y * zoom;
  const elementRightEndPosition = (position.x + ref.width) * zoom;
  const elementBottomEndPosition = (position.y + ref.height) * zoom;

  const viewRightEndPosition = -1 * x + containerWidth;
  const viewBottomEndPosition = -1 * y + containerHeight;

  const fitsLeft = elementLeftEndPosition >= -1 * x;
  if (!fitsLeft) {
    return {
      ...currentTransform,
      x: -1 * elementLeftEndPosition,
    };
  }

  const fitsTop = elementTopEndPosition >= -1 * y;
  if (!fitsTop) {
    return {
      ...currentTransform,
      y: -1 * elementTopEndPosition,
    };
  }

  const fitsRight = elementRightEndPosition <= viewRightEndPosition;
  if (!fitsRight) {
    return {
      ...currentTransform,
      x: -1 * (elementRightEndPosition - containerWidth),
    };
  }

  const fitsBottom = elementBottomEndPosition <= viewBottomEndPosition;
  if (!fitsBottom) {
    return {
      ...currentTransform,
      y: -1 * (elementBottomEndPosition - containerHeight),
    };
  }

  return currentTransform;
};

export const areTransformsDifferent = (
  transformA: FlowTransform,
  transformB: FlowTransform,
): boolean => !isEqual(transformA, transformB);
