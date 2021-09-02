import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ReactFlow, {
  ConnectionLineType,
  FlowTransform,
  NodeTypesType,
  ReactFlowProps,
  useStoreState,
  useZoomPanHelper,
} from 'react-flow-renderer';

import { Question } from 'global/types/question';
import { QuestionGroup } from 'global/types/questionGroup';

import Row from 'components/Row';
import Column from 'components/Column';

import SessionMapQuestionNode from './SessionMapQuestionNode';
import SessionMapCustomArrowHead from './SessionMapCustomArrowHead';
import {
  calculateAxisTransform,
  calculateMinZoom,
  calculateScrollbarPositionRatio,
  calculateScrollbarSizeRatio,
  createMapEdgesFromQuestions,
  createMapNodesFromQuestions,
  layoutElements,
  sortQuestionsByGroupAndPosition,
} from '../../utils';
import {
  CustomArrowHeadType,
  defaultZoom,
  defaultMaxZoom,
  sessionMapColors,
  detailedInfoZoomThreshold,
} from '../../constants';
import SessionMapScrollbar from '../SessionMapScrollbar';

const nodeTypes: NodeTypesType = {
  question: SessionMapQuestionNode,
};

type Props = {
  questions: Question[];
  questionGroups: QuestionGroup[];
  showDetailsId: string;
  onShowDetailsIdChange: (showDetailsId: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom: number;
  onMinZoomChange: (minZoom: number) => void;
};

const SessionMap = ({
  questions,
  questionGroups,
  showDetailsId,
  onShowDetailsIdChange,
  zoom,
  onZoomChange,
  minZoom,
  onMinZoomChange,
}: Props): JSX.Element => {
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

  const handleShowDetailsChange = useCallback(
    (showDetails: boolean, questionId: string) => {
      onShowDetailsIdChange(showDetails ? questionId : '');
    },
    [],
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
      ...createMapNodesFromQuestions(
        sortedQuestions,
        showDetailsId,
        handleShowDetailsChange,
        showDetailedInfo,
      ),
      ...createMapEdgesFromQuestions(sortedQuestions),
    ],
    [sortedQuestions, showDetailsId, showDetailedInfo],
  );

  const { layoutedElements, panAreaWidth, panAreaHeight } = useMemo(
    () =>
      mapLoaded
        ? layoutElements(elements, renderedNodes)
        : { layoutedElements: elements, panAreaWidth: 0, panAreaHeight: 0 },
    [mapLoaded, elements],
  );

  useEffect(() => {
    onMinZoomChange(
      calculateMinZoom(
        panAreaWidth,
        panAreaHeight,
        containerWidth,
        containerHeight,
      ),
    );
  }, [panAreaWidth, panAreaHeight, containerWidth, containerHeight]);

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

  const fitShowDetailsElementInView = () => {
    const showDetailsElement = renderedNodes.find(
      ({ id }) => id === showDetailsId,
    );
    if (!showDetailsElement) return;

    const { position, __rf: ref } = showDetailsElement;
    const elementLeftEndPosition = position.x * zoom;
    const elementTopEndPosition = position.y * zoom;
    const elementRightEndPosition = (position.x + ref.width) * zoom;
    const elementBottomEndPosition = (position.y + ref.height) * zoom;

    const viewRightEndPosition = -1 * currentTransform.x + containerWidth;
    const viewBottomEndPosition = -1 * currentTransform.y + containerHeight;

    if (
      elementLeftEndPosition < -1 * currentTransform.x ||
      elementTopEndPosition < -1 * currentTransform.y
    ) {
      const newTransform = {
        ...currentTransform,
        x: -1 * elementLeftEndPosition,
        y: -1 * elementTopEndPosition,
      };
      transform(newTransform);
      return;
    }

    if (
      elementRightEndPosition > viewRightEndPosition ||
      elementBottomEndPosition > viewBottomEndPosition
    ) {
      const newTransform = {
        ...currentTransform,
        x: -1 * (elementRightEndPosition - containerWidth),
        y: -1 * (elementBottomEndPosition - containerHeight),
      };
      transform(newTransform);
    }
  };

  const fitViewInContainer = () => {
    const viewWidth = panAreaWidth * zoom;
    const viewHeight = panAreaHeight * zoom;

    const viewRightEndPosition = -1 * currentTransform.x + containerWidth;
    const viewBottomEndPosition = -1 * currentTransform.y + containerHeight;

    let { x: newX, y: newY } = currentTransform;

    if (viewWidth < viewRightEndPosition) {
      newX = -1 * (viewWidth - containerWidth);
    }

    if (viewHeight < viewBottomEndPosition) {
      newY = -1 * (viewHeight - containerHeight);
    }

    if (newX !== currentTransform.x || newY !== currentTransform.y) {
      transform({
        ...currentTransform,
        x: newX,
        y: newY,
      });
    }
  };

  useEffect(() => {
    fitViewInContainer();
    if (showDetailsId) {
      fitShowDetailsElementInView();
    }
  }, [showDetailsId, containerWidth, containerHeight]);

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
    if (!newTransform) return;

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
    elements: layoutedElements,
    nodeTypes,
    nodesDraggable: false,
    nodesConnectable: false,
    translateExtent: [
      [0, 0],
      [panAreaWidth, panAreaHeight],
    ],
    minZoom,
    maxZoom: defaultMaxZoom,
    defaultZoom,
    connectionLineType: ConnectionLineType.SmoothStep,
    onLoad: () => setMapLoaded(true),
    onMove: handleMove,
  };

  return (
    <>
      <Row filled>
        <Column cursor="grab">
          <ReactFlow {...reactFlowProps}>
            <SessionMapCustomArrowHead
              id={`react-flow__${CustomArrowHeadType.BASE}`}
              color={sessionMapColors.edgeBase}
            />
            <SessionMapCustomArrowHead
              id={`react-flow__${CustomArrowHeadType.SELECTED}`}
              color={sessionMapColors.selected}
            />
          </ReactFlow>
        </Column>
        <SessionMapScrollbar
          sizeRatio={verticalScrollbarSizeRatio}
          positionRatio={verticalScrollbarPositionRatio}
          onPositionRatioChange={handleScrollbarPositionRatioChange('y')}
        />
      </Row>
      <Row gap={20}>
        <SessionMapScrollbar
          horizontal
          sizeRatio={horizontalScrollbarSizeRatio}
          positionRatio={horizontalScrollbarPositionRatio}
          onPositionRatioChange={handleScrollbarPositionRatioChange('x')}
        />
        <div />
      </Row>
    </>
  );
};

export default SessionMap;
