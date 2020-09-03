import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H2 from 'components/H2';
import Column from 'components/Column';
import Text from 'components/Text';
import Row from 'components/Row';
import Radio from 'components/Radio';
import decideIfPassValue from 'utils/decideIfPassValue';

import messages from '../messages';
import { shareOptions } from '../utils';

const LeftColumn = ({ currentOption, dispatchUpdate, updateAccessSetting }) => {
  const changeInfo = (id, label, sublabel) => () =>
    dispatchUpdate({
      id,
      label,
      sublabel,
    });
  return (
    <Column>
      <H2>
        <FormattedMessage {...messages.subheader} />
      </H2>
      <Box mt={25}>
        {shareOptions.map((option, index) => {
          const isChecked = currentOption && option.id === currentOption.id;
          return (
            <Row
              key={`el-option-radio-${index}`}
              mb={decideIfPassValue({
                index,
                arrayLength: shareOptions.length,
                value: 20,
              })}
              align="center"
              clickable
              onMouseEnter={changeInfo(
                option.id,
                option.label,
                option.sublabel,
              )}
              onMouseLeave={() =>
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
              <Radio checked={isChecked} mr={12} />
              <Text fontSize={15} fontWeight={isChecked ? 'bold' : 'regular'}>
                {option.label}
              </Text>
            </Row>
          );
        })}
      </Box>
    </Column>
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
};

export default LeftColumn;
