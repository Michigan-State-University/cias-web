import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import Radio from 'components/Radio';
import decideIfPassValue from 'utils/decideIfPassValue';

import { shareOptions } from '../utils';

const LeftColumn = ({
  currentOption,
  dispatchUpdate,
  updateAccessSetting,
  disabled,
}) => {
  const changeInfo = (id, label, sublabel) => () =>
    dispatchUpdate({
      id,
      label,
      sublabel,
    });
  return (
    <Box mb={25}>
      {shareOptions.map((option, index) => {
        const isChecked = currentOption && option.id === currentOption.id;
        return (
          <Row
            disabled={disabled}
            key={`el-option-radio-${index}`}
            mb={decideIfPassValue({
              index,
              arrayLength: shareOptions.length,
              value: 20,
            })}
            align="center"
            clickable
            onMouseEnter={changeInfo(option.id, option.label, option.sublabel)}
            onMouseLeave={
              currentOption &&
              changeInfo(
                currentOption.id,
                currentOption.label,
                currentOption.sublabel,
              )
            }
            width="fit-content"
            onClick={() => updateAccessSetting(option.id)}
          >
            <Radio
              data-cy={isChecked && `access-${option.id}-radio`}
              checked={isChecked}
              mr={12}
            />
            <Text fontSize={15} fontWeight={isChecked ? 'bold' : 'regular'}>
              {option.label}
            </Text>
          </Row>
        );
      })}
    </Box>
  );
};

LeftColumn.propTypes = {
  currentOption: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.node,
    sublabel: PropTypes.node,
  }),
  dispatchUpdate: PropTypes.func,
  updateAccessSetting: PropTypes.func,
  disabled: PropTypes.bool,
};

export default LeftColumn;
