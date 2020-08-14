import React from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import Box from 'components/Box';
import addSign from 'assets/svg/addSign.svg';

const AddLabel = ({ label, direction, ...restProps }) => (
  <Box display="flex" direction={direction} align="center">
    <Img src={addSign} alt="add" {...restProps} />
    {label}
  </Box>
);

AddLabel.propTypes = {
  label: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
};

AddLabel.defaultProps = {
  direction: 'row',
};

export default AddLabel;
