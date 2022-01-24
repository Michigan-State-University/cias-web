import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Box from 'components/Box';
import Column from 'components/Column';
import Input from 'components/Input';
import { updatePreviewAnimation } from 'global/reducers/localState';

import { updatePauseDuration } from '../../actions';
const PauseBlock = ({
  block,
  blockIndex,
  updateDuration,
  updateNarratorPreviewAnimation,
  disabled,
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
          disabled={disabled}
          value={pause}
          onChange={(e) => setPause(e.target.value)}
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
    pauseDuration: PropTypes.number,
  }),
  blockIndex: PropTypes.number,
  updateDuration: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  updateDuration: updatePauseDuration,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(PauseBlock);
