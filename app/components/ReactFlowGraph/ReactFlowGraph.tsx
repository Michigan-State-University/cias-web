import React, { memo, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Elements,
  FlowTransform,
  NodeTypesType,
  ReactFlowProps,
  useStoreState,
  useZoomPanHelper,
} from 'react-flow-renderer';
import isEqual from 'lodash/isEqual';

import Row from 'components/Row';
import Column from 'components/Column';
import Scrollbar from 'components/Scrollbar';

import {
  areTransformsDifferent,
  calculateAxisTransform,
  calculateMinZoom,
  calculateScrollbarPositionRatio,
  calculateScrollbarSizeRatio,
  calculateTransformToFitNodeInView,
  calculateTransformToFitViewInContainer,
  layoutElements,
  prioritizeEdges,
} from './utils';
import { CustomConnectionLineType } from './types';
import PathFindingEdge from './custom/PathFindingEdge';

export const edgeTypes = {
  [CustomConnectionLineType.PathFind]: PathFindingEdge,
};

export interface ReactFlowGraphProps extends ReactFlowProps {
  defaultMinZoom?: number;
  defaultMaxZoom?: number;
  defaultZoom?: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom?: number;
  onMinZoomChange?: (minZoom: number) => void;
  elements: Elements;
  nodeTypes: NodeTypesType;
  nodeTopMargin?: number;
  pickedNodeId?: string;
  scrollbarsThickness?: number;
  scrollbarsMargin?: number;
  edgePriorities?: Map<string, number>;
  children?: React.ReactNode | React.ReactNode[];
  shouldLayout: boolean;
}

