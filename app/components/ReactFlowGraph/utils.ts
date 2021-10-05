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
import { Matrix2D, MatrixNode } from 'utils/pathFinding';

import { MATRIX_X_SCALE, MATRIX_Y_SCALE } from './constants';
import { NodeDimensions } from './types';

const createDagreGraphWithElements = (
  elements: FlowElement[],
  nodeTopMargin: number,
  nodeDimensions: Map<string, NodeDimensions>,
  maxNodeHeight: number,
): graphlib.Graph => {
  const dagreGraph = new graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  elements.forEach((el) => {
    if (isNode(el)) {
      const dimensions = nodeDimensions.get(el.type!) || {
        width: 0,
        height: 0,
      };

      dagreGraph.setNode(el.id, { ...dimensions });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagreGraph.setGraph({
    rankdir: 'LR',
    ranksep: MATRIX_X_SCALE * 3, // Take into account rounding from both sides + extra margin around nodes
    nodesep: maxNodeHeight / 2 + 5 * nodeTopMargin, // Take into account rounding from both sides + extra margin around nodes
  });

  return dagreGraph;
};

const getLayoutedElementsAndPanAreaDimensions = (
  elements: FlowElement[],
  dagreGraph: graphlib.Graph,
  nodeTopMargin: number,
): {
  layoutedElements: FlowElement[];
  panAreaWidth: number;
  panAreaHeight: number;
} => {
  let panAreaWidth = 0;
  let panAreaHeight = 0;
  const layoutedElements = elements.map((el) => {
    if (isEdge(el)) return el;

    const { x, y, width, height } = dagreGraph.node(el.id);
    // shift the dagre node position (anchor=center center) to the top left
    // so it matches the react flow node anchor point (top left).
    const position = {
      x: x - width / 2,
      y: y - height / 2 + nodeTopMargin, // "+ nodeTopMargin" - to make space for question node labels
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

// Example: https://reactflow.dev/examples/layouting/
export const layoutElements = (
  elements: FlowElement[],
  nodeTopMargin: number,
  nodeDimensions: Map<string, NodeDimensions>,
  maxNodeHeight: number,
): {
  layoutedElements: FlowElement[];
  panAreaWidth: number;
  panAreaHeight: number;
} => {
  const dagreGraph = createDagreGraphWithElements(
    elements,
    nodeTopMargin,
    nodeDimensions,
    maxNodeHeight,
  );

  layout(dagreGraph);

  const { layoutedElements, panAreaWidth, panAreaHeight } =
    getLayoutedElementsAndPanAreaDimensions(
      elements,
      dagreGraph,
      nodeTopMargin,
    );

  const matrix = generate2DMatrixFromNodes(
    layoutedElements,
    dagreGraph,
    panAreaWidth,
    panAreaHeight,
    nodeTopMargin,
  );

  return {
    layoutedElements: assignMatrixToEdges(layoutedElements, matrix),
    panAreaWidth,
    panAreaHeight,
  };
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
  nodeDimensions: Map<string, NodeDimensions>,
): FlowTransform => {
  const { x, y, zoom } = currentTransform;
  const { position, type } = element;

  const { width, height } = nodeDimensions.get(type!) || {
    width: 0,
    height: 0,
  };

  const elementLeftEndPosition = position.x * zoom;
  const elementTopEndPosition = position.y * zoom;
  const elementRightEndPosition = (position.x + width) * zoom;
  const elementBottomEndPosition = (position.y + height) * zoom;

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

export const generate2DMatrixFromNodes = (
  elements: FlowElement[],
  dagreGraph: graphlib.Graph,
  graphWidth: number,
  graphHeight: number,
  nodeTopMargin: number,
): Matrix2D => {
  const scaledGraphWidth = Math.floor(graphWidth / MATRIX_X_SCALE);
  const scaledGraphHeight = Math.floor(graphHeight / MATRIX_Y_SCALE);

  const matrix: Matrix2D = instantiateEmpty2DMatrix(
    scaledGraphHeight,
    scaledGraphWidth,
  );

  elements.forEach((element) => {
    if (isNode(element)) {
      const { width, height } = dagreGraph.node(element.id);
      drawNodeOnMatrix(matrix, element, width, height, nodeTopMargin);
    }
  });

  return matrix;
};

/*
  Tried to find most efficient solution: https://stackoverflow.com/a/53029824
  TypedArray (like Int8Array) is the most efficient Array filler and creator, so it's best used for really big arrays (not compatible with libraries)
  Then according to benchmark new Array(n)+for is the second winner accross multiple browsers
*/
const instantiateEmpty2DMatrix = (width: number, height: number): Matrix2D => {
  const matrix = new Array<Array<number>>(width);

  for (let x = 0; x < width; ++x) {
    const column = new Array<number>(height);

    for (let y = 0; y < height; ++y) column[y] = MatrixNode.Walkable;

    matrix[x] = column;
  }

  return matrix;
};

const drawNodeOnMatrix = (
  matrix: Matrix2D,
  node: Node,
  width: number,
  height: number,
  nodeTopMargin: number,
) => {
  const {
    position: { x: sourceX, y: sourceY },
  } = node;

  // Scale the size up to prevent line going over node edges
  const scaledMarginSize = Math.ceil(nodeTopMargin / MATRIX_Y_SCALE);
  const scaledWidth = Math.ceil(width / MATRIX_X_SCALE);
  const scaledHeight = Math.ceil(height / MATRIX_Y_SCALE) + scaledMarginSize;
  const scaledSourceX = Math.floor(sourceX / MATRIX_X_SCALE);
  const scaledSourceY = Math.floor(sourceY / MATRIX_Y_SCALE) - scaledMarginSize;

  for (let x = scaledSourceX, targetX = x + scaledWidth; x <= targetX; x++) {
    for (let y = scaledSourceY, targetY = y + scaledHeight; y <= targetY; y++) {
      if (matrix[y] !== undefined && matrix[y][x] !== undefined)
        // eslint-disable-next-line no-param-reassign
        matrix[y][x] = MatrixNode.Blocked;
    }
  }
};

export const assignMatrixToEdges = (
  elements: FlowElement[],
  matrix: Matrix2D,
): FlowElement[] =>
  elements.map((element) => {
    if (isEdge(element))
      return {
        ...element,
        data: {
          matrix,
        },
      };

    return element;
  });

export const findMaxNodeHeight = (
  nodeDimensions: Map<string, NodeDimensions>,
): number => {
  let maxHeight = 0;

  nodeDimensions.forEach(({ height }) => {
    if (height > maxHeight) maxHeight = height;
  });

  return maxHeight;
};
