/**
 *
 * TileRenderer
 *
 */

import React, { memo, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useScreenClass } from 'react-grid-system';

import { TilesContext } from 'components/TileRenderer/constants';
import { VirtualGrid } from 'components/VirtualList';

import GridTile from './GridTile';
import NewButton from './Components/NewButton';

function TileRenderer({
  elements,
  elementsStates,
  onCreateCall,
  createLoading,
  newLabel,
  onFetchInterventions,
  isLoading,
  infiniteLoader,
  filterData,
}) {
  const infiniteLoaderRef = useRef();
  const screenClass = useScreenClass();

  useEffect(() => {
    infiniteLoaderRef.current?.resetloadMoreItemsCache();
  }, [filterData]);

  const columnCount = useMemo(() => {
    switch (screenClass) {
      case 'xs':
        return 1;
      case 'sm':
      case 'md':
        return 2;
      case 'lg':
        return 3;
      case 'xl':
      case 'xxl':
        return 4;
      default:
        return 1;
    }
  }, [screenClass]);

  const rowCount = useMemo(
    () => Math.ceil((elements?.length + 1) / columnCount),
    [columnCount, elements?.length],
  );

  return (
    <TilesContext.Provider
      value={{
        NewInterventionButton: (
          <NewButton
            onClick={onCreateCall}
            loading={createLoading}
            label={newLabel}
          />
        ),
      }}
    >
      <VirtualGrid
        ref={infiniteLoaderRef}
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeight={160}
        items={elements}
        itemsStates={elementsStates}
        infiniteLoader={
          infiniteLoader
            ? {
                loadMoreItems: onFetchInterventions,
                isLoading,
                ...infiniteLoader,
              }
            : null
        }
      >
        {GridTile}
      </VirtualGrid>
    </TilesContext.Provider>
  );
}

TileRenderer.propTypes = {
  elements: PropTypes.any,
  elementsStates: PropTypes.instanceOf(Map),
  onCreateCall: PropTypes.func,
  createLoading: PropTypes.bool,
  newLabel: PropTypes.string,
  onFetchInterventions: PropTypes.func,
  isLoading: PropTypes.bool,
  infiniteLoader: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  filterData: PropTypes.object,
};

TileRenderer.defaultProps = {
  elements: [],
};

export default memo(TileRenderer);