const ReactFlowGraph = ({
  defaultMinZoom,
  defaultMaxZoom,
  defaultZoom = 1,
  zoom,
  onZoomChange,
  minZoom,
  onMinZoomChange,
  elements,
  nodeTypes,
  nodeTopMargin = 0,
  pickedNodeId,
  scrollbarsThickness = 0,
  scrollbarsMargin = 0,
  edgePriorities,
  children,
  shouldLayout,
  ...restReactFlowProps
}: ReactFlowGraphProps): JSX.Element => {
  const { zoomTo, transform } = useZoomPanHelper();
  const containerWidth = useStoreState((state) => state.width);
  const containerHeight = useStoreState((state) => state.height);
  const renderedNodes = useStoreState((state) => state.nodes);

  const [mapLoaded, setMapLoaded] = useState(false);

  const [currentTransform, setCurrentTransform] = useState<FlowTransform>({
    x: 0,
    y: 0,
    zoom,
  });

  const [horizontalScrollbarSizeRatio, setHorizontalScrollbarSizeRatio] =
    useState(0);
  const [verticalScrollbarSizeRatio, setVerticalScrollbarSizeRatio] =
    useState(0);

  const [
    horizontalScrollbarPositionRatio,
    setHorizontalScrollbarPositionRatio,
  ] = useState(0);
  const [verticalScrollbarPositionRatio, setVerticalScrollbarPositionRatio] =
    useState(0);

  useEffect(() => {
    zoomTo(zoom);
  }, [zoom]);

  const { layoutedElements, panAreaWidth, panAreaHeight } = useMemo(
    () =>
      mapLoaded
        ? layoutElements(elements, renderedNodes, nodeTopMargin)
        : { layoutedElements: elements, panAreaWidth: 0, panAreaHeight: 0 },
    [mapLoaded, elements, nodeTopMargin, shouldLayout],
  );

  const layoutedElementsWithPrioritizedEdges = useMemo(
    () =>
      mapLoaded && edgePriorities
        ? prioritizeEdges(layoutedElements, edgePriorities)
        : layoutedElements,
    [mapLoaded, layoutedElements, edgePriorities],
  );

  useEffect(() => {
    if (onMinZoomChange) {
      onMinZoomChange(
        calculateMinZoom(
          panAreaWidth,
          panAreaHeight,
          containerWidth,
          containerHeight,
          defaultZoom,
          defaultMinZoom,
        ),
      );
    }
  }, [
    panAreaWidth,
    panAreaHeight,
    containerWidth,
    containerHeight,
    defaultZoom,
    defaultMinZoom,
  ]);

  useEffect(() => {
    setHorizontalScrollbarSizeRatio(
      calculateScrollbarSizeRatio(panAreaWidth, containerWidth, zoom),
    );
  }, [panAreaWidth, containerWidth, zoom]);

  useEffect(() => {
    setVerticalScrollbarSizeRatio(
      calculateScrollbarSizeRatio(panAreaHeight, containerHeight, zoom),
    );
  }, [panAreaHeight, containerHeight, zoom]);

  const fitPickedNodeInView = () => {
    const pickedNode = renderedNodes.find(({ id }) => id === pickedNodeId);
    if (!pickedNode) return;

    const newTransform = calculateTransformToFitNodeInView(
      pickedNode,
      currentTransform,
      containerWidth,
      containerHeight,
    );

    if (areTransformsDifferent(currentTransform, newTransform)) {
      transform(newTransform);
    }
  };

  const fitViewInContainer = () => {
    const newTransform = calculateTransformToFitViewInContainer(
      panAreaWidth,
      panAreaHeight,
      currentTransform,
      containerWidth,
      containerHeight,
    );

    if (areTransformsDifferent(currentTransform, newTransform)) {
      transform(newTransform);
    }
  };

  useEffect(() => {
    fitViewInContainer();
    if (pickedNodeId) {
      fitPickedNodeInView();
    }
  }, [containerWidth, containerHeight, renderedNodes]);

  const handleScrollbarPositionRatioChange =
    (axis: 'x' | 'y') => (newScrollbarPositionRatio: number) => {
      const axisTransform = calculateAxisTransform(
        newScrollbarPositionRatio,
        axis === 'x' ? panAreaWidth : panAreaHeight,
        zoom,
        axis === 'x' ? containerWidth : containerHeight,
      );
      const newTransform = { ...currentTransform };
      newTransform[axis] = axisTransform;
      transform(newTransform);
    };

  const handleMove = (newTransform?: FlowTransform) => {
    if (!newTransform || isEqual(newTransform, currentTransform)) return;

    const fitsWidth = panAreaWidth * newTransform.zoom < containerWidth;
    const fitsHeight = panAreaHeight * newTransform.zoom < containerHeight;

    if (
      (fitsWidth && newTransform.x !== 0) ||
      (fitsHeight && newTransform.y !== 0)
    ) {
      const limitedTransform = {
        zoom: newTransform.zoom,
        x: fitsWidth ? 0 : newTransform.x,
        y: fitsHeight ? 0 : newTransform.y,
      };
      transform(limitedTransform);
      return;
    }

    setCurrentTransform(newTransform);
    setHorizontalScrollbarPositionRatio(
      calculateScrollbarPositionRatio(
        newTransform.x,
        panAreaWidth,
        zoom,
        containerWidth,
      ),
    );
    setVerticalScrollbarPositionRatio(
      calculateScrollbarPositionRatio(
        newTransform.y,
        panAreaHeight,
        zoom,
        containerHeight,
      ),
    );

    if (zoom !== newTransform.zoom) onZoomChange(newTransform.zoom);
  };

  const reactFlowProps: ReactFlowProps = {
    elements: layoutedElementsWithPrioritizedEdges,
    nodeTypes,
    edgeTypes,
    translateExtent: [
      [0, 0],
      [panAreaWidth, panAreaHeight],
    ],
    minZoom,
    maxZoom: defaultMaxZoom,
    defaultZoom,
    onLoad: () => setMapLoaded(true),
    onMove: handleMove,
    ...restReactFlowProps,
  };

  return (
    <>
      <Row filled>
        <Column cursor="grab">
          <ReactFlow {...reactFlowProps}>{children}</ReactFlow>
        </Column>
        {Boolean(scrollbarsThickness) && (
          <Scrollbar
            sizeRatio={verticalScrollbarSizeRatio}
            positionRatio={verticalScrollbarPositionRatio}
            onPositionRatioChange={handleScrollbarPositionRatioChange('y')}
            thickness={scrollbarsThickness}
            margin={scrollbarsMargin}
          />
        )}
      </Row>
      {Boolean(scrollbarsThickness) && (
        <Row gap={scrollbarsThickness + scrollbarsMargin}>
          <Scrollbar
            horizontal
            sizeRatio={horizontalScrollbarSizeRatio}
            positionRatio={horizontalScrollbarPositionRatio}
            onPositionRatioChange={handleScrollbarPositionRatioChange('x')}
            thickness={scrollbarsThickness}
            margin={scrollbarsMargin}
          />
          <div />
        </Row>
      )}
    </>
  );
};

export default memo(ReactFlowGraph);
