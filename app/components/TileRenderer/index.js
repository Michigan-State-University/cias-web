/**
 *
 * TileRenderer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-grid-system';

import useIsInViewport from 'utils/useIsInViewport';

import NewButton from './Components/NewButton';
import NewFloatButton from './Components/NewFloatButton';

function TileRenderer({
  elements,
  mapFunction,
  containerKey,
  onCreateCall,
  createLoading,
  newLabel,
}) {
  const [ref, isInViewport] = useIsInViewport();

  const wrapWithCol = (child, key) => (
    <Col key={`Single-${containerKey}-${key}`} xs={12} sm={6} lg={4} xl={3}>
      {child}
    </Col>
  );

  const displayFloatButton = elements.length !== 0 && !isInViewport;
  return (
    <Row>
      {wrapWithCol(
        <NewButton
          onClick={onCreateCall}
          loading={createLoading}
          label={newLabel}
          ref={ref}
        />,
        'new',
      )}
      {elements.map(element => wrapWithCol(mapFunction(element), element.id))}
      {displayFloatButton && (
        <NewFloatButton onClick={onCreateCall} loading={createLoading} />
      )}
    </Row>
  );
}

TileRenderer.propTypes = {
  elements: PropTypes.any,
  mapFunction: PropTypes.func,
  onCreateCall: PropTypes.func,
  containerKey: PropTypes.string,
  createLoading: PropTypes.bool,
  newLabel: PropTypes.string,
};

TileRenderer.defaultProps = {
  elements: [],
  mapFunction: el => el,
};

export default memo(TileRenderer);
