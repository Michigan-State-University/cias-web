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
};

const SessionMapScrollbar = ({
  horizontal,
  sizeRatio,
  positionRatio,
  onPositionRatioChange,
}: Props): JSX.Element => {
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

  const containerSize = useMemo(() => {
    if (!containerRef.current) return 0;
    const {
      current: { offsetWidth, offsetHeight },
    } = containerRef;
    return horizontal ? offsetWidth : offsetHeight;
  }, [containerRef.current]);

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
    [containerSize, scrollbarSize],
  );

  return (
    <ScrollbarContainer ref={containerRef} horizontal={horizontal}>
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
            height={horizontal ? 5 : scrollbarSize}
            width={!horizontal ? 5 : scrollbarSize}
          />
        </Draggable>
      )}
    </ScrollbarContainer>
  );
};

export default memo(SessionMapScrollbar);
