import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { colors } from 'theme';

import Box from 'components/Box';

import { ScrollbarContainer } from './styled';

type Props = {
  horizontal?: boolean;
  sizeRatio: number;
  positionRatio: number;
  onPositionRatioChange: (positionRatio: number) => void;
  thickness?: number;
  margin?: number;
};

const Scrollbar = ({
  horizontal,
  sizeRatio,
  positionRatio,
  onPositionRatioChange,
  thickness = 5,
  margin = 0,
}: Props): JSX.Element => {
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

  const containerSize = useMemo(() => {
    if (!containerRef.current) return 0;
    const {
      current: { offsetWidth, offsetHeight },
    } = containerRef;
    return horizontal ? offsetWidth : offsetHeight;
  }, [
    containerRef.current?.offsetHeight,
    containerRef.current?.offsetWidth,
    horizontal,
  ]);

  const scrollbarSize = useMemo(
    () => Math.round(sizeRatio * containerSize),
    [sizeRatio, containerSize],
  );

  const positionOnAxis = useMemo(
    () => Math.round(positionRatio * (containerSize - scrollbarSize)),
    [positionRatio, containerSize, scrollbarSize],
  );

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    x: horizontal ? positionOnAxis : 0,
    y: !horizontal ? positionOnAxis : 0,
  });

  useEffect(() => {
    setPosition({
      x: horizontal ? positionOnAxis : 0,
      y: !horizontal ? positionOnAxis : 0,
    });
  }, [horizontal, positionOnAxis]);

  const handleDrag = useCallback(
    (_: DraggableEvent, { x, y }: DraggableData) => {
      const newPositionOnAxis = horizontal ? x : y;
      onPositionRatioChange(
        newPositionOnAxis / (containerSize - scrollbarSize),
      );
    },
    [containerSize, scrollbarSize, onPositionRatioChange, horizontal],
  );

  const containerThickness = useMemo(
    () => thickness + margin,
    [thickness, margin],
  );

  return (
    <ScrollbarContainer
      ref={containerRef}
      horizontal={horizontal}
      containerThickness={containerThickness}
    >
      {Boolean(scrollbarSize) && (
        <Draggable
          axis={horizontal ? 'x' : 'y'}
          bounds="parent"
          onStart={() => setDragging(true)}
          onStop={() => setDragging(false)}
          onDrag={handleDrag}
          position={position}
        >
          <Box
            background={dragging ? colors.periwinkleGray : colors.solitude}
            hoverColor={colors.periwinkleGray}
            height={horizontal ? thickness : scrollbarSize}
            width={!horizontal ? thickness : scrollbarSize}
          />
        </Draggable>
      )}
    </ScrollbarContainer>
  );
};

export default memo(Scrollbar);
