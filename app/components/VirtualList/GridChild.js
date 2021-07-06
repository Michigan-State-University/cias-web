import PropTypes from 'prop-types';
import React, { memo } from 'react';

import Box from 'components/Box';

const GridChild = ({
  children,
  gutterWidth,
  gutterHeight,
  columnCount,
  ...props
}) => {
  const Component = children;

  const { style, rowIndex, columnIndex } = props;
  const index = rowIndex * columnCount + columnIndex;

  const isFirstColumn = columnIndex === 0;
  const mergedStyle = {
    ...style,
    left: style.left + (isFirstColumn ? 0 : gutterWidth),
    top: style.top + gutterHeight,
    width: style.width - (isFirstColumn ? 0 : gutterWidth),
    height: style.height - gutterHeight,
  };

  return (
    <Box style={mergedStyle}>
      <Component {...props} index={index} />
    </Box>
  );
};

GridChild.propTypes = {
  children: PropTypes.object,
  columnCount: PropTypes.number,
  columnIndex: PropTypes.number,
  gutterHeight: PropTypes.number,
  gutterWidth: PropTypes.number,
  rowIndex: PropTypes.number,
  style: PropTypes.object,
};

GridChild.defaultProps = {
  gutterHeight: 10,
  gutterWidth: 10,
};

export default memo(GridChild);
