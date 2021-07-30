import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { FixedSizeGrid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import GridChild from 'components/VirtualList/GridChild';

const VirtualGrid = ({ children, gutterWidth, gutterHeight, ...props }) => {
  const { columnCount } = props;

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
    <AutoSizer className="auto-sizer-virtual-grid">
      {({ width, height }) => {
        const columnWidth = width / columnCount;

        return (
          <FixedSizeGrid
            width={width}
            height={height}
            columnWidth={columnWidth}
            {...props}
          >
            {renderCell}
          </FixedSizeGrid>
        );
      }}
    </AutoSizer>
  );
};

export default memo(VirtualGrid);

VirtualGrid.propTypes = {
  children: PropTypes.object,
  columnCount: PropTypes.number,
  gutterHeight: PropTypes.number,
  gutterWidth: PropTypes.number,
};

VirtualGrid.defaultProps = {
  gutterHeight: 10,
  gutterWidth: 10,
};
