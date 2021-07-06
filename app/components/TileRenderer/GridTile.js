import PropTypes from 'prop-types';
import React, { memo, useContext } from 'react';

import SingleTile from 'containers/SingleTile';
import { TilesContext } from 'components/TileRenderer/constants';

const GridTile = ({ data, index }) => {
  const { NewInterventionButton } = useContext(TilesContext);
  const intervention = data?.[index - 1];

  if (index === 0) return NewInterventionButton;

  if (!intervention) return null;

  return (
    <SingleTile
      tileData={intervention}
      link={`/interventions/${intervention.id}/`}
    />
  );
};

export default memo(GridTile);

GridTile.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
};
