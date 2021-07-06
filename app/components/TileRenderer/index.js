/**
 *
 * TileRenderer
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useScreenClass } from 'react-grid-system';

import useIsInViewport from 'utils/useIsInViewport';

import { TilesContext } from 'components/TileRenderer/constants';
import { VirtualGrid } from 'components/VirtualList';

import GridTile from './GridTile';
import NewButton from './Components/NewButton';
import NewFloatButton from './Components/NewFloatButton';

function TileRenderer({ elements, onCreateCall, createLoading, newLabel }) {
  const [ref, isInViewport] = useIsInViewport();
  const screenClass = useScreenClass();

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

  const displayFloatButton = elements?.length !== 0 && !isInViewport;
  return (
    <TilesContext.Provider
      value={{
        NewInterventionButton: (
          <NewButton
            onClick={onCreateCall}
            loading={createLoading}
            label={newLabel}
            ref={ref}
          />
        ),
      }}
    >
      <VirtualGrid
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeight={160}
        itemData={elements}
      >
        {GridTile}
      </VirtualGrid>

      {displayFloatButton && (
        <NewFloatButton onClick={onCreateCall} loading={createLoading} />
      )}
    </TilesContext.Provider>
  );
}

TileRenderer.propTypes = {
  elements: PropTypes.any,
  onCreateCall: PropTypes.func,
  createLoading: PropTypes.bool,
  newLabel: PropTypes.string,
};

TileRenderer.defaultProps = {
  elements: [],
};

export default memo(TileRenderer);
