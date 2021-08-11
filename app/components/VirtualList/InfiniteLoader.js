import PropTypes from 'prop-types';
import React, { forwardRef, memo } from 'react';
import RWInfiniteLoader from 'react-window-infinite-loader';

const InfiniteLoader = forwardRef(
  ({ children, loadMoreItems, isLoading, ...props }, ref) => {
    const handleLoadMoreItems = (startIndex, stopIndex) =>
      new Promise(resolve => {
        // load new items only when nothing is being loaded already
        if (!isLoading) loadMoreItems(startIndex, stopIndex);
        resolve();
      });

    return (
      <RWInfiniteLoader
        ref={ref}
        loadMoreItems={handleLoadMoreItems}
        itemCount={Number.MAX_SAFE_INTEGER}
        {...props}
      >
        {children}
      </RWInfiniteLoader>
    );
  },
);

InfiniteLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  isLoading: PropTypes.bool,
  loadMoreItems: PropTypes.func,
};

export default memo(InfiniteLoader);
