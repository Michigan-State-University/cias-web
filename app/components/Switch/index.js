import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SwitchWrapper, SwitchInput, Slider } from './styled';

const Switch = ({ checked, disabled, id, onToggle, ...props }) => {
  const onClick = useCallback(() => {
    onToggle(!checked);
  }, [checked, onToggle]);

  // needed empty function for HTML correctness
  const onChange = useCallback(() => {}, []);

  return (
    <SwitchWrapper onClick={onClick} {...props}>
      <SwitchInput
        id={id}
        data-cy="branching-intervention-toggle"
        data-testid="switch-input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Slider />
    </SwitchWrapper>
  );
};

Switch.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
};

Switch.defaultProps = {
  checked: false,
};

export default memo(Switch);
