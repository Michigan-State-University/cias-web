import React from 'react';
import PropTypes from 'prop-types';
import { SwitchWrapper, SwitchInput, Slider } from './styled';

const Switch = props => (
  <SwitchWrapper {...props}>
    <SwitchInput
      defaultChecked={props.checked}
      onChange={event => props.onToggle(event.target.checked)}
    />
    <Slider />
  </SwitchWrapper>
);

Switch.propTypes = {
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
};

Switch.defaultProps = {
  checked: false,
};

export default Switch;
