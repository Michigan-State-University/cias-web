import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import { FullWidthSwitch } from 'components/Switch';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import { colors, borders } from 'theme';

const Option = ({
  withBorder,
  fontWeight,
  label,
  value,
  action,
  disabled,
  tooltipText,
}) => {
  const handleToggle = (val) => {
    action(val);
  };
  return (
    <Row
      align="center"
      justify="between"
      pb={15}
      mb={15}
      borderBottom={
        withBorder
          ? `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`
          : null
      }
    >
      <FullWidthSwitch
        id={label}
        disabled={disabled}
        checked={value}
        onToggle={handleToggle}
      >
        <HelpIconTooltip
          id={`option-tooltip-${label}`}
          tooltipContent={tooltipText}
        >
          <Text fontWeight={fontWeight}>{label}</Text>
        </HelpIconTooltip>
      </FullWidthSwitch>
    </Row>
  );
};

Option.propTypes = {
  withBorder: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.bool,
  action: PropTypes.func,
  fontWeight: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
};

export default Option;
