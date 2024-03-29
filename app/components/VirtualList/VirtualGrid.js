import PropTypes from 'prop-types';
import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { FixedSizeGrid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import GridChild from './GridChild';
import InfiniteLoader from './InfiniteLoader';

const VirtualGrid = forwardRef(
  (
    {
      children,
      gutterWidth,
      gutterHeight,
      infiniteLoader,
      items,
      itemsStates,
      ...props
    },
    ref,
  ) => {
    const { columnCount } = props;

    const isItemLoaded = (index) => {
      const isLoaded = index < items.length && items[index] !== null;

      return isLoaded;
    };

    const itemData = useMemo(
      () => ({ items, itemsSize: items.length, itemsStates }),
      [items, itemsStates],
    );

    const renderInfiniteLoader = (
      { onItemsRendered, ref: virtualGridRef },
      gridProps,
    ) =>
      renderGrid({
        ...gridProps,
        ref: virtualGridRef,
        onItemsRendered: ({
          overscanRowStartIndex,
          overscanRowStopIndex,
          visibleRowStartIndex,
          visibleRowStopIndex,
        }) => {
          onItemsRendered({
            overscanStartIndex: overscanRowStartIndex * columnCount,
            overscanStopIndex: overscanRowStopIndex * columnCount,
            visibleStartIndex: visibleRowStartIndex * columnCount,
            visibleStopIndex: visibleRowStopIndex * columnCount,
          });
        },
      });

    const renderGrid = useCallback(
      (gridProps) => <FixedSizeGrid {...gridProps}>{renderCell}</FixedSizeGrid>,
      [],
    );

    const renderCell = memo(
      (gridProps) => (
        <GridChild
          {...gridProps}
          gutterWidth={gutterWidth}
          gutterHeight={gutterHeight}
          columnCount={columnCount}
        >
          {children}
        </GridChild>
      ),
      areEqual,
    );

    return (
      <AutoSizer className="virtual-grid-auto-sizer">
        {({ width, height }) => {
          const columnWidth = width / columnCount;

          const gridProps = { width, height, columnWidth, itemData, ...props };

          if (infiniteLoader)
            return (
              <InfiniteLoader
                ref={ref}
                isItemLoaded={isItemLoaded}
                {...infiniteLoader}
              >
                {({ onItemsRendered, ref: virtualGridRef }) =>
                  renderInfiniteLoader(
                    { onItemsRendered, ref: virtualGridRef },
                    gridProps,
                  )
                }
              </InfiniteLoader>
            );

          return renderGrid(gridProps);
        }}
      </AutoSizer>
    );
  },
);

VirtualGrid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  columnCount: PropTypes.number,
  gutterHeight: PropTypes.number,
  gutterWidth: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  itemsStates: PropTypes.instanceOf(Map),
  infiniteLoader: PropTypes.object,
};

VirtualGrid.defaultProps = {
  gutterHeight: 10,
  gutterWidth: 10,
};

export default memo(VirtualGrid);
