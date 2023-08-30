import PropTypes from 'prop-types';
import React, { memo, useContext } from 'react';

import { RoutePath } from 'global/constants';
import { INTERVENTION_LIST_ITEM_DEFAULT_STATE } from 'global/reducers/interventions';

import { parametrizeRoutePath } from 'utils/router';

import SingleTile from 'containers/SingleTile';
import { TilesContext } from 'components/TileRenderer/constants';

const GridTile = ({ data, index }) => {
  const { NewInterventionButton } = useContext(TilesContext);
  const { items, itemsStates } = data;
  const intervention = items?.[index - 1];
  const itemState =
    itemsStates?.[intervention?.id] ?? INTERVENTION_LIST_ITEM_DEFAULT_STATE;

  if (index === 0) return NewInterventionButton;

  if (!intervention) return null;

  return (
    <SingleTile
      tileData={intervention}
      tileState={itemState}
      link={parametrizeRoutePath(RoutePath.INTERVENTION_DETAILS, {
        interventionId: intervention.id,
      })}
      isLoading={intervention?.isLoading}
    />
  );
};

export default memo(GridTile);

GridTile.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};
