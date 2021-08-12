import PropTypes from 'prop-types';
import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { FixedSizeGrid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import GridChild from './GridChild';
import InfiniteLoader from './InfiniteLoader';

const VirtualGrid = forwardRef(
  (
    { children, gutterWidth, gutterHeight, infiniteLoader, items, ...props },
    ref,
  ) => {
    const { columnCount } = props;

    const isItemLoaded = (index) =>
      index < items.length && items[index] !== null;
    const itemData = useMemo(
      () => ({ items, itemsSize: items.length }),
      [items],
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
  children: PropTypes.object,
  columnCount: PropTypes.number,
  gutterHeight: PropTypes.number,
  gutterWidth: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  infiniteLoader: PropTypes.object,
};

VirtualGrid.defaultProps = {
  gutterHeight: 10,
  gutterWidth: 10,
};

export default memo(VirtualGrid);
