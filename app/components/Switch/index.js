import React from 'react';
import PropTypes from 'prop-types';
import { SwitchWrapper, SwitchInput, Slider } from './styled';

const Switch = ({ id, ...props }) => (
  <SwitchWrapper {...props}>
    <SwitchInput
      id={id}
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
  id: PropTypes.string,
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
};

Switch.defaultProps = {
  checked: false,
};

export default Switch;
