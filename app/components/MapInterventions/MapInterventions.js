import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import SingleTile from 'components/SingleTile';

export const wrapWithCol = (child, key) => (
  <Col key={`Single-intvention-${key}`} xs={12} sm={6} lg={4} xl={3}>
    {child}
  </Col>
);

const MapInterventions = ({ interventions, participantView }) => (
  <>
    {interventions &&
      interventions.map(intervention =>
        wrapWithCol(
          <SingleTile
            tileData={intervention}
            participantView={participantView}
            link={`/interventions/${intervention.problem_id}/session/${
              intervention.id
            }/fill`}
          />,
          intervention.id,
        ),
      )}
  </>
);

MapInterventions.propTypes = {
  interventions: PropTypes.array,
  participantView: PropTypes.bool,
};

export default MapInterventions;
