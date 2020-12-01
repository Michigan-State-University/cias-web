import React from 'react';
import PropTypes from 'prop-types';
import { SwitchWrapper, SwitchInput, Slider } from './styled';

const Switch = props => (
  <SwitchWrapper {...props}>
    <SwitchInput
      data-cy="branching-intervention-toggle"
      data-testid="switch-input"
      disabled={props.disabled}
      checked={props.checked}
      onChange={event => props.onToggle(event.target.checked)}
    />
    <Slider />
  </SwitchWrapper>
);

Switch.propTypes = {
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
};

Switch.defaultProps = {
  checked: false,
};

export default Switch;
