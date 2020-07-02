import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import Switch from 'components/Switch';
import { colors, borders } from 'theme';

const Option = ({
  /* fontWeight,*/ withBorder,
  label,
  value,
  action,
  index,
}) => {
  const handleToggle = val => {
    action({ path: `settings.${index}`, value: val });
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
      <Text /* fontWeight={fontWeight} */>{label}</Text>
      <Switch checked={value} onToggle={handleToggle} />
    </Row>
  );
};

Option.propTypes = {};

Option.defualtProps = {};

export default Option;
