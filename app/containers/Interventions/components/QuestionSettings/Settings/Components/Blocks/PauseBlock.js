import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { updatePreviewAnimation } from 'containers/Interventions/containers/EditInterventionPage/actions';

import Input from 'components/Input';
import Column from 'components/Column';
import Box from 'components/Box';
import { updatePauseDuration } from '../../actions';

const PauseBlock = ({
  block,
  blockIndex,
  updateDuration,
  updateNarratorPreviewAnimation,
}) => {
  const [pause, setPause] = useState(block.pauseDuration);
  const handleBlur = () => updateDuration(blockIndex, +pause);

  useEffect(() => {
    updateNarratorPreviewAnimation('standStill');
  }, []);

  return (
    <Column>
      <Box mt={15} display="flex" justify="end" align="center">
        <Input
          value={pause}
          onChange={e => setPause(e.target.value)}
          type="number"
          width="100%"
          textAlign="right"
          mr={5}
          onBlur={handleBlur}
        />
        <div>s</div>
      </Box>
    </Column>
  );
};

PauseBlock.propTypes = {
  block: PropTypes.shape({
    type: PropTypes.string,
    animation: PropTypes.string,
  }),
  blockIndex: PropTypes.number,
  updateDuration: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
};

const mapDispatchToProps = {
  updateDuration: updatePauseDuration,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(PauseBlock);
