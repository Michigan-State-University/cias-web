import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import SingleInterventionPanel from 'components/SingleInterventionPanel';

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
          <SingleInterventionPanel
            intervention={intervention}
            participantView={participantView}
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
