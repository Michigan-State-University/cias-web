import React from 'react';
import PropTypes from 'prop-types';
import { SwitchWrapper, SwitchInput, Slider } from './styled';

const Switch = props => (
  <SwitchWrapper {...props}>
    {console.log('eeeeee', props.e ? props.checked : '')}
    <SwitchInput
      checked={props.checked}
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
